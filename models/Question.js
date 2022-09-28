var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
    title: {type: String, unique: true, required: true},
    description: {type: String},
    tags: [{type: String}],
    answer: {type: Schema.Types.ObjectId, ref:'Answer'},
    author: {type: Schema.Types.ObjectId, ref:'User'},
    slug: {type: String},
}) 

module.exports = mongoose.model('Question', questionSchema);