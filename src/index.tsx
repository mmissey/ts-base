import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App';
import { Provider } from 'react-redux';
import store from './state/store';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

ReactDOM.render(
<Provider store={store}>
    <Router>
        <App/>
    </Router>
</Provider>, document.getElementById('root'));