import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import { Button, Input, Typography, Switch } from 'antd';
import { CSSTransition } from 'react-transition-group';

const qtyInputId = 'insert-qty';
const barcodeInputId = 'insert-barcode';

export default function Settings({
  auto,
  handleInsertMode,
  input,
  onSubmit,
  setInput,
  inputNum,
  setInputNum,
  submitOrder,
}: Props): JSX.Element {
  function insertMode(auto: boolean) {
    if (auto) {
      handleInsertMode('automatic');
    } else {
      handleInsertMode('manual');
    }
  }
  return (
    <Col span={8}>
      <CSSTransition
        in={!auto}
        timeout={175}
        classNames="insert-mode"
        unmountOnExit
        onEnter={() => document.getElementById(qtyInputId).focus()}
        onExited={() => document.getElementById(barcodeInputId).focus()}
      >
        <MyInput
          id={qtyInputId}
          addonBefore="Quantity"
          auto={auto}
          onSubmit={onSubmit}
          input={inputNum}
          setInput={setInputNum}
        />
      </CSSTransition>
      <MyInput
        id={barcodeInputId}
        addonBefore="Barcode"
        auto={auto}
        input={input}
        onSubmit={onSubmit}
        setInput={setInput}
      />
      <Row>
        <Col span={8}>
          <Button onClick={onSubmit} size="large" type="primary">
            Add to Order
          </Button>
        </Col>
        <Col style={{ display: 'flex' }} span={8}>
          <Button size="large" type="primary">
            Cancel Order
          </Button>
        </Col>
        <Col span={8}>
          <Button onClick={submitOrder} size="large" type="primary">
            Submit Order
          </Button>
        </Col>
      </Row>
      <Row style={{ margin: '15px 0' }}>
        <Col span={24}>
          <h2>Settings: </h2>
        </Col>
        <Col span={24}>
          <div>
            <Typography.Text type={'secondary'}>Insert Mode: </Typography.Text>
            <Switch
              onChange={(checked) =>
                checked ? insertMode(true) : insertMode(false)
              }
              checkedChildren="Automatic"
              unCheckedChildren="Manual"
              defaultChecked
            />
          </div>
        </Col>
      </Row>
    </Col>
  );
}

function MyInput(props: {
  id: string;
  input: string | number;
  setInput: (input: string | number) => void;
  addonBefore: string;
  auto: boolean;
  onSubmit: () => void;
}) {
  return (
    <Input
      id={props.id}
      size="large"
      style={{ margin: '5px 0' }}
      addonBefore={`${props.addonBefore}: `}
      value={props.input}
      onKeyPress={(e) => {
        if (e.key === 'Enter' && props.auto) {
          props.onSubmit();
        }
      }}
      onChange={(e) => props.setInput(e.target.value)}
    />
  );
}

interface Props {
  handleInsertMode: (mode: string) => void;
  auto: boolean;
  input: string;
  setInput: (input: string) => void;
  inputNum: string;
  setInputNum: (input: string) => void;
  onSubmit: () => void;
  submitOrder: () => void;
}
