import { dialog } from 'electron';

export default function errorDialog(title: string, content: string) {
  return dialog.showErrorBox(title, content);
}
