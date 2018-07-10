const morgan = require('morgan');
const winston = require('winston');
require('express-async-errors');

module.exports = function (app) {

  process.on('unhandledRejection', (ex) => {
    throw ex;
  });

  const optionsConsole = {
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.colorize({ all: true }),
      winston.format.printf(nfo => {
        return `${nfo.timestamp} ${nfo.level}: ${nfo.message}`;
      })
    ),
  };

  winston.configure({
    level: 'debug',
    transports: [
      new winston.transports.File({ filename: 'logs/app.log' }),
      new winston.transports.Console(optionsConsole),      
    ],
    exceptionHandlers: [
      new winston.transports.File({ filename: 'logs/exceptions.log' }),
      new winston.transports.Console(optionsConsole),        
    ],
    exitOnError: false
  });  

  const stream = {
    write: function(message, encoding){
      winston.debug(message);
    }
  };  
  app.use(morgan('combined', { stream }));
}


