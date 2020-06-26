import React from "react";
import SimpleCard from "./Deposits";
import Grid from "@material-ui/core/Grid";
import LineChart from "./charts/LineChart";

export default function Home() {
  return (
    <Grid container spacing={4}>
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
            <LineChart chartTitle="somethingggg" />
          </Grid>
        );
      })}
    </Grid>
  );
}
