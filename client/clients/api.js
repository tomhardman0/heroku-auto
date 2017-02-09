import request from 'browser-request';

export default class Api {
    constructor() {
        this.userInfo = {};
    }

    signUp(data) {
        this.userInfo.email = data.email;
        const options = this._getSignUpOptions();
        options['body'] = data;
        return this._getRequestPromise(options)
            .then(this.signUpPoll.bind(this));
    }

    signUpPoll(data) {
        const options = this._getSignUpPollOptions(data);
        return this._getRequestPromise(options)
            .then(this._signUpPoll.bind(this));
    };

    _signUpPoll(data){
        data = JSON.parse(data);

        return new Promise((resolve, reject) => {
            if (data.build && data.build.status === 'succeeded') {
                const options = this._getSignUpCompleteOptions(data);
                this._getRequestPromise(options).then(resolve);
            } else if (data.status === 'pending') {
                setTimeout(() => {
                    this.signUpPoll(data).then(resolve);
                }, 1000);
            }
        });
    }

    _getRequestPromise(options) {
        return new Promise((resolve, reject) => {
            request(options, (err, res, body) => {
                if (err) reject(err);
                else resolve(body);
            });
        });
    }

    _getSignUpOptions() {
        return {
            'method': 'POST',
            'url': '/signup',
            'json': true
        };
    }

    _getSignUpPollOptions(data) {
        return {
            'method': 'GET',
            'url': `/signup/${data.id}`
        };
    }

    _getSignUpCompleteOptions(data) {
        return {
            'method': 'POST',
            'url': '/signup/complete',
            'json': true,
            'body': {
                'email': this.userInfo.email,
                'url': `https://${data.app.name}.herokuapp.com`,
                'appId': data.app.id
            }
        };
    }
}
