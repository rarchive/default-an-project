import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import {httpLogger} from "./modules/logger";

// router
import defaultRoute from './route';

// api controller
import testController from './controllers/testController';

const app = express();

app.use(httpLogger());
app.use(express.static(path.join(__dirname, '../client/public/')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/test', testController);

app.use('*', defaultRoute);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});