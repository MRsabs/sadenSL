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

module.exports = {
  nwc,
  hello,
  unixNow,
};
