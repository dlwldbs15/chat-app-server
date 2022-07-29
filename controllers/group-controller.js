const { default: mongoose } = require('mongoose');
const Group = require('../db/model/group')

exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
          message: 'Title is empty!'
        });
        return;
    }
    const group = new Group({
        title: req.body.title,
        deadline: req.body.deadline
    })
    // Save document
    group.save().then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || 'Create document failure.'
      });
    });
};

exports.findAll = (req, res) => {
    // Retrieve all documents
    Group.find({}).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Retrieve document failure.'
      });
    });
};

exports.findByGroupId = (req, res) => {
  const groupId = req.params.groupId
  // Retrieve all documents
  Group.find({}).then(data => {
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
    Group.findById(id)
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
  Group.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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
  Group.findByIdAndRemove(id)
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

