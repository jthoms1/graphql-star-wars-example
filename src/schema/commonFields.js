/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE-examples file in the root directory of this source tree.
 *
 * @flow strict
 */

const { GraphQLString } = require('graphql');

// These two fields appear on all types, so let's only write them once.
exports.createdField = function createdField() {
  return {
    type: GraphQLString,
    description:
      'The ISO 8601 date format of the time that this resource was created.',
  };
}

exports.editedField = function editedField() {
  return {
    type: GraphQLString,
    description:
      'The ISO 8601 date format of the time that this resource was edited.',
  };
}
