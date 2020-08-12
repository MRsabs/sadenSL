import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import { ipcRenderer } from 'electron';
import OrderTable from './OrderTable';
import Settings from './Settings';
import { submitOrder as sO } from './funcs';

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

async function createRow(barcode: string, orderQty: number) {
  const { id, name, retailPrice }: ProductRecord = await ipcRenderer.invoke(
    'product/read/barcode',
    barcode.trim()
  );

  return {
    key: id,
    productName: name,
    unitsOrdered: orderQty,
    unitPrice: retailPrice,
    totalUnitsPrice: priceRow(orderQty, retailPrice),
  };
}

const parseNumber = (input: string): number => {
  return Number(input.replace(/,/g, ''));
};

export default function Casher(): JSX.Element {
  const [auto, setAuto] = React.useState(true);
  const [invoiceSubtotal, setInvoiceSubtotal] = React.useState(0);
  const [state, setState] = React.useState<ProductData[]>([]);
  const [input, setInput] = React.useState('');
  const [inputNum, setInputNumState] = React.useState<string>('');

  function clearState(): void {
    setInvoiceSubtotal(0);
    setState([]);
  }

  function submitOrder() {
    sO(state, invoiceSubtotal)
      .then(() => clearState())
      .catch((err) => console.log(err));
  }

  function setInputNum(value: string) {
    const NumberWithoutComma = parseNumber(value);
    const isNumber = Number(NumberWithoutComma);
    if (isNumber) {
      const formated = numberWithCommas(NumberWithoutComma);
      setInputNumState(formated);
    } else {
      setInputNumState(inputNum);
    }
  }

  function clearInputs(): void {
    setInput('');
    setInputNumState('');
  }

  async function onSubmit() {
    try {
      const newState: ProductData[] = [];
      const orderQty: number = inputNum ? parseNumber(inputNum) : 1;
      const row: OrderRow = await createRow(input, orderQty);

      if (state.length === 0) {
        newState.push(row);
      } else {
        let newRow = true;
        state.map(async (value, i) => {
          if (value.productName === row.productName) {
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

      setInvoiceSubtotal(subtotal(newState));
      setState(newState);

      clearInputs();
    } catch (error) {
      // TODO display an aerro alert
      console.error('no such a product');
      clearInputs();
    }
  }

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
          submitOrder={submitOrder}
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

interface ProductRecord {
  id: string;
  barcode: string;
  name: string;
  wholeSalePrice: number;
  retailPrice: number;
  createdAt: number;
  updatedAt: number;
}

export interface OrderRow {
  key: string;
  productName: string;
  unitsOrdered: number;
  unitPrice: number;
  totalUnitsPrice: number;
}
