import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Appbar from './components/Appbar';
import Sidebar from './components/sidebar/Sidebar';
import Storage from './components/storage/Storage';
import Home from './components/Home';
import StorageContextProvider from '@contexts/StorageContext';
import Casher from './components/casher/Casher';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <Appbar title="سدنـسيل" open={open} setOpen={setOpen} />
        <Sidebar open={open} setOpen={setOpen} />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path="/casher">
              <Casher />
            </Route>
            <Route exact path="/reports">
              <Home />
            </Route>
            <Route path="/storage">
              <StorageContextProvider>
                <Storage />
              </StorageContextProvider>
            </Route>
            <Route exact path="/products">
              <h1>products</h1>
            </Route>
            <Route exact path="/help">
              <h1>help</h1>
            </Route>
            <Route exact path="/">
              <h1>root</h1>
            </Route>
            <Route>
              <h1>Page not Found</h1>
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}
