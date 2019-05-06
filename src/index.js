const { GraphQLServer } = require('graphql-yoga');
const swapiSchema = require('./schema/index');

const server = new GraphQLServer({
  schema: swapiSchema,
});

server.start(() => console.log(`Server is running on http://localhost:4000`))