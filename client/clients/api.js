import request from 'browser-request';

export default class Api {
    constructor() {
        this.userInfo = {};
    }

    signUp(data) {
        const options = this._getSignUpOptions();
        options['body'] = data;
        return this._getRequestPromise(options);
    }

    signUpPoll(data) {
        const options = this._getSignUpPollOptions(data.id);
        return this._getRequestPromise(options)
            .then(this._signUpPoll.bind(this));
    };

    _signUpPoll(data){
        data = JSON.parse(data);
        if (data.build && data.build.status === 'succeeded') {
            const options = this._getSignUpCompleteOptions(data);
            return this._getRequestPromise(options);
        } else if (data.status === 'pending') {
            return setTimeout(() => this.signUpPoll(data), 1000);
        }
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

    _getSignUpPollOptions(id) {
        return {
            'method': 'GET',
            'url': `/signup/${id}`,
        };
    }

    _getSignUpCompleteOptions(data) {
        return {
            'method': 'GET',
            'url': '/signup/complete',
            'body': {
                'email': this.userInfo.email,
                'url': data.app.name,
                'appId': data.app.id
            }
        };
    }
}
