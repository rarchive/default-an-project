const INIT = new WeakMap();

/* @ngInject */
export default class HomeController {

    constructor() {

        INIT.set(this, () => {
            this.hello = 'hoho';
        });

        INIT.get(this)();
    }

    testFunction() {
        return 'this is test function';
    }

}