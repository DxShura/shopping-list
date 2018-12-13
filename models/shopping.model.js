const Mongoose = require('mongoose');

const shoppingSchema = new Mongoose.Schema({
    product : {
        type : String,
    },
    numberOf : {
        type : Number,
    },
});

module.exports = Mongoose.model('Shopping', shoppingSchema);