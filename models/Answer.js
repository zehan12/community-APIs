var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var answerSchema = new Schema({
    text: {type: String},
    author: {type: Schema.Types.ObjectId, ref:'User'}
}, {timestamps: true}) 

module.exports = mongoose.model('Answer', answerSchema);