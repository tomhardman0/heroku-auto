import _ from 'lodash';
import async from 'async';

import smoothScroll from 'smoothscroll-polyfill';
smoothScroll.polyfill();

import Api from '../clients/api';

import landing from './blocks/landing/landing';
import signUp from './blocks/signup/signup';

const controllers = [
    signUp,
    landing
];

const app = window.app = {};

app.clients = {
    api: new Api()
}

app.utils = {
    _,
    async
};

app.state = {};

controllers.forEach(ctrl => {
    app[ctrl.name] = ctrl;
    app[ctrl.name](app);
});
