/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo-hooks';
import { BrowserRouter as Router } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';

import App from './App';
import ApolloClient from './apollo.config';
import muiTheme from './styling';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  (
    <Router>
      <ApolloProvider client={ApolloClient}>
        <MuiThemeProvider theme={muiTheme}>
          <App />
        </MuiThemeProvider>
      </ApolloProvider>
    </Router>
  ),
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
