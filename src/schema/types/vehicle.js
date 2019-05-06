const {
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const { globalIdField } = require('graphql-relay');

const { nodeInterface } = require('../relayNode');
const { createdField, editedField } = require('../commonFields');
const { connectionFromUrls } = require('../connections');
const { convertToNumber } = require('../apiHelper');

/**
 * The GraphQL type equivalent of the Vehicle resource
 */
const VehicleType = new GraphQLObjectType({
  name: 'Vehicle',
  description:
    'A single transport craft that does not have hyperdrive capability',
  fields: () => {
    const FilmType = require('./film');
    const PersonType = require('./person');
    
    return {
      name: {
        type: GraphQLString,
        description: `The name of this vehicle. The common name, such as "Sand Crawler" or "Speeder
  bike".`,
      },
      model: {
        type: GraphQLString,
        description: `The model or official name of this vehicle. Such as "All-Terrain Attack
  Transport".`,
      },
      vehicleClass: {
        type: GraphQLString,
        resolve: vehicle => vehicle.vehicle_class,
        description:
          'The class of this vehicle, such as "Wheeled" or "Repulsorcraft".',
      },
      manufacturers: {
        type: new GraphQLList(GraphQLString),
        resolve: vehicle => {
          return vehicle.manufacturer.split(',').map(s => s.trim());
        },
        description: 'The manufacturers of this vehicle.',
      },
      costInCredits: {
        type: GraphQLFloat,
        resolve: vehicle => convertToNumber(vehicle.cost_in_credits),
        description: 'The cost of this vehicle new, in Galactic Credits.',
      },
      length: {
        type: GraphQLFloat,
        resolve: vehicle => convertToNumber(vehicle.length),
        description: 'The length of this vehicle in meters.',
      },
      crew: {
        type: GraphQLString,
        description:
          'The number of personnel needed to run or pilot this vehicle.',
      },
      passengers: {
        type: GraphQLString,
        description:
          'The number of non-essential people this vehicle can transport.',
      },
      maxAtmospheringSpeed: {
        type: GraphQLInt,
        resolve: vehicle => convertToNumber(vehicle.max_atmosphering_speed),
        description: 'The maximum speed of this vehicle in atmosphere.',
      },
      cargoCapacity: {
        type: GraphQLFloat,
        resolve: ship => convertToNumber(ship.cargo_capacity),
        description:
          'The maximum number of kilograms that this vehicle can transport.',
      },
      consumables: {
        type: GraphQLString,
        description: `The maximum length of time that this vehicle can provide consumables for its
  entire crew without having to resupply.`,
      },
      pilotConnection: connectionFromUrls('VehiclePilots', 'pilots', PersonType),
      filmConnection: connectionFromUrls('VehicleFilms', 'films', FilmType),
      created: createdField(),
      edited: editedField(),
      id: globalIdField('vehicles'),
    }
  },
  interfaces: () => [nodeInterface],
});

module.exports = VehicleType;
