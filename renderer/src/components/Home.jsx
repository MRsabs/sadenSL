import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import SimpleCard from './Deposits';
import LineChart from './charts/LineChart';
import numberWithCommas from '../utils/numberWithCommas';

export default class Home extends Component {
  state = {
    sales: [0, 0, 0, 0, 0, 0, 0, 0],
    test: 'ksamk',
  };
  async componentDidMount() {
    const data = [];
    this.state.sales.forEach(async (val, i) => {
      data.push(await numberWithCommas(i * 32900));
      if (i === 7) {
        this.setState((state, props) => {
          return { ...state, sales: data };
        });
      }
    });
  }
  render() {
    return (
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {this.state.sales.map((val, i) => (
            <Grid key={i} item xs={3}>
              <SimpleCard title="fakeTitle" amount={val} />
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
}
