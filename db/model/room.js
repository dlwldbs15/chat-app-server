const mongoose = require('mongoose');

const {Schema} = mongoose;
const {Types: {ObjectId}} = Schema;
/**
 * 아이디, 속한 그룹 아이디, 제목, 생성일자
 */

const roomSchema = new Schema({
    groupId: {
        type: ObjectId,
        required: true,
        ref:'Group'
    },
    title: {
        type: String,     // 자료형
        required: true,   // 필수 여부
    },
    createAt: {
      type: Date,
      default : Date.now(),
      required : true,
    },
})

module.exports = mongoose.model('Room', roomSchema);