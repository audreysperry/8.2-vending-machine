'use strict';
module.exports = function(sequelize, DataTypes) {
  var Transaction = sequelize.define('Transaction', {
    date: DataTypes.DATE,
    amountPaid: DataTypes.INTEGER,
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Items',
        key: 'id'
      }
    }
  });

  Transaction.associate = function(models) {
    Transaction.belongsTo(models.Item, {foreignKey: 'itemId'});
  };
  return Transaction;
};
