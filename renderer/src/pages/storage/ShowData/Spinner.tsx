import React from 'react';
import Spin from 'antd/lib/spin';
import Alert from 'antd/lib/alert';

export default function Spinner(): JSX.Element {
  return (
    <>
      <Spin tip="Loading...">
        <Alert
          message="please wait..."
          description="We Are Proccessing Your Data"
          type="info"
        />
      </Spin>
    </>
  );
}
