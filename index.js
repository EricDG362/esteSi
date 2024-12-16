import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import client from './config/apollo';
import { name as appName } from './app.json';
import {ApolloProvider } from '@apollo/client';

const Sumary = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

AppRegistry.registerComponent(appName, () => Sumary);
