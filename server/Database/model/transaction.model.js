module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("payment_data", {
      sl_no:{type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      customer_id:{
        type:Sequelize.INTEGER,
      },
      customer_name: {
        type: Sequelize.STRING,
      },
      amount: {
        type: Sequelize.INTEGER,
      },
    },
    {
      timestamps: false
    }
    );
  
    return Transaction;
  };