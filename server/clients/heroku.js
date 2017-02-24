const ClientBase = require('./clientbase');

class Heroku extends ClientBase {
    constructor(config) {
        super();

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

    setCustomDomain(data) {
        const options = this._getCustomDomainOptions(data);
        return this._getRequestPromise(options);
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
                    'url': `https://api.github.com/repos/tomhardman0/junip-cms/tarball/master?access_token=${this.gitAccessToken}`,
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
            'url': `${this.baseUrl}/apps/${data.appId}/domains`,
            'json': true,
            'method': 'POST',
            'body': {
                'hostname': `${data.appName.toLowerCase()}.junipapp.io`
            }
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
