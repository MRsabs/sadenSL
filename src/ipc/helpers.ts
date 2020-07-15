import { ipcMain } from 'electron-better-ipc';
import { nwc, unixNow } from '../util/native';

ipcMain.handle('nwc', (e, x: string | number): string => {
  console.log('x is: ', x)

  function towDesimlsNum(x: string | number): string {
    const num = Number(x)
    if (num % 1 != 0) {
      return num.toFixed(2).toString()
    } else {
      return num.toString() + '.00'
    }
  }

  if (typeof x === 'number') {
    const toFixed2 = towDesimlsNum(x);
    const intAndDes = toFixed2.split('.');
    const formatedNum = nwc(intAndDes[0]);
    const numWithDesimls = formatedNum + '.' + intAndDes[1];
    return numWithDesimls;
  } else if (typeof x === 'string') {
    const toFixed2 = towDesimlsNum(x);
    const intAndDes = toFixed2.split('.');
    const formatedNum = nwc(intAndDes[0]);
    const numWithDesimls = formatedNum + '.' + intAndDes[1];
    return numWithDesimls;
  } else {
    // TODO High Risk code injection
    return null;
  }
});

ipcMain.handle('unixNow', async () => {
  return unixNow();
});

ipcMain.handle('hello', async () => {
  console.log('hello IPC IS CALLED');
  return 'hello from main';
});
