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
        this.requestedCname = data;
        return this._getCurrentHosts(data);
    }

    _setCustomCname(data) {
        Object.assign(data, this._getRequestOptionForHost(this.requestedCname, 1));
        return this.api.apiCall('namecheap.domains.dns.setHosts', data);
    }

    _getCurrentHosts(data) {
        this.api.config.set('ClientIp', data.clientIp);
        const options = this._getBasicRequestOptions();

        return this.api.apiCall('namecheap.domains.dns.getHosts', options)
            .then(this._createHostsJson.bind(this))
            .then(this._setCustomCname.bind(this));
    }

    _createHostsJson(data) {
        const postData = this._getBasicRequestOptions();

        const hosts = data.response[0].DomainDNSGetHostsResult[0].host;
        hosts.forEach((host, index) => {
            Object.assign(postData, this._getRequestOptionForHost(host.$, index+2));
        })

        return postData;
    }

    _getBasicRequestOptions() {
        return {
            'SLD': 'junip',
            'TLD': 'io'
        };
    }

    _getRequestOptionForHost(host, index) {
        const data = {};
        data[`HostName${index}`] = host.Name || host.appName;
        data[`RecordType${index}`] = host.Type || 'CNAME';
        data[`Address${index}`] = host.Address || host.dnsUrl;
        data[`TTL${index}`] = '60';
        return data;
    }
}

module.exports = Namecheap;
