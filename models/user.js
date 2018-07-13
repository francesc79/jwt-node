const config = require('config');
const jwt = require('jsonwebtoken');
const objectid = require('objectid');
const _ = require('lodash');
const Joi = require('Joi');

const users = [
    {_id: objectid(), name: 'francesco', email:'fran.zaz@test.com', password: '$2b$10$tP00fZ3R20fvfbhIKpQHQeJ66MGyTudrn5vEPV0RtABTIHw/hZjru' }
];

class User {
    constructor(user) {
        Object.assign(this, user);
    }

    generateAuthToken() {
        const token = jwt.sign(
            { _id: this._id, name: this.name }, 
            config.get('jwtPrivateKey'), 
            {expiresIn: "3 hours"});
        return token;        
    }

    static findOne(params) {
        return new Promise((resolve, reject) => {
            const user = users.find((user) => _.isMatch(user, params));
            if (!user) {
                return reject();
            }
            return resolve(new User(user));
        });
    }
}

function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;