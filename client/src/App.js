import React from 'react';
import { Router } from 'react-router-dom';

import MainRoute from './MainRoute';
import history from './helper/history';

function App() {
  return (
    <div>
      <Router history={history}>
        <MainRoute />
      </Router>
    </div>
  );
}

export default App;
