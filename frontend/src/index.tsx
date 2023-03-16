import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import App from "./App";


const client = new ApolloClient({
    uri: "http://localhost:3001/graphql",
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                  todoItems: {
                    merge(existing, incoming){
                        return incoming
                      }
                    },
                },
            },
        }
    })
});

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>
);
