import { ipcMain } from 'electron';
// import { nwc, unixNow } from '../util/native';
import * as models from '../../db/models/index';

ipcMain.on(
  'product/create',
  async (
    e,
    {
      name,
      wholeSalePrice,
      retailPrice,
      dateTime,
      notes,
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
        notes,
        productionDate: dateTime[0],
        expirationDate: dateTime[1],
      });
      await models.Inventory.create({
        productId: product.getDataValue('id'),
        quantityInStock: quantity,
        trackerId,
      });
      e.returnValue = true;
    } catch (error) {
      e.returnValue = false;
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
  barcode: string;
  quantity: number;
  dateTime: number[];
  retailPrice: number;
  wholeSalePrice: number;
  type: string;
  trackerId: string;
  notes: string;
}
