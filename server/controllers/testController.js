import express from 'express';
import HttpStatus from 'http-status-codes';
import {logger} from "../modules/logger";

import fileParser from '../middlewares/fileParser';
import validator from '../middlewares/validator';
import uploader from '../middlewares/uploader';
import testConstraints from '../constraints/testConstraints';

const router = express.Router();

router.post('/call1', [fileParser(1), validator(testConstraints.call1)], (req, res) => {

    logger.debug(`hello call1 ${JSON.stringify(req.body)}`);

    return res.status(HttpStatus.OK).json({msg: 'ok'});
});

router.post('/call2', [uploader(testConstraints.call2.files), validator(testConstraints.call2)], (req, res) => {

    logger.debug(`hello call2 ${JSON.stringify(req.files)}`);

    return res.status(HttpStatus.OK).json({msg: 'ok'});
});

export default router;