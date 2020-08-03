import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import App from './global/App';
import Init from './global/Init';
import GlobalContextProvider from '@contexts/GlobalContext';
// import { Titlebar, Color } from 'custom-electron-titlebar';
import { BrowserRouter as Router } from 'react-router-dom';
import StorageContextProvider from '@contexts/StorageContext';

// new Titlebar({
//   backgroundColor: Color.fromHex('#001529'),
// });

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
