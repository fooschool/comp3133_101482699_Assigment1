import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import typeDefs from './schemas/schema.js';
import resolvers from './resolvers/resolvers.js';
import mongoose from 'mongoose';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';

const app = express();

dotenv.config();

const DB_CONNECTION = process.env.MONGO_URI || "mongodb://localhost:27017/comp3133_101482699_assigment1";

const connectDB = async () => {
  await mongoose.connect(DB_CONNECTION);
};

async function startServer() {
  const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
  });

  await server.start();

  app.use(
    '/graphql',
    cors(),
    express.json(),
    expressMiddleware(server),
  );

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}/graphql`);
    try {
      connectDB();
      console.log("Connected to MongoDB");
    } catch (error) {
      console.log(`Unable to connect to DB: ${error.message}`);
    }
  });
}

startServer();
