//Impport library:
const mongoose = require('mongoose');
async function connect_db(){
    try {
        await mongoose.connect('mongodb+srv://admin:ZMmrjZF3rkM2!n$@cluster0.aylnl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
            useNewUrlParser: true, 
            useUnifiedTopology: true 
            });
            console.log('Connect successfully !!!');
    } catch (error) {
            console.log(error);
    }
}

module.exports = connect_db;