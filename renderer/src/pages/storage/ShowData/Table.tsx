import React, { useLayoutEffect, useState } from 'react';
import { Table as AntTable } from 'antd';
import { ColumnsType } from 'antd/es/table';

function getContentSectionHeight(): number {
  return document.querySelector('#root > section > section > section > main')
    .clientHeight;
}

function GetTableHeight(ContentSectionHeight: number) {
  // ContentSectionHeight - tableHeader - TableButtom - 2 * paddingY
  const TableHeight = ContentSectionHeight - 38 - 64 - 2 * 24;
  return TableHeight;
}

const columns: ColumnsType<Product> = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Retail Price',
    dataIndex: 'retailPrice',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.retailPrice - b.retailPrice,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Whole Sale Price',
    dataIndex: 'wholeSalePrice',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.wholeSalePrice - b.wholeSalePrice,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Quantity In Stock',
    dataIndex: 'quantityInStock',
  },
];

function Table(props: Props): JSX.Element {
  const [tableHeight, setTableHeight] = useState(0);

  useLayoutEffect(() => {
    function updateSize() {
      const newTableHeight = GetTableHeight(getContentSectionHeight());
      setTableHeight(newTableHeight);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }

  function dataArr(): Product[] {
    return props.data.map((val) => {
      const res = {
        key: val.id,
        name: val['product.name'],
        wholeSalePrice: val['product.wholeSalePrice'],
        retailPrice: val['product.retailPrice'],
        quantityInStock: val['quantityInStock'],
      };
      return res;
    });
  }
  return (
    <>
      <AntTable<Product>
        bordered={true}
        size="small"
        pagination={{ pageSize: 20 }}
        scroll={{ y: `${tableHeight}px` }}
        columns={columns}
        dataSource={dataArr()}
        onChange={onChange}
      />
    </>
  );
}

export default Table;

interface Props {
  data: [
    {
      createdAt: number;
      id: string;
      'product.barcode': string;
      'product.createdAt': number;
      'product.id': string;
      'product.name': string;
      'product.retailPrice': number;
      'product.updatedAt': number;
      'product.wholeSalePrice': number;
      productId: string;
      quantityInStock: number;
      trackerId: string;
      updatedAt: number;
    }
  ];
}

interface Product {
  key: string;
  name: string;
  wholeSalePrice: number;
  retailPrice: number;
  quantityInStock: number;
}
