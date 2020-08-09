import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Select from 'antd/lib/select';
import { Button, Input } from 'antd';

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
          addonBefore="Qty"
          auto={auto}
          onSubmit={onSubmit}
          input={inputNum}
          setInput={setInputNum}
        />
      ) : null}
      <Row>
        <Col span={12}>
          <Button size="large" type="primary">
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
          <Select
            defaultValue="none"
            style={{ width: '100%', margin: '5px 0' }}
            onChange={handleInsertMode}
          >
            <Option value="none" disabled={true}>
              Select insert mode (default: automatic)
            </Option>
            <Option value="automatic">Automatic</Option>
            <Option value="manual">Manual</Option>
          </Select>
        </Col>
      </Row>
    </Col>
  );
}

function MyInput(props: {
  input: string;
  setInput: (input: string) => void;
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
