import { ipcMain as ipc } from 'electron';
// import { nwc, unixNow } from '../util/native';
import * as models from '../../db/models/index';

ipc.handle('inventory/create', async (e, inventoryName?: string) => {
  try {
    await models.InventoryTracker.create({
      inventoryName,
    });
    return true;
  } catch (error) {
    // TODO log error & display friendly message
    return false;
  }
});

ipc.handle('inventory/read/all', async () => {
  try {
    const data = await models.InventoryTracker.findAndCountAll();
    return data;
  } catch (error) {
    return false;
  }
});

ipc.handle('inventory/read/one', async (e, trackerId) => {
  try {
    const data = await models.Inventory.findAll({
      where: {
        trackerId,
      },
      include: models.Product,
      raw: true,
    });
    return data;
  } catch (error) {
    console.error('did not get inventory ittems\n', error);
    return false;
  }
});
