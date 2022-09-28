var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var userSchema = new Schema({
    name:{type: String, required: true},
    username:{type: String, required: true, unique:true},
    email: {type: String, required: true, unique:true},
    password: {type: String, required: true},
    bio:{type: String},
    image:{type: String},
    following: [{type:Schema.Types.ObjectId, ref:'User'}],
    followers: [{type:Schema.Types.ObjectId, ref:'User'}]
})

userSchema.pre('save', async function(next){
    try {
        if(this.password){
            this.password = await bcrypt.hash(this.password, 10);
        }
        next()
    } catch (error) {
        next(error)
    }
})

userSchema.methods.verifyPassword = async function(password){
    try {
        const result = bcrypt.compare(password, this.password);
        return result;
    } catch (error) {
        next(error)
    }
}

userSchema.methods.signToken = async function(){
  const payload = {userId:this.id, email: this.email};
  try {
      let token = await jwt.sign(payload, process.env.JSONSECRET);
      return token;
  } catch (error) {
      return error;
  }
}

userSchema.methods.userJSON = function(token){
    return {
        token: token,
        email: this.email,
        username: this.username
    }
}

module.exports = mongoose.model('User', userSchema);