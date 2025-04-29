const moment = require('moment');

function timezoneHandler(req, res, next) {
    const timezone = parseFloat(req.headers['timezone']);

    if (!timezone) {
        return res.status(400).json({ message: 'Timezone header missing' });
    }

    req.timezoneOffset = timezone;
    next();
}

module.exports = timezoneHandler;
