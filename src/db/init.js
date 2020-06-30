const Sequelize = require('sequelize');
const path = require('path');
const { app } = require('electron');
const isDev = require('electron-is-dev');

const sequelize = new Sequelize({
  logging: false,
  dialect: 'sqlite',
  storage: isDev
    ? path.join(process.cwd(), 'sadensl.sqlite')
    : path.join(app.getPath('userData'), 'sadensl.sqlite'),
});

export async function testDb() {
  try {
    const models = await import('./models/index');
    const tCustomer = await models.Customer.create({ name: 'james' });
    await models.Order.create({
      customerId: tCustomer.getDataValue('id'),
      product: 'someProduct',
    });
    return true;
  } catch (error) {
    // TODO log erro to a file
    console.error('inseting to database failed');
    return false;
  }
}

export async function syncDb() {
  try {
    await import('./models/index');
    await sequelize.sync({ alter: { drop: false } });
    return true;
  } catch (error) {
    // TODO log erro to a file
    console.error('database did not sync');
    return false;
  }
}

export async function authenticateDb() {
  try {
    await sequelize.authenticate();
    return true;
  } catch (error) {
    // TODO log erro to a file
    console.error('database did not authenticate');
    return false;
  }
}

export default sequelize;
