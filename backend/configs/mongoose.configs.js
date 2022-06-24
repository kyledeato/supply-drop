const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Supply_Drop_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true
})
    .then(() => console.log("Established a connection to the database"))
    .catch(err => console.log("Somthing went wrong when connecting to the database", err));