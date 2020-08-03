import React from 'react';
// import Row from 'antd/lib/row';
// import Col from 'antd/lib/col';
import { Empty } from 'antd';
import CreateStorage from './CreateStorage';

export default function NoStorage(): JSX.Element {
  return (
    <>
      <Empty
        //TODO downlaod the image  localy
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{
          height: 160,
        }}
        description={
          <span style={{ fontWeight: 'bold' }}>
            You do not have any Storages yet
          </span>
        }
      >
        <CreateStorage />
      </Empty>
    </>
  );
}
