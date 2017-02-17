const request = require('request');

class Heroku {
    constructor(config) {
        this.baseUrl = config.baseUrl;
        this.apiKey = config.apiKey;
        this.gitAccessToken = config.gitAccessToken;
    }

    signUp(envOverrides) {
        const options = this._getSignUpOptions(envOverrides);
        return this._getRequestPromise(options);
    }

    signUpPoll(pollId) {
        const options = this._getSignUpPollOptions(pollId);
        return this._getRequestPromise(options);
    }

    _setCustomDomain(data) {
        const options = this._getCustomDomainOptions(data);
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

    _getSignUpPollOptions(pollId) {
        return {
            'headers': this._getBaseHeaders(),
            'json': true,
            'method': 'GET',
            'url': `${this.baseUrl}/app-setups/${pollId}`
        };
    }

    _getSignUpOptions(envOverrides) {
        return {
            'url': `${this.baseUrl}/app-setups`,
            'headers': this._getBaseHeaders(),
            'json': true,
            'method': 'POST',
            'body': {
                'source_blob': {
                    'url': `https://api.github.com/repos/tomhardman0/greaterthan-design-template/tarball/master?access_token=${this.gitAccessToken}`,
                    'checksum': null,
                    'version': 1
                },
                'overrides': { 'env': envOverrides }
            }
        };
    }

    _getCustomDomainOptions(data) {
        return {
            'headers': this._getBaseHeaders(),
            'url': `${this.baseUrl}/apps/${data.id}/domains`,
            'json': true,
            'method': 'POST',
            'body': data.body
        }
    }

    _getBaseHeaders() {
        return {
            'Accept': 'application/vnd.heroku+json; version=3',
            'Authorization': `Bearer ${this.apiKey}`
        };
    }
}

module.exports = Heroku;
