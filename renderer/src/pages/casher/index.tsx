import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import { ipcRenderer } from 'electron';
import OrderTable from './OrderTable';
import Settings from './Settings';

function subtotal(items: ProductData[]) {
  return items
    .map(({ totalUnitsPrice }) => totalUnitsPrice)
    .reduce((sum, i) => sum + i, 0);
}

function priceRow(qty: number, unit: number) {
  return qty * unit;
}

function createRow(
  productName: string,
  unitsOrdered: number,
  unitPrice: number
) {
  const totalUnitsPrice = priceRow(unitsOrdered, unitPrice);
  return {
    key: productName,
    productName,
    unitsOrdered,
    unitPrice,
    totalUnitsPrice,
  };
}

export default function Casher(): JSX.Element {
  const [auto, setAuto] = React.useState(true);
  const [invoiceSubtotal, setInvoiceSubtotal] = React.useState(0);
  const [state, setState] = React.useState<ProductData[]>([]);
  const [input, setInput] = React.useState('');
  const [inputNum, setInputNum] = React.useState(1);

  const onSubmit = async () => {
    const data = await ipcRenderer.invoke('product/read/barcode', input.trim());
    if (data === null) {
      setInput('');
      setInputNum(1);
      return;
    }
    const newState = [];

    let newRow = true;
    const orderQty = inputNum ? inputNum : 1;
    const row = createRow(data.name, orderQty, data.retailPrice);
    if (state.length === 0) {
      newState.push(row);
    } else {
      state.map(async (value, i) => {
        if (value.productName === data.name) {
          newRow = false;
          value.unitsOrdered = value.unitsOrdered + row.unitsOrdered;
          value.totalUnitsPrice = value.unitPrice * value.unitsOrdered;
          newState.push(value);
        } else if (i === state.length - 1 && newRow) {
          newState.push(value);
          newState.push(row);
        } else {
          newState.push(value);
        }
      });
    }

    const subT = subtotal(newState);
    setInvoiceSubtotal(subT);
    setState(newState as ProductData[]);

    setInput('');
    setInputNum(1);
  };

  const handleInsertMode = (mode: string) => {
    if (mode === 'automatic') {
      setAuto(true);
    } else {
      setAuto(false);
    }
  };
  return (
    <>
      <Row gutter={8}>
        <Col span={16}>
          <OrderTable data={state} invoiceSubtotal={invoiceSubtotal} />
        </Col>
        <Settings
          auto={auto}
          handleInsertMode={handleInsertMode}
          input={input}
          setInput={setInput}
          onSubmit={onSubmit}
        />
      </Row>
    </>
  );
}

// types
export interface ProductData {
  key: string;
  productName: string;
  unitPrice: number;
  unitsOrdered: number;
  totalUnitsPrice: number;
}
