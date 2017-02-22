const request = require('request');

class ClientBase {
    _getRequestPromise(options) {
        return new Promise((resolve, reject) => {
            request(options, (err, res, body) => {
                if (err) reject(err);
                else resolve(body);
            });
        });
    }
}

module.exports = ClientBase;
