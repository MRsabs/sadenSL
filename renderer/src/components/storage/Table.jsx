import React from 'react';
import MaterialTable from 'material-table';

function OneDetailPanel(props) {
  setTimeout(() => {
    // console.log(props.data[0]['product.id']);
  }, 1000);
  return (
    <MaterialTable
      title="One Detail Panel Preview"
      columns={[
        { title: 'اسم المنتج', field: 'name' },
        { title: 'سعر الشراء', field: 'wholeSale', type: 'numeric' },
        { title: 'سعر البيع', field: 'retail', type: 'numeric' },
        {
          title: 'الكمية في المخزن',
          field: 'quantityInStock',
          type: 'numeric',
        },
      ]}
      data={props.data.map((val, i) => {
        const res = {
          name: val['product.name'],
          wholeSale: val['product.wholeSalePrice'],
          retail: val['product.retailPrice'],
          quantityInStock: val['quantityInStock'],
        };
        return res;
      })}
      detailPanel={(rowData) => {
        return <ul>اقريبا...</ul>;
      }}
    />
  );
}

export default OneDetailPanel;
