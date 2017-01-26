const contentful = require('contentful-management');

class Contentful {
    constructor(config) {
        this.client = contentful.createClient({
            'accessToken': config.accessToken
        });
        this.spaceId = config.spaceId;
        this.userContentTypeId = '3Zshhv8HwMPqoiXpyo1644';
    }

    async createUser(newUser) {
        const space = await this._getSpace();
        const newUser = await space.createEntry(this.userContentTypeId, newUser);
    }

    async _getEntries() {
        const space = await this._getSpace();
        return await space.getEntries();
    }

    async _getSpace() {
        this.space = this.space || await this.client.getSpace(this.spaceId);
        return this.space;
    }

}

module.exports = Contentful;
