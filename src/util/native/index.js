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

module.exports = {
  nwc,
  hello,
};
