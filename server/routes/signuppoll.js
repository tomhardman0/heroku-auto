const signUpPollRoute = (app) => {
    const heroku = app.locals.clients.heroku;

    app.get('/signup/:id', async (req, res) => {
        const data = await heroku.signUpPoll(req.params.id);
        const response = {
            'status': data.status,
            'build': data.build,
            'id': data.id,
            'app': data.app
        };

        res.send(response);
    });

};

module.exports = signUpPollRoute;
