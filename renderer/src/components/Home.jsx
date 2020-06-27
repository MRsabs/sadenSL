import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import SimpleCard from './Deposits';
import LineChart from './charts/LineChart';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((val, i) => (
          <Grid key={i} item xs={3}>
            <SimpleCard title="fakeTitle" amount={i * 12} />
          </Grid>
        ))}
        {[1, 2, 3, 4, 5, 6].map((val, i) => (
          <Grid key={i} item xs={4}>
            <LineChart chartTitle="somethingggg" />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
