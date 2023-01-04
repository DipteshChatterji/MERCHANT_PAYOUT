module.exports = app => {
    const transactions = require("../controller/transaction.controller");
    const final=require("../controller/final.controller");
    const details=require("../controller/details.controller")
    var router = require("express").Router();
  
    // Create a new Transaction
    router.post("/tran", transactions.create);
  
    // Retrieve all Transactions
    router.get("/tran", transactions.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/id", final.findOne);
    // router.get("/sum",transactions.Sum);



    router.get("/final",final.findAll);
    router.post("/final",final.create);


    router.get("/a",details.findAll);
    router.post("/a",details.create);


    router.get("/one",details.oneToOne);
    
    
    router.get("/mailsending",details.mailsending);

    


    
  
    app.use('/gateway/webhook', router);
  };