import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import numberWithCommas from '../utils/numberWithCommas';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Typography variant="h5" component="h2">
          {props.title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {numberWithCommas(props.amount)}
        </Typography>
      </CardContent>
    </Card>
  );
}
