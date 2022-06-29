//Require route:
const client = require('./client');
const manager = require('./manager');
const middleware = require('../config/middleware');
const route = (app)=>{
    app.use('/',client);
    app.use('/manager',middleware. checkadmin,manager);
}

module.exports = route;