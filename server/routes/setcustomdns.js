const setCustomDnsRoute = (app) => {
    const heroku = app.locals.clients.heroku;

    app.post('/setcustomdns', async (req, res) => {

        let response;

        try {
            const dns = await heroku.setCustomDomain(req.body);
            response = {
                'dnsUrl': dns.cname,
                'appName': req.body.appName
            };
        } catch (err) {
            response = err;
            response.error = true;
            console.error(response)
        }

        res.send(response);
    });
};

module.exports = setCustomDnsRoute;
