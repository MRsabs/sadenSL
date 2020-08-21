import React from 'react';
import Drawer from 'antd/lib/drawer';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import Row from 'antd/lib/row';
import Select from 'antd/lib/select';
import DatePicker from 'antd/lib/date-picker';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import { parseNumber, numberWithCommas } from 'src/global/funcs';
import { createProduct, ProductData } from '@api/createProduct';

const { Option } = Select;

function OrderForm(props: Props) {
  const [state, setState] = React.useState({ visible: false });
  const [form] = Form.useForm();

  function handleNumInput(value: string) {
    const NumberWithoutComma = parseNumber(value);
    const isNumber = Number(NumberWithoutComma);
    if (isNumber) {
      const formated = numberWithCommas(NumberWithoutComma);
      return formated;
    } else {
      return false;
    }
  }

  function showDrawer() {
    setState({
      visible: true,
    });
  }

  function onClose() {
    setState({
      visible: false,
    });
  }

  function formSubmit(): void {
    // TODO find out what is the correct antd types and remove (as FormInputs)
    const input = form.getFieldsValue() as FormInputs;
    const output: ProductData = {
      barcode: '',
      dateTime: [0],
      name: '',
      notes: '',
      quantity: 0,
      retailPrice: 0,
      wholeSalePrice: 0,
      trackerId: '',
      type: '',
    };
    for (const key in input) {
      if (Object.prototype.hasOwnProperty.call(input, key)) {
        if (
          key === 'quantity' ||
          key === 'retailPrice' ||
          key === 'wholeSalePrice'
        ) {
          output[key] = parseNumber(input[key]);
        } else if (key === 'dateTime') {
          input[key].map((moemntDate, i) => {
            output[key][i] = moemntDate.startOf('day').unix();
          });
        } else {
          output[key] = input[key].trim();
        }
      }
    }
    ``;
    if (createProduct(output as ProductData)) {
      onClose();
      form.resetFields();
    } else {
      // TODO handle
      console.error('something went wrong');
      onClose();
    }
  }

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        <PlusOutlined /> New Product
      </Button>
      <Drawer
        title="Create a new Product"
        width={720}
        onClose={onClose}
        visible={state.visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={() => formSubmit()} type="primary">
              Submit
            </Button>
          </div>
        }
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  { required: true, message: 'Please enter product name' },
                ]}
              >
                <Input placeholder="Please enter product name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="barcode"
                label="Barcode"
                rules={[
                  { required: true, message: 'Please enter product barcode' },
                ]}
              >
                <Input placeholder="Please enter product barcode" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="retailPrice"
                label="Retail Price"
                normalize={(newValue, prevValue) => {
                  if (newValue === '') {
                    return '';
                  } else {
                    const withComma = handleNumInput(newValue);
                    return withComma ? withComma : prevValue;
                  }
                }}
                rules={[
                  {
                    required: true,
                    message: 'Please enter product Retail Price',
                  },
                ]}
              >
                <Input
                  // TODO handle comma delection
                  // onKeyDown={(e) => {
                  //   var key = e.keyCode || e.charCode;

                  //   if (key == 8 || key == 46) return;
                  // }}
                  placeholder="Please enter product Retail Price"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="wholeSalePrice"
                label="Whole Sale Price"
                normalize={(newValue, prevValue) => {
                  if (newValue === '') {
                    return '';
                  } else {
                    const withComma = handleNumInput(newValue);
                    return withComma ? withComma : prevValue;
                  }
                }}
                rules={[
                  {
                    required: true,
                    message: 'Please enter product Whole Sale Price',
                  },
                ]}
              >
                <Input placeholder="Please enter product Whole Sale Price" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="trackerId"
                label="Storage"
                rules={[{ required: true, message: 'Please select a storage' }]}
              >
                <Select placeholder="Please select a storage">
                  {props.trackerSelected.map(({ id, inventoryName }) => {
                    return (
                      <Option key={id} value={id}>
                        {inventoryName}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Type"
                rules={[{ required: true, message: 'Please choose the type' }]}
              >
                <Select placeholder="Please choose the type">
                  <Option value="weight">sell by weight</Option>
                  <Option value="quantity">sell by quantity</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="quantity"
                label="Quantity"
                normalize={(newValue, prevValue) => {
                  if (newValue === '') {
                    return '';
                  } else {
                    const withComma = handleNumInput(newValue);
                    return withComma ? withComma : prevValue;
                  }
                }}
                rules={[
                  { required: true, message: 'Please choose the quantity' },
                ]}
              >
                <Input placeholder="Please enter product  quantity" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dateTime"
                label="DateTime"
                rules={[
                  { required: true, message: 'Please choose the dateTime' },
                ]}
              >
                <DatePicker.RangePicker
                  style={{ width: '100%' }}
                  getPopupContainer={(trigger) => trigger.parentElement}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="notes"
                label="Notes"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Enter notes if you want to"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
}

export default OrderForm;

//types

interface Props {
  trackerSelected: [{ id: string; inventoryName: string }];
}

interface FormInputs {
  name: string;
  barcode: string;
  quantity: string;
  dateTime: [moment.Moment];
  retailPrice: string;
  wholeSalePrice: string;
  type: string;
  storageId: string;
  notes: string;
}
