import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import uuid from 'uuid/v4';
import HttpStatus from 'http-status-codes';
import {logger} from '../modules/logger';
import secret from '../config/secret';

const BUCKET_NAME = 'printingdiy';
const REGION = 'ap-northeast-2';
const PATH = 'upload';
aws.config.update({
    secretAccessKey: secret.aws.account.secretAccessKey,
    accessKeyId: secret.aws.account.accessKeyId,
    region: REGION
});
const s3 = new aws.S3();

/**
 * @description file을 s3에 업로드
 *
 * @param fileConstraints : Object 파일 제약조건
 * @returns {function(*=, *=, *)}
 */
export default (fileConstraints) => {

    const fields = Object.keys(fileConstraints).reduce((fields, key) => {
        fields.push({
            name: key,
            maxCount: 1
        });
        return fields;
    }, []);

    const totalSize = Object.keys(fileConstraints).reduce((sum, key) => sum + fileConstraints[key].maxsize, 2);

    const upload = multer({
        storage: multerS3({
            s3: s3,
            bucket: BUCKET_NAME,
            key(req, file, cb) {
                file.key = `${PATH}/${uuid()}.${file.originalname.split('.').pop().toLowerCase()}`;
                cb(null, file.key);
            }
        }),
        limits: {
            fileSize: totalSize
        },
        fileFilter(req, file, cb) {

            // 간단하게 mimeType만 검사
            let constraints = fileConstraints[file.fieldname];
            if (file && constraints.mimetype && constraints.mimetype.indexOf(file.mimetype) === -1) {
                return cb(new Error(`${file.fieldname} is must be ${constraints.mimetype.toString()}`));
            }

            return cb(null, true);
        }
    }).fields(fields);

    return (req, res, next) => {
        upload(req, res, err => {
            if (err) {
                logger.debug(`REJECT: ${req.originalUrl} - ${err.message}`);
                return res.status(HttpStatus.BAD_REQUEST).json({err: 'invalid values'});
            }

            if(req.files) {
                req.files = Object.keys(req.files).reduce((files, key) =>{
                    logger.debug(`SAVED: S3 Object '${req.files[key][0].key}' was successfully saved`);
                    files[key] = req.files[key][0];
                    return files;
                }, {});
            }

            next();
        });
    }
}

/**
 * @description S3 Object 삭제
 *
 * @param key : string
 */
export let removeS3Object = (key) => {
    s3.deleteObjects({
        Bucket: BUCKET_NAME,
        Delete: {
            Objects: [{
                Key: key
            }]
        }
    }, (err) => {
        if (err) {
            return logger.error(`ERROR: s3 object '${key}' delete fail : ${err.name}`);
        }

        logger.debug(`DELETED: S3 Object '${key}' was successfully deleted`);
    });
};