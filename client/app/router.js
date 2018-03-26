/* @ngInject */
export default function Router($stateProvider, $urlRouterProvider, $locationProvider) {
    const VIEWS_PATH = './views/';

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: VIEWS_PATH + 'home.html',
            controller: 'HomeController as home'
        })
        .state('user', {
            url: '/user',
            templateUrl: VIEWS_PATH + 'user.html',
            controller: 'UserController as user'
        });

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
}