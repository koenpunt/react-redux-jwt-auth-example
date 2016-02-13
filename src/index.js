import 'babel-core/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory } from 'react-router';

import Root from './containers/Root';
import configureStore from './store/configureStore';
import {loginUserSuccess} from './actions';

const target = document.getElementById('root');
const store = configureStore(hashHistory, window.__INITIAL_STATE__);

const node = (
    <Root store={store} history={hashHistory} />
);

let token = localStorage.getItem('token');
if (token !== null) {
    store.dispatch(loginUserSuccess(token));
}

ReactDOM.render(node, target);
