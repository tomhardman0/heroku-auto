import request from 'browser-request';

export default (app) => {
    const form = document.querySelector('.js-signup-form');

    const hideInputElms = () => {
        const buttonText = document.querySelector('.js-signup-button-text');
        const loader = document.querySelector('.js-loader');
        const formElCont = document.querySelector('.js-form-el-cont');

        buttonText.opacity = 0;
        loader.style.opacity = 1;
        formElCont.style.opacity = 0;
    };

    const getFormInput = () => {
        const email = form.elements['email'].value;
        const password = form.elements['password'].value;
        const name = form.elements['name'].value;
        const appName = form.elements['appName'].value;
        return {
            email: email,
            password: password,
            name: name,
            appName: appName
        };
    };

    const handleSubmission = (e) => {
        e.preventDefault();
        hideInputElms();

        const data = getFormInput();
        app.clients.api.signUp(data)
            .then((res) => {
                console.log('final', res)
            });
    }

    form.addEventListener('submit', handleSubmission);
}
