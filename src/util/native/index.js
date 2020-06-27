var addon = require('./index.node');

function hello() {
  return addon.hello();
}

/**
 * @param {string} num
 * @returns {string}
 */
function nwc(num) {
  return addon.nwc(num);
}

module.exports = {
  nwc,
  hello,
};
