const pg = require('pg');

class Postgres {
    constructor(config) {
        this.dbUrl = config.dbUrl;
    }

    async createUser(data) {
        const db = await this._getClient();
        const dataArr = [data.name, data.email, data.appName, false];

        const create = await this._query(db.client, this._getCreateUserQuery(data), dataArr);

        db.done();
        return create;
    }

    _query(client, query, data) {
        return new Promise((resolve, reject) => {
            client.query(query, data, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    _getClient() {
        return new Promise((resolve, reject) => {
            pg.connect(this.dbUrl, (err, client, done) => {
                if (err) {
                    done();
                    reject(err);
                }

                resolve({client, done});
            });
        });
    }

    _getCreateUserQuery() {
        return 'INSERT INTO users(name, email, appName, active) values($1, $2, $3, $4)';
    }

    _getSelectUserByEmailQuery() {
        return `SELECT * FROM users WHERE email='$1'`;
    }
}
