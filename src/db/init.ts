import path = require('path');
import { app } from 'electron';
import isDev = require('electron-is-dev');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  logging: false,
  dialect: 'sqlite',
  storage: isDev
    ? path.join(process.cwd(), 'tmp', 'sadensl.sqlite')
    : path.join(app.getPath('userData'), 'sadensl.sqlite'),
});

export async function testDb(): Promise<boolean> {
  try {
    const models = await import('./models/index');
    const inventory = await models.InventoryTracker.create({
      inventoryName: 'baghdad storage',
    });
    const product = await models.Product.create({
      name: 'prodcut 1',
      wholeSalePrice: 100,
      retailPrice: 200,
      barcode: 11111111,
    });
    await models.Inventory.create({
      trackerId: inventory.getDataValue('id'),
      productId: product.getDataValue('id'),
      quantityInStock: 5,
    });
    const product2 = await models.Product.create({
      name: 'prodcut 2',
      wholeSalePrice: 2100,
      retailPrice: 2200,
      barcode: 22222222,
    });
    await models.Inventory.create({
      trackerId: inventory.getDataValue('id'),
      productId: product2.getDataValue('id'),
      quantityInStock: 15,
    });

    await (async function () {
      const inventory = await models.InventoryTracker.create({
        inventoryName: 'test storage',
      });
      [1, 2, 3, 4, 5].map(async (val, i) => {
        const product = await models.Product.create({
          name: i % 2 === 0 ? 'prodcut even' + i : 'prodcut odd' + 1,
          wholeSalePrice: 100,
          retailPrice: 200,
          barcode: 46152 * i,
        });
        await models.Inventory.create({
          trackerId: inventory.getDataValue('id'),
          productId: product.getDataValue('id'),
          quantityInStock: Math.floor(Math.random() * 50) + 1,
        });
      });
    })();
    const customer = await models.Customer.create({ name: 'guest' });
    const order = await models.Order.create({
      customerId: customer.getDataValue('id'),
    });
    const orderProduct = await models.OrderProduct.create({
      orderId: order.getDataValue('id'),
      productId: product.getDataValue('id'),
      quantity: 2,
    });
    const updateQuantity = await models.Inventory.findOne({
      where: {
        productId: product.getDataValue('id'),
      },
    });
    const quantityInStock = updateQuantity.getDataValue('quantityInStock');
    const quantityInOrder = orderProduct.getDataValue('quantity');
    const newQuantity = quantityInStock - quantityInOrder;
    await models.Inventory.update(
      { quantityInStock: newQuantity },
      {
        where: {
          productId: orderProduct.getDataValue('productId'),
        },
      }
    );
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
