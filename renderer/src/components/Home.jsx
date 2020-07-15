import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import SimpleCard from './Deposits';
import LineChart from './charts/LineChart';
import { ipcRenderer } from 'electron';

export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      sales: [0, 0, 0, 0, 0, 0, 0, 0],
      test: 'ksamk',
    };
  }
  async componentDidMount() {
    const data = [];
    this.state.sales.forEach(async (val, i) => {
      data.push(await ipcRenderer.invoke('nwc', i * 32900));
      if (i === 7) {
        this.setState((state) => {
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
              <SimpleCard title="المبيعات اليوم" amount={val} />
            </Grid>
          ))}
          {[1, 2, 3, 4, 5, 6].map((val, i) => (
            <Grid key={i} item xs={4}>
              <LineChart chartTitle="المبيعات هذا الاسبوع" />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }
}
