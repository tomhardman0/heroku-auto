const contentful = require('contentful-management');

class Contentful {
    constructor(config) {
        this.client = contentful.createClient({
            'accessToken': config.accessToken
        });
        this.spaceId = config.spaceId;
    }

    async _getEntries() {
        const space = await this._getSpace();
        return await space.getEntries();
    }

    async _getSpace() {
        return await this.client.getSpace(this.spaceId);
    }

}

module.exports = Contentful;
