export default async function (): Promise<void> {
  await import('./inventory');
  await import('./product');
}
