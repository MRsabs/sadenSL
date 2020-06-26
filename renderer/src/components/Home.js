import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import SimpleCard from './Deposits'
import Appbar from "./Appbar";
import Sidebar from "./Sidebar";
import MyResponsiveLine from './Chart'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
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
  chart: {
    height: '450px'
  }
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Appbar open={open} setOpen={setOpen} />
      <Sidebar open={open} setOpen={setOpen} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container maxWidth="xl" className={classes.root}>
          <Grid container spacing={4}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((val, i) => {
              return (
                <Grid key={i} item xs={3}>
                  <SimpleCard title="fakeTitle" amount={i * 12} />
                </Grid>
              );
            })}
          </Grid>
        </Container>
        <div dir="ltr" className={classes.chart}>
            <MyResponsiveLine />
          </div>
      </main>
    </div>
  );
}
