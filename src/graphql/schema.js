const { makeExecutableSchema } = require('@graphql-tools/schema');
const userTypeDefs = require('./userTypeDefs');
const employeeTypeDefs = require('./employeeTypeDefs');

// Combine both type definitions into one schema
const typeDefs = [
  userTypeDefs,   
  employeeTypeDefs
];

module.exports = makeExecutableSchema({
  typeDefs,
});
