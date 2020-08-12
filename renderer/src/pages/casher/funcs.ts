/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ProductData } from '.';

export async function submitOrder(
  data: ProductData[],
  total: number
): Promise<boolean> {
  const { ipcRenderer } = await import('electron');
  const req: boolean = ipcRenderer.sendSync('order/create', data);
  console.log(req);
  return req;
}
