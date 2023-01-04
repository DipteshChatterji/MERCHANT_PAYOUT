const cron = require("node-cron");
const nodemailer = require("nodemailer");
const express = require ('express');
const app = express();

// const fs = require('fs');
// const fileData = fs.readFileSync('./test.php',{encoding:'utf8', flag:'r'});

//Email schedules code comes here

// let transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: 'dipteshchatterjee998@gmail.com', // generated ethereal user
//       pass: 'bczxiusryzmajxhk', // generated ethereal password
//     },
//   });

//  const data = {
//     from: 'dipteshchatterjee998@gmail.com', // sender address
//     to: "chatterjeediptesh2@gmail.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: fileData, // html body
//   };


//   cron.schedule('*/2 * * * * *', () => {
//     transporter.sendMail(data, function (err, info) {
//         if(err) 
//           console.log(err);
//         else
//           console.log(info);
//          });
//     });
    

    cron.schedule("* * * * * *", () => {
      const time = new Date();
      const hour = time.getHours();
       
    
      if (hour < 21) {
        let time2 = new Date(time.getTime() + 1000 * 60 * 60 * 24);
        console.log(time2.toLocaleString());
      } else {
        let time3 = new Date(time.getTime() + 1000 * 60 * 60 * 24 * 7);
        console.log(time3.toLocaleString());
      }
    });







