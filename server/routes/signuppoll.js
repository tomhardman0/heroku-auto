const signUpPollRoute = (app) => {
    const heroku = app.locals.clients.heroku;

    app.get('/signup/:id', async (req, res) => {
        let response;

        try {
            const data = await heroku.signUpPoll(req.params.id);
            response = {
                'status': data.status,
                'build': data.build,
                'id': data.id,
                'appId': data.app.id
            };
        } catch (err) {
            response = err;
            response.error = true;
        }

        res.send(response);
    });
};

module.exports = signUpPollRoute;
