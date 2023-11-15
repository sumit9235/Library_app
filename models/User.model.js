const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    Name: String,
    Email: String,
    Password: String,
    Role:[{
        type: String,
        enum: ["CREATOR", "VIEWER", "VIEW_ALL"]
    }],

}, {
    versionKey: false
})


const UserModel = mongoose.model("user", UserSchema);

module.exports = {
    UserModel
}