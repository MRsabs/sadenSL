async function initIpc(): Promise<boolean> {
  try {
    await Promise.all([
      import('./dev/fakeDb'),
      import('./db/inventory'),
      import('./db//product'),
      import('./helpers'),
    ]);
    return true;
  } catch (error) {
    return false;
  }
}

export default initIpc;
