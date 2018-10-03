import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Routes from './routes';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink, from } from 'apollo-link';
import { ApolloClient,HttpLink ,InMemoryCache} from 'apollo-client-preset';
import 'semantic-ui-css/semantic.min.css';
import { onError } from 'apollo-link-error'

const cache = new InMemoryCache();
const httpLink = new HttpLink({
  uri:'http://localhost:8000/graphql',
})

const authLink = new ApolloLink((operation,forward) => {
  // const token = localStorage.getItem('token');
  // const refreshToken = localStorage.getItem('refreshToken');
  //use the set context method to set the HTTP headers
  operation.setContext(({headers = {}}) => ({
    //add the authorization to the headers
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || null,
    }
}));
  return forward(operation);
});
const otherMiddleware = new ApolloLink((operation,forward) => {
  operation.setContext(({headers={}}) => ({
    headers: {
      ...headers,
      refreshtoken:localStorage.getItem('refreshToken') || null,
    }
  }));
  return forward(operation);
});
//
// const logoutLink = onError(({ networkError}) => {
//   if(networkError.statusCode === 401) logout();
// })

const client = new ApolloClient({
  link: from([
    authLink,
    otherMiddleware,
    // logoutLink,
    httpLink,
  ]),
  cache: new InMemoryCache(),
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
