import React from "react";
import { createUseStyles } from "react-jss";
import clsx from "clsx";

// Create your Styles. Remember, since React-JSS uses the default preset,
// most plugins are available without further configuration needed.
const useStyles = createUseStyles({
  root: {
    margin: {
      top: 5,
      bottom: 5,
    },
    padding: {
      top: 5,
      bottom: 5
    }
  },
});

export default function Card({ title, amount }) {
  const classes = useStyles();
  return (
    <div className={clsx("w3-green w3-hover-shadow w3-center", classes.root)}>
      <h1>{title}</h1>
      <p> {amount} </p>
    </div>
  );
}
