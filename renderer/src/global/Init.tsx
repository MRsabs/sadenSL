/* eslint-disable */
// @ts-nocheck
import React from 'react';
import { ipcRenderer } from 'electron';
import { GlobalContext } from '@contexts/GlobalContext';

function Init(props: { children: React.ReactNode }): JSX.Element {
  const { dispatch } = React.useContext(GlobalContext);

  React.useEffect(() => {
    const info = ipcRenderer.sendSync('app/init');

    for (const key in info) {
      if (Object.prototype.hasOwnProperty.call(info, key)) {
        dispatch({
          type: key,
          payload: info[key],
        });
      }
    }
  }, []);
  return <>{props.children}</>;
}

export default Init;
