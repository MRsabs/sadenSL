import { ipcMain } from 'electron';
// import { nwc, unixNow } from '../util/native';
import * as models from '../../db/models/index';

interface productCreate {
  name: string;
  wholeSalePrice: string;
  retailPrice: number;
  quantity: number;
  trackerId: string;
}

ipcMain.handle(
  'prodcut/create',
  async (
    e,
    { name, wholeSalePrice, retailPrice, quantity, trackerId }: productCreate
  ) => {
    try {
      const product = await models.Product.create({
        name,
        wholeSalePrice,
        retailPrice,
      });
      await models.Inventory.create({
        productId: product.getDataValue('id'),
        quantityInStock: quantity,
        trackerId,
      });
      return true;
    } catch (error) {
      return false;
    }
  }
);

ipcMain.handle('product/read', async (e, id: string) => {
  try {
    const product = await models.Product.findOne({
      where: {
        id,
      },
    });
    return product.toJSON();
  } catch (error) {
    return false;
  }
});

ipcMain.handle('product/read/barcode', async (e, barcode: string) => {
  try {
    const product = await models.Product.findOne({
      where: {
        barcode,
      },
    });
    if (product != null) {
      return product.toJSON();
    } else {
      return null;
    }
  } catch (error) {
    return false;
  }
});

// ipcMain.handle('product/update', async (e, id: string) => {
//   try {
//     await models.Inventory.update(
//       { quantityInStock: newQuantity },
//       {
//         where: {
//           productId: orderProduct.getDataValue('productId'),
//         },
//       }
//     );
//   } catch (error) {
//     return false;
//   }
// });
