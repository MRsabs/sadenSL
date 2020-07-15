import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import App from './App';
import theme from './theme';
import RTL from "./RTL";

function RootComponent() {
  return (
    <RTL>
      <div dir="rtl">
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <App />
        </ThemeProvider>
      </div>
    </RTL>
  );
}

const HotReact = hot(RootComponent);

ReactDOM.render(<HotReact />, document.querySelector('#root'));
