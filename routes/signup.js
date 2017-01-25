const signUpRoute = (app) => {
    const heroku = app.locals.clients.heroku;

    app.post('/signup', async (req, res) => {
        const envOverrides = {
    		'APP_NAME': 'an app name',
    		'USER_EMAIL': req.body.email,
    		'APP_INIT_PASSWORD': req.body.password
        };

        const data = await heroku.signUp(envOverrides);
        res.send(data);
    });

};

module.exports = signUpRoute;
