import { ipcMain } from 'electron-better-ipc';
// import { nwc, unixNow } from '../util/native';
import * as models from '../../db/models/index';

interface productCreate {
  name: string;
  wholeSalePrice: string;
  retailPrice: number;
  quantity: number;
  trackerId: string;
}

ipcMain.answerRenderer(
  'prodcut/create',
  async ({
    name,
    wholeSalePrice,
    retailPrice,
    quantity,
    trackerId,
  }: productCreate) => {
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

ipcMain.answerRenderer('product/read', async (id: string) => {
  try {
    const product = await models.Product.findOne({
      where: {
        id,
      },
      include: { all: true },
    });
    return product;
  } catch (error) {
    return false;
  }
});
