const signUpPollRoute = (app) => {

    app.get('/signupinfo', (req, res) => {
        options['url'] = `${process.env.HEROKU_API_BASE}/app-setups/${req.params.id}`

        request(options, (err, res, body) => {
            userRes.send(body);
        });
    });

};

module.exports = signUpPollRoute;
