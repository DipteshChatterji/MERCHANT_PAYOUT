const db = require("../model");
const Final = db.final;
const Op = db.Sequelize.Op;
// const server= require(".../server");

// let c_name=server.c_name;
// Create and Save a new Transaction
exports.create = (req, res) => {
    // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Transaction
  const final = {
   
    mid:req.body.mid,
    status: req.body.status,
    payment: req.body.payment,
    Phone_no: req.body.Phone_no,
    Email: req.body.Email
    
  };

  // Save Transaction in the database
  Final.create(final)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Transaction."
      });
    });
};

// Retrieve all Transactions from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Final.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving transactions."
      });
    });
};

// Find a single Transaction with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

  Final.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Transaction with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Transaction with id=" + id
      });
    });
};

