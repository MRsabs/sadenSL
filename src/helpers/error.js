import { dialog } from 'electron';

export default function errorDialog(title, content) {
  return dialog.showErrorBox(title, content);
}
