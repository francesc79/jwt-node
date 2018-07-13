const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const config = require('config');

module.exports = function(req, res, next){
    const optionsAuth0 = {
        // Dynamically provide a signing key
        // based on the kid in the header and 
        // the signing keys provided by the JWKS endpoint.
        secret: jwksRsa.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `https://zazos79.eu.auth0.com/.well-known/jwks.json`
        }),
      
        // Validate the audience and the issuer.
        //audience: '{YOUR_API_IDENTIFIER}',
        issuer: `https://zazos79.eu.auth0.com/`,
        algorithms: ['RS256']
      };
    const options = {secret: config.get('jwtPrivateKey')};
    
    jwt(req.headers['access-method'] === 'login' ? options : optionsAuth0)
        (req, res, next);
}