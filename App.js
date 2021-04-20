import 'react-native-gesture-handler';
import React from 'react';
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';
import {LogBox, StatusBar} from 'react-native';

import Routes from './src/Routes';

LogBox.ignoreAllLogs();

const client = new ApolloClient({
  uri: 'https://verceltest-3w0eb7jjd-enzo-amorim.vercel.app',
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <StatusBar barStyle="light-content" />
      <Routes />
    </ApolloProvider>
  );
}
