import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import MainRoute from './MainRoute';
import history from './helper/history';

function App() {
  return (
    <div>
      <BrowserRouter history={history}>
        <MainRoute />
      </BrowserRouter>
    </div>
  );
}

export default App;
