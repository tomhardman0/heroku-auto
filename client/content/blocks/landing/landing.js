export default (app) => {
    const signUpPrompt = document.querySelector('.js-signup-prompt');
    const signUp = document.querySelector('.js-signup');

    const infoPrompt = document.querySelector('.js-info-prompt');
    const info = document.querySelector('.js-info');

    signUpPrompt.onclick = () => signUp.scrollIntoView({ behavior: 'smooth' });
    infoPrompt.onclick = () => info.scrollIntoView({ behavior: 'smooth' });
};
