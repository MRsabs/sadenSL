import { ipcMain } from 'electron';
// import { nwc, unixNow } from '../util/native';
import * as models from '../../db/models/index';

ipcMain.handle(
  'product/create',
  async (
    _e,
    {
      name,
      wholeSalePrice,
      retailPrice,
      quantity,
      barcode,
      trackerId,
    }: productInfo
  ) => {
    try {
      const product = await models.Product.create({
        name,
        wholeSalePrice,
        retailPrice,
        barcode,
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

ipcMain.handle('product/read', async (_e, id: string) => {
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

ipcMain.handle('product/read/barcode', async (_e, barcode: string) => {
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

ipcMain.handle(
  'product/update',
  async (_e, productId: string, opt: productInfo) => {
    try {
      await models.Inventory.update(opt, {
        where: {
          productId,
        },
      });
    } catch (error) {
      return false;
    }
  }
);

// types
interface productInfo {
  name: string;
  wholeSalePrice: string;
  retailPrice: number;
  quantity: number;
  trackerId: string;
  barcode: string;
}
