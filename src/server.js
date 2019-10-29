const { gql, ApolloServer } = require('apollo-server');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// setup .env file if it exists
const rootDir = path.resolve(__dirname, '..');
const envFilePath = path.join(rootDir, '.env');

if (fs.existsSync(envFilePath)) {
  dotenv.config({
    path: envFilePath
  });
} else if (process.env.NODE_ENV !== 'production') {
  console.warn(`WARN: .env file is missing at ${envFilePath}`);
}

// setup graphql schema
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'hello world from GitHub feed!'
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server
  .listen({
    port: process.env.PORT || 3000
  })
  .then(({ url }) => {
    console.log(`Apollo server available @ ${url}`);
  });
