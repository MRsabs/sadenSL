import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Table from 'antd/lib/table';
import Input from 'antd/lib/input';

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'Product Name',
    dataIndex: 'productName',
    key: 'productName',
  },
  {
    title: 'Unit Price',
    dataIndex: 'unitPrice',
    key: 'unitPrice',
  },
  {
    title: 'Total Units Price',
    dataIndex: 'totalUnitsPrice',
    key: 'totalUnitsPrice',
  },
];

export default function Casher(): JSX.Element {
  return (
    <>
      <Row>
        <Col span={16}>
          <Table dataSource={dataSource} columns={columns} />
        </Col>
        <Col span={8}>
          <Input addonBefore="barcode:" />
        </Col>
      </Row>
    </>
  );
}
