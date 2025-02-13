require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { connectDB } = require('./config/db');
const userResolvers = require('./resolvers/userResolvers');
const employeeResolvers = require('./resolvers/employeeResolvers');
const userTypeDefs = require('./graphql/userTypeDefs'); 
const employeeTypeDefs = require('./graphql/employeeTypeDefs'); 
const cors = require('cors');

const { makeExecutableSchema } = require('@graphql-tools/schema');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Initialize Apollo Server
const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs: [userTypeDefs, employeeTypeDefs], 
    resolvers: [userResolvers, employeeResolvers],
  }),
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    return {req};
  },
});

async function startServer() {
    await server.start();
    server.applyMiddleware({ app });
    app.listen(process.env.PORT || 4000, () => console.log(`Server running at http://localhost:4000${server.graphqlPath}`));
}

startServer();