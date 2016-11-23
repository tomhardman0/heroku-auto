import request from 'browser-request';

export default (app) => {
    const form = document.querySelector('.js-signup-form');

    const fadeInForm = (e) => {
        console.log(window.pageYOffset, ((70/100) * window.innerHeight))
        if (window.pageYOffset > ((70/100) * window.innerHeight)) {
            Array.prototype.forEach.call(form.elements, (elem, i) => {
                setTimeout(() => {
                    elem.classList.add('signup--fade-in');
                }, (i+1)*150);
            });
        }
    };

    const options = {
        method: 'POST',
        url: '/signup',
        json: true
    };

    const handleCreation = (err, res, body) => {
      if (err) throw new Error(err);

      if (body.build && body.build.status === 'succeeded') {
        console.log(body);
      } else if (body.status === 'pending')  {
        options['url'] = `/signup/${body.id}`;
        options['method'] = 'GET';
        delete options.body;

        setTimeout(() => {
          request(options, handleCreation);
        }, 1000);
      }
    };

    const handleSubmission = (e) => {
        e.preventDefault();

        const email = form.elements['email'].value;
        const password = form.elements['password'].value;
        const data = {
            email: email,
            password: password
        };
        options['body'] = data;
        console.log(options)
        request(options, handleCreation);
    }

    form.addEventListener('submit', handleSubmission);
    window.addEventListener('scroll', fadeInForm, false);
}
