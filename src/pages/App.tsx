import React from 'react';
import { Route } from 'react-router-dom';
import Images from './images';
import Landing from './landing';
import './App.css';

const App: React.FC = () => {
  return (
      <div className="main-container" >
        <Route path="/" exact component={Landing} />
        <Route path="/images" component={Images} />
      </div>
  );
}

export default App;
