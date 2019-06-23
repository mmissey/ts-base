import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Images from './images';
import './App.scss';

const App: React.FC = () => {
  return (
      <div className="main-container" >
        <Route path="/images" component={Images} />
        <Redirect path="/" to="/images" />
      </div>
  );
}

export default App;
