import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home'

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/about">
          <h1>Abbouut</h1>
          </Route>
          <Route path="/users">
          <h1>other</h1>
          </Route>
          <Route path="/">
            <Home />
          </Route>
          <Route>
            <h1>unfoound</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
