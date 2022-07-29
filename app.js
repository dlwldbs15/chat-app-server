/* \room_chat\app.js */
const express = require('express');
const http = require('http');
const bodyParser= require('body-parser');
const cors = require('cors');
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"]
}

const initExpress = () => {
  const app = express();
  app.use(cors(corsOptions));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use('/', require('./routes/route'));

  //app.set('view engine', 'ejs');
  //app.set('views', './server/views');
  //app.get('/', (req, res) => {
  //  res.render('index');
  //});

  let port = process.env.PORT || 8080;
  const server = http.createServer(app);
  server.listen(port, () => {
    console.log('Connect at ' + port);
  });
  return server;
};

const initMongo = async () => {
  //MongoDB 연결
  var connect = require('./db');
  connect();
};

const main = () => {
  initMongo().then(() => {
    const server = initExpress();
    console.log(server.address());
    const webSocket = require('./socket');
    webSocket(server);
  });
};

main();


