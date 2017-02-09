import request from 'browser-request';

export default (app) => {
    const form = document.querySelector('.js-signup-form');

    const handleSubmission = (e) => {
        e.preventDefault();

        const email = form.elements['email'].value;
        const password = form.elements['password'].value;
        const name = form.elements['name'].value;
        const appName = form.elements['appName'].value;
        const data = {
            email: email,
            password: password,
            name: name,
            appName: appName
        };

        app.clients.api.signUp(data)
            .then(app.clients.api.signUpPoll)
            .then((res) => {
                console.log('final', res)
            });
    }

    form.addEventListener('submit', handleSubmission);
}
