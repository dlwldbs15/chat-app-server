const mongoose = require('mongoose');

const {Schema} = mongoose;
const {Types: {ObjectId}} = Schema;
/**
 * 작성자, 내용, 생성일(시간), 링크
 */

 const chatSchema = new Schema({
   roomId : {
     type: ObjectId,
     required: true,
     ref: 'Room'
   },
   userName: {
     type: String,
     required: true,
     ref: 'User'      // User Schema의 아이디
   },
   message: {
     type: String,
     requried: true,
   },
   createAt: {
     type: Date,
     default: Date.now,
     required: true,
   },
 })

module.exports = mongoose.model('Chat', chatSchema);