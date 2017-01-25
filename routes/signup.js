const signUpRoute = (app) => {

    app.post('/signup', async (req, res) => {
        const envOverrides = {
    		'APP_NAME': 'an app name',
    		'USER_EMAIL': req.body.email,
    		'APP_INIT_PASSWORD': req.body.password
        };

        console.log(await heroku.signUp(envOverrides));
    });

};

module.exports = signUpRoute;
