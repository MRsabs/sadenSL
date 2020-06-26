import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Appbar from "./components/Appbar";
import Sidebar from "./components/Sidebar";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
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
    <div className={classes.root}>
      <CssBaseline />
      <Appbar open={open} setOpen={setOpen} />
      <Sidebar open={open} setOpen={setOpen} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Router>
            <Switch>
              <Route path="/">
                <Home />
              </Route>
              <Route path="/other">
                <h1>other</h1>
              </Route>
            </Switch>
        </Router>
      </main>
    </div>
  );
}

{
  /* <Grid container spacing={4}>
{[1, 2, 3, 4, 5, 6, 7, 8].map((val, i) => {
  return (
    <Grid key={i} item xs={3}>
      <SimpleCard title="fakeTitle" amount={i * 12} />
    </Grid>
  );
})}
{[1, 2, 3, 4, 5, 6].map((val, i) => {
  return (
    <Grid key={i} item xs={4}>
        <LineChart chartTitle='somethingggg' />
    </Grid>
  );
})}
</Grid> */
}
