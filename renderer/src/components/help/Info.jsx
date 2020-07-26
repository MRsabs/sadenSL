import React from 'react';
import { Container, Typography, Grid, Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  spaceDown: {
    marginBottom: theme.spacing(2),
  },
}));

export default function Info() {
  const classes = useStyles();
  return (
    <Container className={classes.root} maxWidth="xl">
      <Typography className={classes.spaceDown} variant="h3">
        Saden-sel Version: 0.2.0
      </Typography>
      <Box>
        <Grid container spacing={5}>
          <Grid item xs={6}>
            <Button variant="contained" color="primary">
              تحديث الان
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" color="primary">
              هل هناك تحديث
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography align="center" variant="body1">جار العمل</Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
