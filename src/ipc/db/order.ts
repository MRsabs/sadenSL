import { ipcMain } from 'electron';
import {
  Customer,
  Order,
  OrderProduct,
  Inventory,
} from '../../db/models/index';

ipcMain.on(
  'order/create',
  async (
    e,
    orderData: OrderData[],
    customerData: CustomerData = { id: 'guest' }
    // total: number
  ) => {
    try {
      const customer = await Customer.findOne({
        where: {
          id: customerData.id,
        },
      });
      const order = await Order.create({
        customerId: customer.getDataValue('id'),
      });
      for (let i = 0; i < orderData.length; i++) {
        const item: OrderData = orderData[i];
        const updateQuantity = await Inventory.findOne({
          where: {
            productId: item.key,
          },
        });

        const orderProduct = await OrderProduct.create({
          orderId: order.getDataValue('id'),
          productId: item.key,
          quantity: item.unitsOrdered,
        });
        const quantityInStock = updateQuantity.getDataValue('quantityInStock');
        const quantityInOrder = orderProduct.getDataValue('quantity');
        const newQuantity = quantityInStock - quantityInOrder;
        await Inventory.update(
          { quantityInStock: newQuantity },
          {
            where: {
              productId: orderProduct.getDataValue('productId'),
            },
          }
        );
      }
      e.returnValue = true;
    } catch (error) {
      // TODO log error & display friendly message
      console.error(error);
      e.returnValue = false;
    }
  }
);

ipcMain.handle('order/read/all', async (e) => {
  try {
    const data: Order[] = await Order.findAll();
    const result: AllOrders[] = [];
    for (let i = 0; i < data.length; i++) {
      const value = data[i];
      const val = value.toJSON() as AllOrders;
      const customer = await Customer.findOne({
        where: { id: val.customerId },
      });
      val.customerName = await customer.getDataValue('name');
      result.push(val);
    }
    return result;
  } catch (error) {
    // TODO log error & display friendly message
    console.error(error);
    return false;
  }
});

// types
interface OrderData {
  key: string;
  productName: string;
  unitPrice: number;
  unitsOrdered: number;
  totalUnitsPrice: number;
}

interface CustomerData {
  id: string;
}

interface AllOrders {
  customerName: string;
  id: string;
  createdAt: number;
  updatedAt: number;
  customerId: string;
}
