import React from 'react';
import Table from 'antd/lib/table';
import Column from 'antd/lib/table/Column';
import ColumnGroup from 'antd/lib/table/ColumnGroup';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Statistic from 'antd/lib/statistic';
import { ProductData } from '.';

function numberWithCommas(x: number | string, opt: FormatOpitions): string {
  return Number(x).toLocaleString(opt.locale, {
    style: opt.options.style || 'en-US',
    currency: opt.options.currency || 'decimal',
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
          return numberWithCommas(value, {
            options: { currency: 'IQD', style: 'currency' },
          });
        }}
      />
      <ColumnGroup title="Order Details">
        <Column
          title="Units Ordered"
          dataIndex="unitsOrdered"
          key="unitsOrdered"
          render={(value) => {
            return numberWithCommas(value, {
              options: { currency: 'IQD', style: 'decimal' },
            });
          }}
        />
        <Column
          title="Total Units Price"
          dataIndex="totalUnitsPrice"
          key="totalUnitsPrice"
          render={(value) => {
            return numberWithCommas(value, {
              options: { currency: 'IQD', style: 'currency' },
            });
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

interface FormatOpitions {
  locale?: string;
  options: Intl.NumberFormatOptions;
}

function OrderTotal(invoiceSubtotal: number): JSX.Element {
  const total = numberWithCommas(invoiceSubtotal, {
    options: { currency: 'IQD', style: 'currency' },
  });
  return (
    <Row gutter={16}>
      <Col span={24}>
        <Statistic title="Total" value={total} />
      </Col>
    </Row>
  );
}
