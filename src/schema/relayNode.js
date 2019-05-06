/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE-examples file in the root directory of this source tree.
 *
 * @flow strict
 */

const { getObjectFromTypeAndId } = require('./apiHelper');

const { nodeDefinitions, fromGlobalId } = require('graphql-relay');

/**
 * Given a "type" in SWAPI, returns the corresponding GraphQL type.
 */
exports.swapiTypeToGraphQLType = function swapiTypeToGraphQLType(swapiType) {
  const FilmType = require('./types/film');
  const PersonType = require('./types/person');
  const PlanetType = require('./types/planet');
  const SpeciesType = require('./types/species');
  const StarshipType = require('./types/starship');
  const VehicleType = require('./types/vehicle');

  switch (swapiType) {
    case 'films':
      return FilmType;
    case 'people':
      return PersonType;
    case 'planets':
      return PlanetType;
    case 'starships':
      return StarshipType;
    case 'vehicles':
      return VehicleType;
    case 'species':
      return SpeciesType;
    default:
      throw new Error('Unrecognized type `' + swapiType + '`.');
  }
}

const { nodeInterface, nodeField } = nodeDefinitions(
  globalId => {
    const { type, id } = fromGlobalId(globalId);
    return getObjectFromTypeAndId(type, id);
  },
  obj => {
    const parts = obj.url.split('/');
    return swapiTypeToGraphQLType(parts[parts.length - 3]);
  },
);

exports.nodeInterface = nodeInterface;
exports.nodeField = nodeField;
