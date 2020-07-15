import React, { useEffect, useContext } from 'react';
import { ipcRenderer } from 'electron';
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { StorageContext } from '@contexts/StorageContext';
import NoStorage from './NoStorage';
import OneStorage from './OneStorage';
import OneStorageContextProvider from '@contexts/OneStorageContext';
import TopPanel from './TopPanel';
const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default function Storage() {
  let match = useRouteMatch();
  const { storage, dispatch } = useContext(StorageContext);
  useEffect(() => {
    ipcRenderer.invoke('inventory/read/all').then((data) => {
      dispatch({
        type: 'sync',
        payload: data,
      });
    });
  }, []);
  if (storage.count === 0) {
    return <NoStore />;
  } else {
    return (
      <OneStorageContextProvider>
        <Container maxWidth="lg">
          <div>
            <TopPanel
              title="اختار احد المخازن"
              storages={storage.rows}
              match={match}
            />
            <Switch>
              <Route path={`${match.path}/:storageId`}>
                <OneStorage />
              </Route>
              <Route path={match.path}>
                <h3>الرجاء اختيار احد المخازن</h3>
              </Route>
            </Switch>
          </div>
        </Container>
      </OneStorageContextProvider>
    );
  }
}

function NoStore() {
  const classes = useStyles();
  return (
    <Container className={classes.root} maxWidth="lg">
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item>
          <NoStorage />
        </Grid>
      </Grid>
    </Container>
  );
}
