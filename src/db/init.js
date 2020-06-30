/* eslint-disable */
const Sequelize = require('sequelize');
const path = require('path');
const { app } = require('electron');
const isDev = require('electron-is-dev');
const { Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: isDev
    ? path.join(process.cwd(), 'sadensl.sqlite')
    : path.join(app.getPath('userData'), 'saden-sl.sqlite'),
});

(async function () {
  try {
    await sequelize.authenticate();
    const models = await import('./models/model');
    await sequelize.sync({ alter: { drop: false } });
    const jane = await models.Customer.create({
      name: 'james',
    }).then((customer) => {
      models.Order.create({
        customerId: customer.getDataValue('id'),
        product: 'someProduct',
      });
    });
  } catch (error) {
    console.error(error);
  }
})();

export default sequelize;
