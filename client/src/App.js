import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './css/App.css';
import './css/sidebar.css';

import BaseLayout from './containers/Layout';
import BaseRouter from './route'

function App() {
  return (
    <div className="App">
      <Router>
        <BaseLayout>
          <BaseRouter />
        </BaseLayout>
      </Router>
    </div>
  );
}

export default App;
