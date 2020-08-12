const dbIpc = [
  import('./db/inventory'),
  import('./db/product'),
  import('./db/order'),
];

async function initIpc(): Promise<boolean> {
  try {
    await Promise.all([...dbIpc, import('./dev/fakeDb'), import('./helpers')]);
    return true;
  } catch (error) {
    return false;
  }
}

export default initIpc;
