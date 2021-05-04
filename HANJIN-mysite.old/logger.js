const { createLogger, format, transports } = require('winston');
const path = require('path');

const folder = path.join(__dirname, 'logs');

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss"
        }),
        format.json(),
        format.json(),
    ),
    transports: [
        new transports.File({ filename: path.join(folder, 'combine.log') }),
        new transports.File({ filename: path.join(folder, 'error.log'), level: 'error' }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({ format: format.simple() }));
}

module.exports = logger;