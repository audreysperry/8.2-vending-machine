'use strict';
module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    cost: DataTypes.INTEGER,
    description: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    purchased: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    purchasedTime: DataTypes.DATE,
    paid: DataTypes.INTEGER
  });
  return Item;
};
