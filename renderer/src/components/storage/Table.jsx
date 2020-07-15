import React from 'react';
import PropTypes from 'prop-types'
import MaterialTable from 'material-table';

function OneDetailPanel(props) {
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
      data={props.data.map((val) => {
        const res = {
          name: val['product.name'],
          wholeSale: val['product.wholeSalePrice'],
          retail: val['product.retailPrice'],
          quantityInStock: val['quantityInStock'],
        };
        return res;
      })}
      // eslint-disable-next-line no-unused-vars
      detailPanel={(rowData) => {
        return <ul>اقريبا...</ul>;
      }}
    />
  );
}

OneDetailPanel.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
}


export default OneDetailPanel;
