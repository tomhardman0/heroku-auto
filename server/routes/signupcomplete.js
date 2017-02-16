const signUpCompleteRoute = (app) => {
    const postgres = app.locals.clients.postgres;

    app.post('/signup/complete', async (req, res) => {

        const updatedUser = await postgres.updateUser(req.body.email, {
    		    'active': true,
            'url': req.body.url,
            'appId': req.body.appId
        });

        const response = {
            done: true,
            'url': updatedUser.url
        };
        res.send(response);
    });

};

module.exports = signUpCompleteRoute;
