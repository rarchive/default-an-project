import validate from 'validate.js';
import HttpStatus from 'http-status-codes';
import {logger} from '../modules/logger';
import {removeS3Object} from '../middlewares/uploader';

const validateOption = {format: 'flat'};

/**
 * @description 파일을 조건에 맞게 검사
 *
 * @param files
 * @param constraints
 * @returns {Array} : errors
 */
const validateFiles = (files, constraints = {}) => {

    return Object.keys(constraints).reduce((errors, key) => {
        let [file, fileConstraints] = [files[key], constraints[key]];

        if (fileConstraints.presence && !file) {
            errors.push(`${key} is required`);
            return errors;
        }

        if (file && fileConstraints.maxsize && fileConstraints.maxsize < file.size) {
            errors.push(`${key} is too large`);
        }

        if (file && fileConstraints.mimetype && fileConstraints.mimetype.indexOf(file.mimetype) === -1) {
            errors.push(`${key} is must be ${fileConstraints.mimetype.toString()}`);
        }

        return errors;
    }, []);
};

/**
 * @description validate middleware
 *
 * @param constraints : Object 제약조건
 * @returns {function(*, *, *)}
 */
export default constraints => {
    return (req, res, next) => {

        req.body = req.body || req.query;

        if (!constraints) {
            return next();
        }

        let errors = ['params', 'body']
            .map(target => constraints[target] && validate(req[target], constraints[target], validateOption))
            .filter(error => !!error)
            .map(error => error.join(', '));

        if (errors.length > 0) {
            logger.debug(`REJECT: ${req.originalUrl} - ${errors.join(', ')}`);
            return res.status(HttpStatus.BAD_REQUEST).json({err: 'invalid values'});
        }

        errors = validateFiles(req.files, constraints.files);

        if (errors.length > 0) {
            Object.keys(req.files).forEach(key => removeS3Object(req.files[key].key));
            logger.debug(`REJECT: ${req.originalUrl} - ${errors.join(', ')}`);
            return res.status(HttpStatus.BAD_REQUEST).json({err: 'invalid values'});
        }

        next();
    }
}

// CONSTRAINTS 상수
export const CONSTRAINTS = {
    // MIME TYPE
    MIME_IMAGE: ['image/jpg', 'image/jpeg', 'image/png'],
    MIME_ZIP: ['application/x-zip-compressed', 'application/x-zip', 'application/zip'],
    MIME_TORRENT: ['application/x-bittorrent'],

    // FILE SIZE
    MB: 1024 * 1024
};
export {CONSTRAINTS as C};