import multer from 'multer';
import HttpStatus from 'http-status-codes';
import {C} from '../middlewares/validator';
import {logger} from "../modules/logger";

/**
 * @description file을 req.files에 넣어줌
 *
 * @param maxFileSize : number Mb
 * @returns {function(*=, *=, *)}
 */
export default (maxFileSize = 2) => {

    const upload = multer({
        storage: multer.memoryStorage(),
        limits: {fileSize: maxFileSize * C.MB}
    }).any();

    return (req, res, next) => {
        upload(req, res, err => {
            if (err) {
                logger.debug(`REJECT: ${req.originalUrl} - File too large`);
                return res.status(HttpStatus.BAD_REQUEST).json({err: 'invalid values'});
            }

            if(req.files && Array.isArray(req.files)) {
                req.files = req.files.reduce((obj, file) => {
                    obj[file.fieldname] = file;
                    return obj;
                }, {});
            }

            next();
        });
    }
}