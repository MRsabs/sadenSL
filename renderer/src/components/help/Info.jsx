import React from 'react';
import { Container, Typography, Grid, Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ipcRenderer, remote } from 'electron';

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
  const [info, setInfo] = React.useState('');
  const classes = useStyles();

  const checkForUpdate = async () => {
    const { version } = await ipcRenderer.invoke('update/check');
    if (version === remote.app.getVersion()) {
      setInfo(`لا توجود اي تحديات حاليا`);
    } else {
      setInfo(`تحديث : ${version} متوفر`);
    }
  };

  const download = () => {
    ipcRenderer.invoke('update/download');
  };

  return (
    <Container className={classes.root} maxWidth="xl">
      <Typography className={classes.spaceDown} variant="h3">
        Saden-sel Version: {remote.app.getVersion()}
      </Typography>
      <Box>
        <Grid container spacing={5}>
          <Grid item xs={6}>
            <Button variant="contained" color="primary" onClick={download}>
              تحديث الان
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={checkForUpdate}
            >
              هل هناك تحديث
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography align="center" variant="subtitle1">
              {info}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
