var addon = require('./index.node');
/**
 * @returns {string}
 */
function hello() {
  return addon.hello();
}

/**
 * @param {string} x
 * @returns {string}
 */
function nwc(x) {
  return addon.nwc(x.toString());
}

/**
 * @returns {number}
 */
function unixNow() {
  return addon.unixNow();
}

/**
 * @returns {string}
 */
function uuidV4() {
  return addon.uuidV4();
}

console.log(uuidV4());

module.exports = {
  nwc,
  hello,
  unixNow,
  uuidV4,
};
