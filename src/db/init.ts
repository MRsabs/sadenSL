import path = require('path');
import { app } from 'electron';
import isDev = require('electron-is-dev');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  logging: false,
  dialect: 'sqlite',
  storage: isDev
    ? path.join(process.cwd(), 'sadensl.sqlite')
    : path.join(app.getPath('userData'), 'sadensl.sqlite'),
});

export async function testDb(): Promise<boolean> {
  try {
    return true;
    // eslint-disable-next-line no-unreachable
    const models = await import('./models/index');
    const product = await models.Product.create({
      name: 'prodcut 1',
      wholeSalePrice: 100,
      retailPrice: 200,
    });
    const product2 = await models.Product.create({
      name: 'prodcut 2',
      wholeSalePrice: 150,
      retailPrice: 250,
    });
    await models.Inventory.create({
      InventoryLevel: 1,
      productId: product.getDataValue('id'),
      quantityInStock: 5,
    });
    await models.Inventory.create({
      InventoryLevel: 1,
      productId: product2.getDataValue('id'),
      quantityInStock: 10,
    });
    const customer = await models.Customer.create({ name: 'james' });
    const order = await models.Order.create({
      customerId: customer.getDataValue('id'),
    });
    await models.OrderProduct.create({
      orderId: order.getDataValue('id'),
      productId: product.getDataValue('id'),
      quantity: 2,
    });
    await models.OrderProduct.create({
      orderId: order.getDataValue('id'),
      productId: product2.getDataValue('id'),
      quantity: 3,
    });
    return true;
    // eslint-disable-next-line no-unreachable
  } catch (error) {
    // TODO log erro to a file
    console.error('inserting Failed\n', error);
    return false;
  }
}

export async function syncDb(): Promise<boolean> {
  try {
    await import('./models/index');
    await sequelize.sync({ alter: { drop: false } });
    return true;
  } catch (error) {
    // TODO log erro to a file
    console.error('database did not sync\n', error);
    return false;
  }
}

export async function authenticateDb(): Promise<boolean> {
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
