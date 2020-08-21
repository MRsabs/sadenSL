import { ipcRenderer } from 'electron';

export function createProduct(productData: ProductData): boolean {
  const product = ipcRenderer.sendSync('product/create', productData);
  return product;
}

// types
export interface ProductData {
  name: string;
  barcode: string;
  quantity: number;
  dateTime: [number];
  retailPrice: number;
  wholeSalePrice: number;
  type: string;
  trackerId: string;
  notes: string;
}
