import { ipcMain } from 'electron-better-ipc';
// import { nwc, unixNow } from '../util/native';
import * as models from '../db/models/index';

ipcMain.answerRenderer(
  'createProduct',
  async ({ name, wholeSalePrice, retailPrice }) => {
    try {
      await models.Product.create({
        name,
        wholeSalePrice,
        retailPrice,
      });
      return true;
    } catch (error) {
      return false;
    }
  },
);

ipcMain.answerRenderer('readProdcut', async (x: any) => {
  try {
    const product = await models.Product.findOne({
      where: {
        id: x.id,
      },
      include: models.Inventory,
    });
    return product;
  } catch (error) {
    return false;
  }
});
