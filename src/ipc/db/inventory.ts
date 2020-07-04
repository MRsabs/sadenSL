import { ipcMain } from 'electron-better-ipc';
// import { nwc, unixNow } from '../util/native';
import * as models from '../../db/models/index';

ipcMain.answerRenderer('inventory/create', async (inventoryName?: string) => {
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

ipcMain.answerRenderer('inventory/read/all', async () => {
  try {
    return await models.InventoryTracker.findAndCountAll();
  } catch (error) {
    // TODO log error & display friendly message
    return false;
  }
});

ipcMain.answerRenderer('inventory/read/one', async (trackerId: string) => {
  try {
    return await models.Inventory.findAndCountAll({
      where: {
        trackerId,
      },
    });
  } catch (error) {
    // TODO log error & display friendly message
    return false;
  }
});
