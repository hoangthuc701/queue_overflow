import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import dotenv from 'dotenv';
import MainRoute from './MainRoute';
import history from './helper/history';

function App() {
  dotenv.config();
  return (
    <div>
      <BrowserRouter history={history}>
        <MainRoute />
      </BrowserRouter>
    </div>
  );
}

export default App;
