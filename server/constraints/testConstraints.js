import {C} from '../middlewares/validator';

/**
 * 제약조건을 명시
 *
 * params: uri
 * body: post body or get query
 * files: multer file
 *
 * NAME: {
 *   params: {},
 *   body: {},
 *   files: {}
 * }
 */
export default {
    call1: {
        body: {
            id: {
                presence: true,
                length: {
                    minimum: 5,
                    maximum: 40
                }
            },
            password: {
                presence: true,
                length: {
                    minimum: 5,
                    maximum: 40
                }
            },
        },
        files: {
            profile: {
                presence: true,
                mimetype: C.MIME_IMAGE,
                maxsize: 1 * C.MB
            }
        }
    },
    call2: {
        files: {
            aa: {
                presence: true,
                mimetype: C.MIME_IMAGE,
                maxsize: 5 * C.MB
            },
            bb: {
                presence: true,
                mimetype: C.MIME_IMAGE,
                maxsize: 5 * C.MB
            },
            cc: {
                presence: true,
                mimetype: C.MIME_IMAGE,
                maxsize: 5 * C.MB
            }
        }
    }
};