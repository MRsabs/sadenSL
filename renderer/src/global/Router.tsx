import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Result } from 'antd';
import Storage from 'src/pages/storage';
import Casher from 'src/pages/casher';
import Orders from '@pages/orders/Order';
export default function App(): JSX.Element {
  return (
    <Switch>
      <Route exact path="/casher">
        <Casher />
      </Route>
      <Route exact path="/orders">
        <Orders />
      </Route>
      <Route path="/storage">
        <Storage />
      </Route>
      <Route exact path="/products">
        <h1>product</h1>
      </Route>
      <Route exact path="/help">
        <h1>Help</h1>
      </Route>
      <Route exact path="/">
        <h1>roottt</h1>
      </Route>
      <Route>
        <Result
          status="500"
          title="something went wrong"
          subTitle="please reach to Help"
        />
      </Route>
    </Switch>
  );
}
