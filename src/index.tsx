import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

const apiUrl = "https://api.poc.graphql.dev.vnplatform.com/graphql";
const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYW5kaWRhdGVfbmFtZSI6IlNhamFuZGVlcCIsImlzX2NhbmRpZGF0ZSI6dHJ1ZSwiaWF0IjoxNjg3ODk1MjQ0LCJleHAiOjE2ODg0MTM2NDR9.a8Jaql78KYnDal2aHuxqN2XJGbRxr4B5pMyi2C60BMU";
const httpLink = createHttpLink({
  uri: apiUrl,
  headers: {
    Authorization: `${authToken}`,
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
