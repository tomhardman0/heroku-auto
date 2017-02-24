const setCustomCnameRoute = (app) => {
    const namecheap = app.locals.clients.namecheap;

    app.post('/setcustomcname', async (req, res) => {

        let response;

        try {
            const data = {
                'clientIp': req.ip.replace('::ffff:' , ''),
                'appName': req.body.appName,
                'dnsUrl': req.body.dnsUrl
            };
            const cname = await namecheap.setCustomCname(data);
            response = { 'url': `http://${req.body.appName}.junipapp.io`};
        } catch (err) {
            response = err;
            response.error = true;
            console.error(response)
        }

        res.send(response);
    });
};

module.exports = setCustomCnameRoute;
