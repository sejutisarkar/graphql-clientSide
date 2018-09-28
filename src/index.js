import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Routes from './routes';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import 'semantic-ui-css/semantic.min.css';

const cache = new InMemoryCache();
const httpLink = new HttpLink({
  uri:'http://localhost:8080/graphql',
})
const client = new ApolloClient({
  link: httpLink,
  cache,
});

const App = (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
)
ReactDOM.render(App,
  document.getElementById('root'),
);
registerServiceWorker();
