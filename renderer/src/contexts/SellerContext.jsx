import React, { Component, createContext } from 'react';

export const SellerContext = createContext();

export default class SellerContextProvider extends Component {
  state = {
    value: 'got ya',
  };
  render() {
    return (
      <SellerContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </SellerContext.Provider>
    );
  }
}
