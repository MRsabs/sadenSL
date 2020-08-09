import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Select from 'antd/lib/select';
import { Button, Input, Typography, Switch } from 'antd';

const { Option } = Select;

export default function Settings({
  auto,
  handleInsertMode,
  input,
  onSubmit,
  setInput,
  inputNum,
  setInputNum,
}: Props): JSX.Element {
  return (
    <Col span={8}>
      <MyInput
        addonBefore="Barcode"
        auto={auto}
        input={input}
        onSubmit={onSubmit}
        setInput={setInput}
      />
      {!auto ? (
        <MyInput
          addonBefore="Quantity"
          auto={auto}
          onSubmit={onSubmit}
          input={inputNum}
          setInput={setInputNum}
        />
      ) : null}
      <Row>
        <Col span={12}>
          <Button onClick={onSubmit} size="large" type="primary">
            Submit Order
          </Button>
        </Col>
        <Col span={12}>
          <Button size="large" type="primary">
            Cancel Order
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
                checked
                  ? handleInsertMode('automatic')
                  : handleInsertMode('manual')
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
  input: string | number;
  setInput: (input: string | number) => void;
  addonBefore: string;
  auto: boolean;
  onSubmit: () => void;
}) {
  return (
    <Input
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
  inputNum: number;
  setInputNum: (input: number) => void;
  onSubmit: () => void;
}
