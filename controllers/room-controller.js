const { default: mongoose } = require('mongoose');
const Room = require('../db/model/room')

exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
          message: 'Title is empty!'
        });
        return;
    }
    const room = new Room({
        groupId: req.body.groupId,
        title: req.body.title
    })
    // Save document
    room.save().then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || 'Create document failure.'
      });
    });
};

exports.findAll = (req, res) => {
    // Retrieve all documents
    Room.find({}).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Retrieve document failure.'
      });
    });
};

// Retrieve single document
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    // Retrieve single document by id
    Room.findById(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: 'Cannot find document. (id: ' + id + ')'
        });
      } else {
        res.send(data);
      }
    })
    .catch(err => {
      res.status(500).send({
          message: err.message || 'Retrieve single document failure. (id: ' + id + ')'
        });
    });
};

// Update document by id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data is empty!'
    });
  }

  // Set id
  const id = req.params.id;

  // Update document by id
  Room.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: 'Cannot update document. (id: ' + id + ')'
        });
      } else {
        res.send({ 
          message: 'Document updated.' 
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Update document failure. (id: ' + id + ')'
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
  Room.findByIdAndRemove(id)
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

