const signUpRoute = (app) => {
    const heroku = app.locals.clients.heroku;

    app.post('/signup', (req, res) => {
        const envOverrides = {
    		'APP_NAME': 'an app name',
    		'USER_EMAIL': req.body.email,
    		'APP_INIT_PASSWORD': req.body.password
        };

        heroku.signUp(envOverrides)
        .then((body) => console.log(body));
    });

};

module.exports = signUpRoute;
