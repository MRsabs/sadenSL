import { ipcMain as ipc } from 'electron';
// import { nwc, unixNow } from '../util/native';
import * as models from '../../db/models/index';

ipc.handle('order/create', async (e, orderData: any) => {
  try {
    const customer = await models.Customer.findOne({
      where: {
        id: orderData.customerId,
      },
    });
    const order = await models.Order.create({
      customerId: customer.getDataValue('id'),
    });
    const orderProduct = await models.OrderProduct.create({
      orderId: order.getDataValue('id'),
      productId: orderData.productId,
      quantity: orderData.quantity,
    });
    const updateQuantity = await models.Inventory.findOne({
      where: {
        productId: orderData.productId,
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
  } catch (error) {
    // TODO log error & display friendly message
    return false;
  }
});
