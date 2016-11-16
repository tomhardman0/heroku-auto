export default (app) => {
    const form = document.querySelector('.js-signup-form');

    const handleSubmission = (e) => {
        e.preventDefault();

        const email = form.elements['email'].value;
        const password = form.elements['password'].value;
        const data = {
            email: email,
            password: password
        };

        const req = new XMLHttpRequest();
        req.onreadystatechange = (res) => {
            if (res.currentTarget.readyState == 4 && res.currentTarget.status == 200) {
                console.log(JSON.parse(res.currentTarget.responseText));
            }
        };

        req.open('POST', '/signup');
        req.setRequestHeader('Content-Type', 'application/json');
        req.send(JSON.stringify(data));

        console.log(e);
    }

    form.addEventListener('submit', handleSubmission);
}
