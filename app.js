const Http = require('http');
const Mongoose = require('mongoose');
const ShoppingRouter = require('./routes/shopping.routes');

Mongoose.Promise = global.Promise;

Mongoose.connect(
    'mongodb://@localhost:27017/shopping-list',
    {useNewUrlParser : true},
    (err)=>{
        if(err) console.log(`Mongodb connexion error ${err.message}`);
        else console.log('Mongodb now connected on port 27017');
    }
);

const server = Http.createServer( ShoppingRouter ).listen(8001, (err)=>{
    if(err) console.log(`Http server listenning error ${err.message}`);
    else console.log('Http server now connected on port 8001');
})
