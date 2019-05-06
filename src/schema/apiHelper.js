const DataLoader = require('dataloader');

const { getFromLocalUrl } = require('../api');

const localUrlLoader = new DataLoader(urls =>
  Promise.all(urls.map(getFromLocalUrl)),
);

/**
 * Objects returned from SWAPI don't have an ID field, so add one.
 */
function objectWithId(obj) {
  obj.id = parseInt(obj.url.split('/')[5], 10);
  return obj;
}

/**
 * Given an object URL, fetch it, append the ID to it, and return it.
 */
exports.getObjectFromUrl = async function getObjectFromUrl(url) {
  const data = await localUrlLoader.load(url);
  return objectWithId(data);
}

/**
 * Given a type and ID, get the object with the ID.
 */
exports.getObjectFromTypeAndId = async function getObjectFromTypeAndId(
  type,
  id,
) {
  return await getObjectFromUrl(`https://swapi.co/api/${type}/${id}/`);
}

/**
 * Given a type, fetch all of the pages, and join the objects together
 */
exports.getObjectsByType = async function getObjectsByType(type) {
  let objects = [];
  let nextUrl = `https://swapi.co/api/${type}/`;
  while (nextUrl) {
    // eslint-disable-next-line no-await-in-loop
    const pageData = await localUrlLoader.load(nextUrl);
    objects = objects.concat(pageData.results.map(objectWithId));
    nextUrl = pageData.next;
  }
  objects = sortObjectsById(objects);
  return { objects, totalCount: objects.length };
}

exports.getObjectsFromUrls = async function getObjectsFromUrls(urls) {
  const array = await Promise.all(urls.map(getObjectFromUrl));
  return sortObjectsById(array);
}

function sortObjectsById(array) {
  return array.sort((a, b) => a.id - b.id);
}

/**
 * Given a string, convert it to a number
 */
exports.convertToNumber = function convertToNumber(value) {
  if (['unknown', 'n/a'].indexOf(value) !== -1) {
    return null;
  }
  // remove digit grouping
  const numberString = value.replace(/,/, '');
  return Number(numberString);
}
