const setCustomDnsRoute = (app) => {
    const heroku = app.locals.clients.heroku;

    app.post('/setcustomdns', async (req, res) => {

        let response;

        try {
            console.log('body for setcustomdns', req.body)
            const dns = await heroku.setCustomDomain(req.body);
            console.log('dns response object', dns)
            response = {
                'cname': dns.cname
            };
        } catch (err) {
            response = err;
            response.error = true;
        }

        res.send(response);
    });
};

module.exports = setCustomDnsRoute;
