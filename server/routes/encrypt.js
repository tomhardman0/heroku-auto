const encryptRoute = (app) => {
    const letsEncryptReponse = process.env.CERTBOT_RESPONSE;

    // Return the Let's Encrypt certbot response:
    app.get('/.well-known/acme-challenge/:content', (req, res) => {
        res.send(letsEncryptReponse);
    });
}
