require('dotenv').config()
const { emailTemplate } = require("../../email-template");
const { transaction } = require("../model");
const db = require("../model");
const Details = db.details;
const { Sequelize } = require("sequelize");
const Transaction = db.transaction;
const Final = db.final;
const Op = db.Sequelize.Op;
const sendgrid = require("@sendgrid/mail");
const nodemailer = require("nodemailer");
const getSymbolFromCurrency = require("currency-symbol-map");



// const server= require(".../server.js");
// let c_name=server.c_name;

// Create and Save a new Transaction
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const details = {
    status: req.body.status,
  };

  // Save Transaction in the database
  Details.create(details)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Transaction.",
      });
    });
};

// Retrieve all Transactions from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Details.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving transactions.",
      });
    });
};

// Find a single Transaction with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Details.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Transaction with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Transaction with id=" + id,
      });
    });
};





var getdate={
  date:"",
  amount:""
}

// Data storing into table API
exports.oneToOne = async (req, res) => {
  let data1 = await Details.findAll({
    // attributes: ['merchant_id', [Sequelize.fn('SUM', Sequelize.col('amount')), 'total']],
    include: {
      model: Transaction,
    },
    // group : ['Transaction.merchant_id'],
    // raw: true,
    where: { merchant_status: 1 },
  })
    .then((data1) => {

      for (let i = 0; i < data1.length; i++) {
        let y = 0;
        const dto = JSON.parse(JSON.stringify(data1[i]));
        for (let j = 0; j < dto.payment_data.length; j++) {
          y += Number(dto.payment_data[j].amount);
        }
        
        const recvtime = new Date();
        const hour = recvtime.getHours();
        if (hour >= 11 && hour <= 21) {
          let getdatecinfig = new Date(
            recvtime.getTime() + 1000 * 60 * 60 * 24
          );
          let a =
            getdatecinfig.getDate() +
            "/" +
            (getdatecinfig.getMonth() + 1) +
            "/" +
            getdatecinfig.getFullYear();
          getdate.date = a;
          // console.log(getdate.date);
        } else {
          let getdatecinfig = new Date(
            recvtime.getTime() + 1000 * 60 * 60 * 24 * 8
          );
          let b =
            getdatecinfig.getDate() +
            "/" +
            (getdatecinfig.getMonth() + 1) +
            "/" +
            getdatecinfig.getFullYear();
          getdate.date = b;
          // console.log(b);
        }
        getdate.amount=y
        console.log(getdate.amount);
        const payment = {
          merchant_id: dto.merchant_id,
          total_amount: y,
         
          
        };
        Final.create(payment);
        
      }
      
    })
    .then((data) => {
      res.send({ message: "done" });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the payment.",
      });
    });
};

// exports.sendEmail = async (req, res) => {
//   try {
//     let emailData = await Final.findAll();
//     let temp =
//       "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";
//     sendgrid.setApiKey(temp);

//     emailData.map(async (e) => {
//       const msg = {
//         to: `${e.Email}`,
//         // Change to your recipient
//         from: "diptesh@omni-pay.com",
//         // Change to your verified sender
//         subject: `this is for id ${e.id}`,
//         text: "and easy to do anywhere, even with Node.js",
//         html: "<strong>and easy to do anywhere, even with Node.js</strong>",
//       };

//       console.log("msgmsg", msg);
//       let sendMail = await sendgrid.send(msg);
//       console.log(sendMail.statusCode);
//     });
//     return { message: "Processed successfully..." };
//   } catch (error) {
//     console.log(error);
//   }
// };



/*mail sending API */
exports.mailsending = async (req, res) => {
  try {
    let emailData = await Details.findAll(
      {
        where:{
          merchant_status:1
        }
      }
    );
    emailData.map(async (e) => {
      
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.auth_username,
          pass: process.env.auth_password,
        },
      });
      let emailParams = {
        merchant_name: e.merchant_name,
        total_amount: getdate.amount,
        country: e.country,
        email: e.merchant_email,
        currency: getSymbolFromCurrency(e.country),
        date: getdate.date,
      };
      
      
      const htmlFormat = await emailTemplate(emailParams);
      let info = await transporter.sendMail({
        from: process.env.auth_username,
        to: `${e.merchant_email}`,
        subject: `Automated withdrawl`,
        html: htmlFormat,
      });
      console.log(info);
    });
  } catch (error) {
    console.log(error);
  }
};
