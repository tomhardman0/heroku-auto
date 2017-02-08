const signUpPollRoute = (app) => {
    const heroku = app.locals.clients.heroku;

    app.get('/signuppoll/:id', async (req, res) => {
        const data = await heroku.signUpPoll(req.params.id);
        res.send(data);
    });

};

module.exports = signUpPollRoute;
