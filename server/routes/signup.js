const signUpRoute = (app) => {
    const heroku = app.locals.clients.heroku;
    const postgres = app.locals.clients.postgres;

    app.post('/signup', async (req, res) => {
        const envOverrides = {
    		'APP_NAME': req.body.appName,
    		'USER_EMAIL': req.body.email,
    		'PASSWORD': req.body.password
        };

        let response;

        try {
            const user = await postgres.createUser({
                'name': req.body.name,
        		'appName': req.body.appName,
        		'email': req.body.email,
        		'active': false,
                'url': null,
                'appId': null
            });
        } catch (err) {
            response = err;
            response.error = true;
        }

        try {
            const data = await heroku.signUp(envOverrides);
            response = {
                'status': data.status,
                'build': data.build,
                'id': data.id
            };
        } catch (err) {
            response = err;
            response.error = true;
        }

        res.send(response);
    });

};

module.exports = signUpRoute;
