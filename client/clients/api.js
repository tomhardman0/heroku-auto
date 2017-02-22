import request from 'browser-request';

export default class Api {
    constructor() {
        this.userInfo = {};
    }

    signUp(data) {
        this.userInfo.email = data.email;
        this.userInfo.appName = data.appName;
        const options = this._getSignUpOptions(data);
        return this._getRequestPromise(options)
            .then(this.signUpPoll.bind(this))
            .catch(this._handleError);
    }

    signUpPoll(data) {
        const options = this._getSignUpPollOptions(data);
        return this._getRequestPromise(options)
            .then(this._signUpPoll.bind(this))
            .catch(this._handleError);
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
            } else {
                reject(data);
            }
        });
    }

    setCustomDns(data) {
        const options = this._getSetCustomDnsOptions(data);
        return this._getRequestPromise(options);
    }

    setCustomCname(data) {
        const options = this._getSetCustomCnameOptions(data);
        return this._getRequestPromise(options);
    }

    _getRequestPromise(options) {
        return new Promise((resolve, reject) => {
            request(options, (err, res, body) => {
                if (err) reject(err);
                else resolve(body);
            });
        });
    }

    _getSetCustomCnameOptions(data) {
        return {
            'method': 'POST',
            'url': '/setcustomcname',
            'json': true,
            'body': data
        }
    }

    _getSignUpOptions(data) {
        return {
            'method': 'POST',
            'url': '/signup',
            'json': true,
            'body': data
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
                'appName': this.userInfo.appName,
                'appId': data.appId
            }
        };
    }

    _getSetCustomDnsOptions(data) {
        return {
            'method': 'POST',
            'url': '/setcustomdns',
            'json': true,
            'body': {
                'appId': data.appId,
                'appName': this.userInfo.appName
            }
        }
    }

    _handleError(err) {
        err.error = true;
        throw err;
    }
}
