const signUpCompleteRoute = (app) => {
    const postgres = app.locals.clients.postgres;

    app.post('/signup/complete', async (req, res) => {
        let response;

        try {
            const updatedUser = await postgres.updateUser(req.body.email, {
    		    'active': true,
                'appName': req.body.appName,
                'appId': req.body.appId
            });
            response = {
                'appId': req.body.appId
            };
        } catch (err) {
            response = err;
            response.error = true;
        }

        res.send(response);
    });
};

module.exports = signUpCompleteRoute;
