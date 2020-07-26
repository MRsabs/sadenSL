import { ipcMain } from 'electron';
import * as db from '../../db/init';

ipcMain.handleOnce('test/fakeDb', async () => {
  try {
    await db.testDb();
  } catch (error) {
    console.error(error);
  }
});
