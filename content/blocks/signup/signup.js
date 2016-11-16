import request from 'browser-request';

export default (app) => {
    const form = document.querySelector('.js-signup-form');

    const options = {
        method: 'POST',
        url: '/signup'
    };

    const handleCreation = (err, res, body) => {
      if (err) throw new Error(err);
      body = JSON.parse(body);
      
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
        options['body'] = JSON.stringify(data);

        request(options, handleCreation);
    }

    form.addEventListener('submit', handleSubmission);
}
