const namecheapApi = require('namecheap-api');
const ClientBase = require('./clientbase');

class Namecheap extends ClientBase {
    constructor(config) {
        super();

        this.apiKey = config.apiKey;
        this.username = config.username;
        this.proxyUrl = config.proxyUrl;
        this.api = namecheapApi;

        this._setConfig();
    }

    _setConfig() {
        this.api.config.set('ApiUser', this.username);
        this.api.config.set('ApiKey', this.apiKey);
        this.api.config.set('Proxy', this.proxyUrl);
    }

    setCustomCname(data) {
        this.api.config.set('ClientIp', data.clientIp);
        const options = this._getSetCustomCnameOptions(data);

        return this.api.apiCall('namecheap.domains.dns.setHosts', options);
    }

    _getCurrentHosts(data) {
        this.api.config.set('ClientIp', data.clientIp);
        const options = this._getCurrentHostsOptions();

        return this.api.apiCall('namecheap.domains.dns.getHosts', options);
    }

    _getCurrentHostsOptions() {
        return {
            'SLD': 'junip',
            'TLD': 'io'
        };
    }

    _getSetCustomCnameOptions(data) {
        return {
            'SLD': 'junip',
            'TLD': 'io',
            'HostName1': data.appName,
            'RecordType1': 'CNAME',
            'Address1': data.dnsUrl,
            'TTL1': '60'
        };
    }
}

module.exports = Namecheap;
