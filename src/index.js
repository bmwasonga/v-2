import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import { client } from './Client';

ReactDOM.render(
  <ApolloProvider client={client}>
    <ChakraProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ChakraProvider>
  </ApolloProvider>,
  document.getElementById('root')
);
