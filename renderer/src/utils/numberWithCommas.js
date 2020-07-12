import { ipcRenderer } from 'electron';

export default async function numberWithCommas(x) {
  const val = await ipcRenderer.invoke('nwc', x);
  return val;
}
