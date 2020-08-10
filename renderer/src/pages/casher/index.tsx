import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import { ipcRenderer } from 'electron';
import OrderTable from './OrderTable';
import Settings from './Settings';

// TODO make this function global
interface FormatOpitions {
  locale?: string;
  options?: Intl.NumberFormatOptions;
}

function numberWithCommas(
  x: number | string,
  opt: FormatOpitions = { locale: 'en-US', options: { style: 'decimal' } }
): string {
  return Number(x).toLocaleString(opt.locale, { ...opt.options });
}

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
  const [inputNum, setInputNumState] = React.useState<string>('');

  const parseInputNum = (): number => {
    return Number(inputNum.replace(/,/g, ''));
  };

  const setInputNum = (value: string | number) => {
    console.log(value, typeof value);
    const parseSting = (value as string).replace(/,/g, '');
    const isNumber = Number(parseSting);
    if (isNumber) {
      const formated = numberWithCommas(parseSting);
      setInputNumState(formated);
    } else {
      setInputNumState(inputNum);
    }
  };

  const onSubmit = async () => {
    function clearInputs(): void {
      setInput('');
      setInputNumState('');
    }
    const data = await ipcRenderer.invoke('product/read/barcode', input.trim());
    if (data === null) {
      return clearInputs();
    }
    const newState = [];

    let newRow = true;
    const orderQty = inputNum ? parseInputNum() : 1;
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

    clearInputs();
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
          inputNum={inputNum}
          setInputNum={setInputNum}
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
