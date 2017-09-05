const models = require('../models/');

const ApiController = {
  list: function(req, res) {
    models.Item.findAll().then(function(items){
      res.json(items);
    });

  },
  purchase: function(req, res) {
    let itemId = req.params.id;
    let money = req.body.money;
    let change = 0;
    let message = '';

    models.Item.findById(itemId).then(function(item){
      if(money >= item.cost && item.quantity > 0) {
        item.quantity -= 1;
        item.purchased += 1;
        item.save();
        const newTranscation = models.Transaction.create({
          date: Date.now(),
          amountPaid: money,
          itemId: itemId
        });
        change = (money - item.cost);
        message = "Thanks for shopping. Your change is: " + change;
        return res.json({status: "success", message: message, data: item})
      } else if (item.quantity === 0){
        message = 'Sorry, we do not have this item in stock';
        return res.json({status: "failure", message:message, data: item});
      } else if (money < item.cost) {
        message = "please, add more money. The cost of the item is " + item.cost + " you paid " + money;
        return res.json({status: "failiure", message: message, data: item})
      }
    });
  },
  purchaseList: function(req, res) {
    models.Transaction.findAll({
      include: [
        {model: models.Item}
      ]}).then(function(transactions){
        res.json({status: "success", data: transactions});
      });
  },

  moneyInMachine: function(req, res) {
    models.Transaction.sum('amountPaid').then(function(sum) {
      res.json({moneyInMachine: sum});
    });

  },

  addItem: function(req, res) {
    const newItem = models.Item.create({
      name: req.body.name,
      description: req.body.description,
      cost: req.body.cost,
      quantity: req.body.quantity,
      purchased: 0,
      paid: null,
      purchasedTime: null,
    });
    models.Item.findAll().then(function(items){
      res.json(items);
    });
  },

  editItem: function(req, res) {
    itemId = req.params.id;
    models.Item.findById(itemId).then(function(item){
      item.quantity = req.body.quantity;
      item.cost = req.body.cost;
      item.description = req.body.description;
      item.save();
      return;
    });
  }

};

module.exports = ApiController;
