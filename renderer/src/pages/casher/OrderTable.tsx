import React from 'react';
import Table from 'antd/lib/table';
import Column from 'antd/lib/table/Column';
import ColumnGroup from 'antd/lib/table/ColumnGroup';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Statistic from 'antd/lib/statistic';
import { ProductData } from '.';

function numberWithCommas(
  x: number | string,
  options = { locale: 'en-US', currency: 'IQD' }
): string {
  return x.toLocaleString(options.locale, {
    style: 'currency',
    currency: options.currency,
  });
}

export default function OrderTable(props: Props): JSX.Element {
  return (
    <Table
      bordered={true}
      dataSource={props.data}
      footer={() => OrderTotal(props.invoiceSubtotal)}
    >
      <Column title="Product Name" dataIndex="productName" key="productName" />
      <Column
        title="Unit Price"
        dataIndex="unitPrice"
        key="unitPrice"
        render={(value) => {
          return numberWithCommas(value);
        }}
      />
      <ColumnGroup title="Order Details">
        <Column
          title="Units Ordered"
          dataIndex="unitsOrdered"
          key="unitsOrdered"
        />
        <Column
          title="Total Units Price"
          dataIndex="totalUnitsPrice"
          key="totalUnitsPrice"
          render={(value) => {
            return numberWithCommas(value);
          }}
        />
      </ColumnGroup>
    </Table>
  );
}

interface Props {
  data: ProductData[];
  invoiceSubtotal: number;
}

function OrderTotal(invoiceSubtotal: number): JSX.Element {
  return (
    <Row gutter={16}>
      <Col span={24}>
        <Statistic title="Total" value={invoiceSubtotal} />
      </Col>
    </Row>
  );
}
