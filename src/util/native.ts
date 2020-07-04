// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-var-requires
const addon = require('./index.node');
/**
 * @returns {string}
 */
export function hello(): string {
  return addon.hello();
}

/**
 * @param {string} x
 * @returns {string}
 */
export function nwc(x: string): string {
  return addon.nwc(x.toString());
}

/**
 * @returns {number}
 */
export function unixNow(): number {
  return addon.unixNow();
}

/**
 * @returns {string}
 */
export function uuidV4(): string {
  return addon.uuidV4();
}
