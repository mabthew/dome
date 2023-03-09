import express from "express";
import cors from "cors";
import supertokens from "supertokens-node";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { middleware, errorHandler, SessionRequest } from "supertokens-node/framework/express";
import { DateTimeResolver, DateTimeTypeDefinition } from "graphql-scalars";
import { SuperTokensConfig } from "./config";

supertokens.init(SuperTokensConfig);

const app = express();

import { ApolloServer } from 'apollo-server';
import { typeDefs } from './src/typeDefs';
import { resolvers }  from './src/resolvers';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { makeExecutableSchema } from '@graphql-tools/schema';

dotenv.config()

const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs: [
      typeDefs,
      DateTimeTypeDefinition
    ],
    resolvers
  }),
});


server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

app.use(
    cors({
        origin: "http://localhost:3000",
        allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
        methods: ["GET", "PUT", "POST", "DELETE"],
        credentials: true,
    })
);

// This exposes all the APIs from SuperTokens to the client.
app.use(middleware());

// An example API that requires session verification
app.get("/sessioninfo", verifySession(), async (req: SessionRequest, res) => {
    let session = req.session;
    res.send({
        sessionHandle: session!.getHandle(),
        userId: session!.getUserId(),
        accessTokenPayload: session!.getAccessTokenPayload(),
    });
});

// In case of session related errors, this error handler
// returns 401 to the client.
app.use(errorHandler());

app.listen(3001, () => console.log(`API Server listening on port 3001`));
