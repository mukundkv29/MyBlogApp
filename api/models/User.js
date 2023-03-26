const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const UserSchema = new Schema({
    username:{type:String, min:4, unique:true, require:true},
    password:{type:String, require:true}
});


const UserModel = model('User', UserSchema);

module.exports=UserModel;