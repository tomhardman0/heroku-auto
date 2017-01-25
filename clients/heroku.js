const request = require('request');

class Heroku {
    constructor(config) {
        this.baseUrl = config.baseUrl;
        this.apiKey = config.apiKey;
    }

    signUp(envOverrides) {
        const options = this._getSignUpOptions();
        options['body']['overrides'] = {
            'env': envOverrides
        };

        return new Promise(function(resolve, reject) {
            request(options, (err, res, body) => {
        		if (err) reject(err);
                else resolve(body);
        	});
        });
    }

    _getSignUpPollOptions() {
        return {
            'headers': this._getBaseHeaders(),
            'json': true,
            'method': 'GET'
        };
    }

    _getSignUpOptions() {
        return {
            'url': `${this.baseUrl}/app-setups`,
            'headers': this._getBaseHeaders(),
            'json': true,
            'method': 'POST',
            'body': {
                'source_blob': {
                    'url': `https://api.github.com/repos/tomhardman0/greaterthan-design-template/tarball/master?access_token=${process.env.GIT_ACCESS_TOKEN}`,
                    'checksum': null,
                    'version': 1
                },
                'overrides': {}
            }
        };
    }

    _getBaseHeaders() {
        return {
            'Accept': 'application/vnd.heroku+json; version=3',
            'Authorization': `Bearer ${this.apiKey}`
        };
    }
}

module.exports = Heroku;
