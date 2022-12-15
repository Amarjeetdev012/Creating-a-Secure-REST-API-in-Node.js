# Creating-a-Secure-REST-API-in-Node.js

<!-- app.use(function (req, res, next) {
res.header('Access-Control-Allow-Origin', '\*');
res.header('Access-Control-Allow-Credentials', 'true');
res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
res.header('Access-Control-Expose-Headers', 'Content-Length');
res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
if (req.method === 'OPTIONS') {
return res.sendStatus(200);
} else {
return next();
}
}); -->


const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;
const functions = require('./functions');

const userSchema = new Schema({
    email: String,
    password: String,
    number: String,
    state: Boolean
});

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
    virtuals: true
});

userSchema.findById = function (cb) {
    return this.model('Users').find({id: this.id}, cb);
};

const User = mongoose.model('Users', userSchema);


exports.findByEmail = (email) => {
    //console.log('hello'); //this works btw
    return User.find({email: email});
};
