import '../style/main.scss';

import angular from 'angular';
import '@uirouter/angularjs';
import 'ng-file-upload';

import Router from './router';

import HomeController from './controllers/home';
import UserController from './controllers/user';

angular.module('TESTAPP', ['ui.router', 'ngFileUpload'])
    .config(Router)
    .controller('HomeController', HomeController)
    .controller('UserController', UserController);