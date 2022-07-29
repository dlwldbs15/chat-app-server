const router = require('express').Router();
const group = require('../controllers/group-controller.js');
const room = require('../controllers/room-controller.js');
const user = require('../controllers/user-controller.js');
const chat = require('../controllers/chat-controller.js');

/**
 * Group관련 CRUD API
 */
//그룹 생성
router.post('/api/group', group.create);
//전체 그룹 목록 가져오기
router.get('/api/group', group.findAll);
//id로 그룹 정보 가져오기
router.get('/api/group/:id', group.findOne);
//id로 그룹 정보 업데이트
router.put('/api/group/:id', group.update);
//id로 그룹 삭제
router.delete('/api/group/:id', group.delete);

/**
 * Room관련 CRUD API
 */
//방 생성
router.post('/api/room', room.create);
//전체 방 목록 가져오기
router.get('/api/room', room.findAll);
//id로 방 정보 가져오기
router.get('/api/room/:id', room.findOne);
//id로 방 정보 업데이트
router.put('/api/room/:id', room.update);
//id로 방 삭제
router.delete('/api/room/:id', room.delete);

/**
 * User관련 CRUD API
 */
//사용자 생성
router.post('/api/user', user.create);
//전체 사용자 목록 가져오기
router.get('/api/user', user.findAll);
//id로 사용자 정보 가져오기
router.get('/api/user/:id', user.findOne);
//id로 사용자 정보 업데이트
router.put('/api/user/:id', user.update);
//id로 사용자 삭제
router.delete('/api/user/:id', user.delete);

/**
 * Chat관련 CRUD API
 */
//대화 생성
router.post('/api/chat', chat.create);
//room id로 전체 대화 목록 가져오기
router.get('/api/chat/:roomId', chat.findAllByRoomId);
//text가 포함된 대화 가져오기
router.post('/api/chat/:roomId', chat.findAllByText);
//id로 대화 삭제
router.delete('/api/chat/:roomid/:id', chat.delete);
//room id로 전체 대화 삭제
router.delete('/api/chat/:roomid', chat.deleteAllByRoomId);
module.exports = router;