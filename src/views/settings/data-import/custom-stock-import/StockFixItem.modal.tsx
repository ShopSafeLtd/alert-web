import { Col, Form, Input, Modal, Row, Select, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';

interface Values {
  barcode: string;
  brand: string;
  colour?: string;
  description: string;
  itemNumber: string;
  itemSize?: string;
  stockItem: string;
  variant?: string;
}

interface FixStockItemImportItem {
  onCancel: () => void;
  onFix: (values: Values) => void;
  open: boolean;
  stockItem: Partial<Values>;
  stockItems: string[];
}

const FixStockItemForm = ({
  onCancel,
  onFix,
  open,
  stockItem,
  stockItems,
}: FixStockItemImportItem) => {
  const [form] = Form.useForm<Values>();
  const intl = useIntl();

  useEffect(() => {
    if (open) {
      form.resetFields();
      form.setFieldsValue({
        ...stockItem,
        stockItem:
          stockItems.find((item) => item === stockItem.stockItem) || undefined,
      });
    }
  }, [open, stockItem, stockItems, form]);

  return (
    <Modal
      cancelText={intl.formatMessage({
        defaultMessage: 'Cancel',
      })}
      okText={intl.formatMessage({
        defaultMessage: 'Fix/Restore',
      })}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onFix(values);
          })
          .catch((error) => {
            console.log('Validate Failed:', error);
          });
      }}
      open={open}
      style={{ top: 20 }}
      width={1000}
    >
      <Form<Values>
        form={form}
        initialValues={{
          ...stockItem,
          stockItem:
            stockItems.find((item) => item === stockItem.stockItem) ||
            undefined,
        }}
        layout="vertical"
        name="form_in_modal"
        preserve={false}
      >
        <Row>
          <Col span={12}>
            <Typography.Title level={3}>
              {intl.formatMessage({
                defaultMessage: 'Original Values',
              })}
            </Typography.Title>
          </Col>
          <Col span={12}>
            <Typography.Title level={3}>
              {intl.formatMessage({
                defaultMessage: 'Fixed Values',
              })}
            </Typography.Title>
          </Col>
        </Row>
        {/* Barcode */}
        <Row>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Barcode',
              })}
            >
              {stockItem.barcode}
            </Form.Item>
          </Col>
          <Col span={12}>
            {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
            <Form.Item label=" " name="barcode">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        {/* Name */}
        <Row>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Name',
              })}
            >
              {stockItem.description}
            </Form.Item>
          </Col>
          <Col span={12}>
            {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
            <Form.Item label=" " name="description">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        {/* Size */}
        <Row>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Size',
              })}
            >
              {stockItem.itemSize}
            </Form.Item>
          </Col>
          <Col span={12}>
            {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
            <Form.Item label=" " name="itemSize">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        {/* Colour */}
        <Row>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Colour',
              })}
            >
              {stockItem.colour}
            </Form.Item>
          </Col>
          <Col span={12}>
            {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
            <Form.Item label=" " name="colour">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        {/* Variant */}
        <Row>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Variant',
              })}
            >
              {stockItem.variant}
            </Form.Item>
          </Col>
          <Col span={12}>
            {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
            <Form.Item label=" " name="variant">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        {/* Brand */}
        <Row>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Brand',
              })}
            >
              {stockItem.brand}
            </Form.Item>
          </Col>
          <Col span={12}>
            {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
            <Form.Item label=" " name="brand">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        {/* Item No. */}

        {/*   Stock Item */}
        <Row>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Stock Item',
              })}
            >
              {stockItem.stockItem}
            </Form.Item>
          </Col>
          <Col span={12}>
            {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
            <Form.Item label=" " name="stockItem">
              <Select options={stockItems.map((item) => ({ value: item }))} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default FixStockItemForm;
