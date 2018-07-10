const objectid = require('objectid');

module.exports = function(req, res, next) {
  if (!objectid.isValid(req.params.id))
    return res.status(404).send('Invalid ID.');
  
  next();
}