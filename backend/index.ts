import cors from "cors";
import express from "express";
import supertokens from "supertokens-node";
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { typeDefs } from './src/typeDefs';
import { resolvers }  from './src/resolvers';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { middleware, errorHandler } from "supertokens-node/framework/express";
import { DateTimeTypeDefinition } from "graphql-scalars";
import { SuperTokensConfig } from "./config";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
const PostgresDatabase = require("./src/datasources/PostgresDatabase");

dotenv.config()

supertokens.init(SuperTokensConfig);

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
  credentials: true,
}));

app.use(middleware());

const knexConfig = {
  client: "pg",
  connection: {
    user: "postgres",
    host: "localhost",
    database: "todo",
    port: 5432,
  }
};

const db = new PostgresDatabase(knexConfig);

interface ContextValue {
  todosDB: typeof PostgresDatabase;
  req: Express.Request;
  res: Express.Response;
}

const server = new ApolloServer<ContextValue>({
  schema: makeExecutableSchema({
    typeDefs: [
      typeDefs,
      DateTimeTypeDefinition
    ],
    resolvers
  }),
  plugins: [
    {
      requestDidStart: async () => {
          return {
              didEncounterErrors: async (requestContext) => {
                  const {req, res} = requestContext.contextValue as any;
                  for (let i = 0; i < requestContext.errors.length; i++) {
                      let error = requestContext.errors[i].originalError;
                      await new Promise(async (resolve) => {
                          // This will handle any session or other SuperTokens related errors
                          await errorHandler()(error, req, res, (err) => {
                              resolve(undefined);
                          });
                      });
                  }
              },
          };
        }
    }
],
});

server.start().then(() => {
  // Use expressMiddleware only after server.start has resolved
  app.use(express.json(), expressMiddleware(server, {
      context: async ({req, res}) => {
          return {
              todosDB: db,
              req,
              res,
          };
      },
  }))

  app.listen(3001, () => {
      console.log("Server started");
  })
})
