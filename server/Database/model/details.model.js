module.exports = (sequelize, Sequelize) => {
    const Details = sequelize.define("merchant_table", {
      merchant_id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      merchant_name: {
        type: Sequelize.STRING,
      },
      merchant_email:{
        type: Sequelize.STRING,
      },
      country:{
        type: Sequelize.STRING,
      },
      phone_no:{
        type: Sequelize.STRING,
      },
      merchant_status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    },
    {
      timestamps: false
    }
    );
  
    return Details;
  };