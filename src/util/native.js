import addon from './native/index.node';
/**
 * @returns {string}
 */
export function hello() {
  return addon.hello();
}

/**
 * @param {string} x
 * @returns {string}
 */
export function nwc(x) {
  return addon.nwc(x.toString());
}

/**
 * @returns {number}
 */
export function unixNow() {
  return addon.unixNow();
}

/**
 * @returns {string}
 */
export function uuidV4() {
  return addon.uuidV4();
}
