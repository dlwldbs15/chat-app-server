const mongoose = require('mongoose');

const {Schema} = mongoose;
const {Types: {ObjectId}} = Schema;
/**
 * 아이디, 비밀번호, 닉네임, 생일, 이메일
 * 임시로 닉네임/아이디만
 */

const userSchema = new Schema({
    roomId: {
        type: ObjectId,     // 자료형
        ref: 'Room'
    },
    nickname: {
        type: String,     // 자료형
        required: true,   // 필수 여부
    },
    //birth: {
    //  type: Date,
    //  default: Date.now,
    //},
    //email: {
    //  type: String,
    //  required : true,
    //  lowercase : true
    //},
})

module.exports = mongoose.model('User', userSchema);