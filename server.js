import Queue from './queue.js';
import constants from './constants.js';
import express from 'express';
const app = express();

let dict = {}

app.get('/rate_test', (req, res) => {
    if ( !dict.hasOwnProperty(req.ip) ) {
        dict[req.ip] = new Queue(constants.X, constants.RATE_LIMIT_TIME);
    }
    const response = dict[req.ip].enqueue(Date.now());
    res.set('X-WAIT-TILL', response.time);
    res.set('X-RATE-LIMIT', constants.RATE_LIMIT_TIME);
    if (!response.success) {
       return res.status(429).send({message: "Too Many Requests: Rate limiter enforced"});
    }
    return res.status(200).send({message: 'Request Accepted'});
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
