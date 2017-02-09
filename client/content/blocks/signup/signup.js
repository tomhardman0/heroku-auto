import request from 'browser-request';

export default (app) => {
    const form = document.querySelector('.js-signup-form');
    const buttonText = document.querySelector('.js-signup-button-text');
    const loader = document.querySelector('.js-loader');

    const handleSubmission = (e) => {
        e.preventDefault();

        buttonText.style.opacity = 0;
        loader.style.opacity = 1;

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
            .then((res) => {
                console.log('final', res)
            });
    }

    form.addEventListener('submit', handleSubmission);
}
