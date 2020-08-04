import React, { useContext } from 'react';
import { OneStorageContext } from '@contexts/OneStorageContext';
import Spinner from './Spinner';
import Table from './Table';

export default function ShowData(props: Props): JSX.Element {
  const { state } = useContext(OneStorageContext);
  return <>{props.spinner ? <Spinner /> : <Table data={state} />}</>;
}

interface Props {
  spinner: boolean;
}
