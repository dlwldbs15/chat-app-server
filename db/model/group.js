const mongoose = require('mongoose');

const {Schema} = mongoose;
const {Types: {ObjectId}} = Schema;
/**
 * 아이디, 공고제목, 생성일자, 마감기한
 */

const groupSchema = new Schema({
    title: {
        type: String,     // 자료형
        required: true,   // 필수 여부
    },
    createAt: {
      type: Date,
      default : Date.now(),
      required : true,
    },
    deadline: { 
      type: Date,
      default : Date.now(),
      required : true,
    }
})

module.exports = mongoose.model('Group', groupSchema);