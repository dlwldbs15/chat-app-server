const { default: mongoose } = require('mongoose');
const Chat = require('../db/model/chat')

exports.create = (req, res) => {
  if (!req.body.message) {
      res.status(400).send({
        message: 'Message is empty!'
      });
      return;
  }
  const chat = new Chat({
      roomId: req.body.roomId,
      userName: req.body.userName,
      message: req.body.message,
  })
  // Save document
  chat.save().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || 'Create document failure.'
    });
  });
}

// Retrieve all documents by RoomId
exports.findAllByRoomId = (req, res) => {
    // Retrieve all documents
    const room_id = req.params.roomId;
    const condition = { roomId : room_id }
    Chat.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || 'Retrieve document failure.'
        });
      });
  };
// Retrieve all documents by Text
  exports.findAllByText = (req, res) => {
    // Retrieve all documents
    const room_id = req.params.roomId;
    const text = req.body.message;
    const condition = text ? { roomId : room_id } : {};
    Chat.find(condition)
      .then(data => {
        filtered_data = data.filter(function(item) {
          return item.message.includes(text)
        });
        res.send(filtered_data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || 'Retrieve document failure.'
        });
      });
  };
    
  // Delete document by id
  exports.delete = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: 'Data is empty!'
      });
    }
    
    // Set id
    const id = req.params.id;
  
    // Delete document by id
    Chat.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: 'Cannot delete document. (id: ' + id + ')'
          });
        } else {
          res.send({
            message: 'Document deleted.'
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || 'Delete document failure. (id: ' + id + ')'
        });
      });
  };

    // Delete All document by room id
    exports.deleteAllByRoomId = (req, res) => {
      if (!req.body) {
        return res.status(400).send({
          message: 'Data is empty!'
        });
      }
      
      // Set id
      const room_id = req.params.roomid;
      const condition = { roomId : room_id };
      Chat.deleteMany(condition)
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: 'Cannot delete document. (room id: ' + room_id + ')'
            });
          } else {
            res.send({
              message: 'Documents all deleted.'
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: err.message || 'Delete all documens failure. (room id: ' + room_id + ')'
          });
        });
    };