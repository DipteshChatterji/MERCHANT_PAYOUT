const sendgrid = require('@sendgrid/mail');

    let temp = "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"
    sendgrid.setApiKey(temp)


    const msg = {
       to: 'dipteshchatterjee998@gmail.com',
     // Change to your recipient
       from: 'diptesh@omni-pay.com',
     // Change to your verified sender
       subject: 'Sending with SendGrid Is Fun',
       text: 'and easy to do anywhere, even with Node.js',
       html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    sendgrid
       .send(msg)
       .then((resp) => {
         console.log('Email sent\n', resp)
       })
       .catch((error) => {
         console.error(error)
     })