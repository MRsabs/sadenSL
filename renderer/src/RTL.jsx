import React from 'react';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

export default function RTL({ children }) {
  return <StylesProvider jss={jss}>{children}</StylesProvider>;
}

RTL.propTypes = {
  name: PropTypes.arrayOf(PropTypes.element),
  children: PropTypes.element
};
