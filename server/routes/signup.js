const signUpRoute = (app) => {
    const heroku = app.locals.clients.heroku;
    const postgres = app.locals.clients.postgres;

    app.post('/signup', async (req, res) => {
        const envOverrides = {
    		'APP_NAME': req.body.appName,
    		'USER_EMAIL': req.body.email,
    		'APP_INIT_PASSWORD': req.body.password
        };

        const user = await postgres.createUser({
            'name': req.body.name,
    		'appName': req.body.appName,
    		'email': req.body.email,
    		'active': false,
            'url': null,
            'appId': null
        });
        const data = await heroku.signUp(envOverrides);

        const response = {
            'status': data.status,
            'build': data.build,
            'id': data.id
        };
        res.send(response);
    });

};

module.exports = signUpRoute;
