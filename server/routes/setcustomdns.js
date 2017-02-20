const setCustomDnsRoute = (app) => {
    const heroku = app.locals.clients.heroku;

    app.post('/setcustomdns', async (req, res) => {

        let response;

        try {
            const dns = await heroku.setCustomDomain(req.body);
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
