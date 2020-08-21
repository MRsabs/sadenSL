import React, { useLayoutEffect, useState, useContext } from 'react';
import { ProductsInfo } from '@contexts/OneStorageContext';
import OrderForm from 'src/components/OrderForm';
import { StorageContext } from '@contexts/StorageContext';
import AntTable from 'antd/lib/table';
import Column from 'antd/lib/table/Column';
import ColumnGroup from 'antd/lib/table/ColumnGroup';
import { numberWithCommas } from 'src/global/funcs';
import moment from 'moment';

function getContentSectionHeight(): number {
  return document.querySelector('#root > section > section > section > main')
    .clientHeight;
}

function GetTableHeight(ContentSectionHeight: number) {
  // ContentSectionHeight - tableHeader - TableButtom - 2 * paddingY
  const TableHeight = ContentSectionHeight - 38 - 64 - 2 * 24 - 85;
  return TableHeight;
}

function Table(props: Props): JSX.Element {
  const [tableHeight, setTableHeight] = useState(0);
  const storageSelected = useContext(StorageContext).state.rows.map(
    ({ dataValues: { id, inventoryName } }) => ({
      id,
      inventoryName,
    })
  );

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
      console.log(val);
      const res = {
        key: val.id,
        name: val['product.name'],
        wholeSalePrice: val['product.wholeSalePrice'],
        retailPrice: val['product.retailPrice'],
        quantityInStock: val['quantityInStock'],
        barcode: val['product.barcode'],
        productionDate: val['product.productionDate'],
        expirationDate: val['product.expirationDate'],
        notes: val['notes'],
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
        // columns={columns}
        dataSource={dataArr()}
        onChange={onChange}
        title={() => <OrderForm trackerSelected={storageSelected} />}
      >
        <Column title="Product Name" dataIndex="name" key="name" />
        <Column title="Barcode" dataIndex="barcode" key="barcode" />
        <Column
          title="Quantity"
          dataIndex="quantityInStock"
          key="quantityInStock"
          render={(value) => {
            return numberWithCommas(value);
          }}
        />
        <ColumnGroup title={'Pricing'}>
          <Column
            title="Retail Price"
            dataIndex="retailPrice"
            key="retailPrice"
            render={(value) => {
              return numberWithCommas(value, {
                options: { currency: 'IQD', style: 'currency' },
              });
            }}
          />
          <Column
            title="Whole Sale Price"
            dataIndex="wholeSalePrice"
            key="wholeSalePrice"
            render={(value) => {
              return numberWithCommas(value, {
                options: { currency: 'IQD', style: 'currency' },
              });
            }}
          />
        </ColumnGroup>
        <ColumnGroup title={'P & E'}>
          <Column
            title="Production Date"
            dataIndex="productionDate"
            key="productionDate"
            render={(value) => {
              return moment.unix(value).format('YYYY-MM-DD');
            }}
          />
          <Column
            title="Expiration Date"
            dataIndex="expirationDate"
            key="expirationDate"
            render={(value) => {
              return moment.unix(value).format('YYYY-MM-DD');
              // return `${moment.unix(value).format('YYYY-MM-DD')}\n${moment
              //   .unix(value)
              //   .format('YYYY-MM-DD')}`;
            }}
          />
        </ColumnGroup>
      </AntTable>
    </>
  );
}

export default Table;

interface Props {
  data: ProductsInfo[];
}

interface Product {
  key: string;
  name: string;
  wholeSalePrice: number;
  retailPrice: number;
  quantityInStock: number;
  productionDate: number;
  expirationDate: number;
  notes: string;
}
