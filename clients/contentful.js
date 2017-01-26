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
        this.space = this.space || await this.client.getSpace(this.spaceId);
        return this.space;
    }

}

module.exports = Contentful;
