module.exports = (sequelize, Sequelize) => {
    const Final = sequelize.define("Payout", {
        sl_no:{type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        merchant_id:{
            type:Sequelize.INTEGER,
        },
        total_amount: {
          type: Sequelize.INTEGER,
        },
    },
    {
      timestamps: false
    }
    );
  
    return Final;
  };