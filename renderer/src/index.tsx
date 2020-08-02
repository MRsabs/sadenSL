import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import App from './global/App';
import GlobalContextProvider from '@contexts/GlobalContext';
import { Titlebar, Color } from 'custom-electron-titlebar';
import { BrowserRouter as Router } from 'react-router-dom';

new Titlebar({
  backgroundColor: Color.fromHex('#001529'),
});

function RootComponent() {
  return (
    <Router>
      <GlobalContextProvider>
        <App />
      </GlobalContextProvider>
    </Router>
  );
}

const HotReact = hot(RootComponent);

ReactDOM.render(<HotReact />, document.querySelector('#root'));
