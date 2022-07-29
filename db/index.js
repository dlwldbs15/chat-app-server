const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost:27017/OpenChatDB'

const connect = () => {
  mongoose.connect(dbURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => console.log('MongoDB 연결 성공')).catch((err) => {
    console.log(err);
  });
}

mongoose.connection.on('error', (error) => {
  console.error('MongoDB 연결 에러', error);
});

mongoose.connection.on('disconnected', () => {
  console.error('MongoDB 연결이 끊겼습니다. 연결을 재시도 합니다');
  connect();
});

module.exports = connect;