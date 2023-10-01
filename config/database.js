const mongoose = require('mongoose');

require('dotenv').config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(console.log('DB connected successfully'))
    .catch((Error) => {
        console.log('DB Connection failed');
        console.log(Error);
        process.exit(1);
    })
}