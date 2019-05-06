
const swapiData = require('../../cache/data');

/**
 * Given a URL of an object in the SWAPI, return the data
 * from our local cache.
 */
exports.getFromLocalUrl = (url) => {
  const text = swapiData[url];
  if (!text) {
    throw new Error(`No entry in local cache for ${url}`);
  }
  if (process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line no-console
    console.log(`Hit the local cache for ${url}.`);
  }
  return text;
}
