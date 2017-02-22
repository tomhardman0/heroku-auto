const ClientBase = require('./clientbase');
const Sequelize = require('sequelize');

class Postgres extends ClientBase {
    constructor(config) {
        super();

        this.dbUrl = config.dbUrl;
        this.client = new Sequelize(this.dbUrl);

        this._createUserModel();
        this._syncTables();
    }

    createUser(data) {
        return this.User.findOrCreate({
            'where': { 'email': data.email },
            'defaults': data
        }).spread((user, created) => {
            if (created) return user.get({ 'plain': true });
            else throw new Error('Cant create new user');
        });
    }

    async updateUser(email, data) {
        const user = await this.User.findOne({
            'where': { 'email': email }
        });

        return user.update(data)
            .then((user) => {
                return user.get({ 'plain': true });
            });
    }

    _createUserModel() {
        this.User = this.client.define('user', {
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            appName: Sequelize.STRING,
            url: Sequelize.STRING,
            appId: Sequelize.STRING,
            active: Sequelize.BOOLEAN
        }, {
            freezeTableName: true
        });
    }

    _syncTables() {
        this.User.sync({force: true});
    }

}

module.exports = Postgres;
