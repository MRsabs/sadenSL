import { ipcRenderer } from 'electron-better-ipc';

// export default function numberWithCommas(x) {
//   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
// }

export default function numberWithCommas(x) {
  // return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return ipcRenderer.callMain('nwc', x).then((val) => val);
}
