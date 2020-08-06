import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router } from 'react-router-dom';
import 'antd/dist/antd.css';
import './index.css';
import App from './App';
import Init from './Init';
import GlobalContextProvider from '@contexts/GlobalContext';
import StorageContextProvider from '@contexts/StorageContext';

function RootComponent() {
  return (
    <Router>
      <GlobalContextProvider>
        <StorageContextProvider>
          <Init>
            <App />
          </Init>
        </StorageContextProvider>
      </GlobalContextProvider>
    </Router>
  );
}

const HotReact = hot(RootComponent);

ReactDOM.render(<HotReact />, document.querySelector('#root'));
