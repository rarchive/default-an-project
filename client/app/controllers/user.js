const HTTP = new WeakMap();

/* @ngInject */
export default class UserController {

    constructor($scope, $http) {
        $scope.user = 'rinmu';

        this.data = {
            id: 'id',
            password: 'pw'
        };

        HTTP.set(this, $http);
    }

    testCall1() {

        let formData = new FormData();
        Object.keys(this.data).forEach(key => {
            formData.append(key, this.data[key]);
        });

        HTTP.get(this).post('/api/test/call1', formData, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        });
    }
}