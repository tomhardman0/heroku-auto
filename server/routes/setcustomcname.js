const setCustomCnameRoute = (app) => {
    const namecheap = app.locals.clients.namecheap;

    app.post('/setcustomcname', async (req, res) => {

        let response;

        try {
            const data = {
                'clientIp': req.ip,
                'appName': req.body.appName
            };
            response = await namecheap.setCustomCname(data);
        } catch (err) {
            response = err;
            response.error = true;
            console.error(response)
        }

        res.send(response);
    });
};

module.exports = setCustomCnameRoute;
