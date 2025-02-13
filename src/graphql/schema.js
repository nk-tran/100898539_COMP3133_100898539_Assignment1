// schema.js
const { makeExecutableSchema } = require('@graphql-tools/schema');
const userTypeDefs = require('./userTypeDefs');
const employeeTypeDefs = require('./employeeTypeDefs');

// Combine both type definitions into one schema
const typeDefs = [
  userTypeDefs,   // User type definitions
  employeeTypeDefs // Employee type definitions
];

module.exports = makeExecutableSchema({
  typeDefs,
});
