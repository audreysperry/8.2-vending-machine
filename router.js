const express = require('express');
const ApiController = require('./controllers/api');

module.exports = function(app) {

  const apiRouter = express.Router();


apiRouter.get('/customer/items/', ApiController.list);
apiRouter.post('/customer/items/:id/purchases', ApiController.purchase);
apiRouter.get('/vendor/purchases', ApiController.purchaseList);
apiRouter.get('/vendor/money', ApiController.moneyInMachine);
apiRouter.post('/vendor/items', ApiController.addItem);
apiRouter.patch('/vendor/items/:id', ApiController.editItem);

app.use('/api', apiRouter);

};
