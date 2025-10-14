import type { FormInstance, FormItemProps } from 'antd';

import { Button, Form, Row } from 'antd';
import { Grow } from 'components/layout-components/AntD';
import React, { useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';

interface Field extends FormItemProps {
  checkbox?: boolean;

  render(props: { disabled: boolean }): JSX.Element;
}

interface Props<T> {
  data?: T;
  fields: Field[];
  initialValues: T;
  loading?: boolean;
  onClose(): void;

  onSubmit(data: T): void;

  saving: boolean;
}

export const StandardForm = <T, >({
  data,
  fields,
  initialValues,
  loading,
  onClose,
  onSubmit,
  saving,
}: Props<T>) => {
  const formRef = useRef<FormInstance<T>>(null);

  const tailLayout = {
    wrapperCol: { span: 22 },
  };

  useEffect(() => {
    if (data) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      formRef.current?.setFieldsValue(data);
    }
  }, [data]);

  const handleClose = () => {
    formRef.current?.resetFields();
    onClose();
  };

  const handleSubmit = (inputData: T) => {
    onSubmit(inputData);
  };
  const intl = useIntl();
  return (
    <Form
      // @ts-ignore
      initialValues={initialValues}
      layout="vertical"
      name="basic"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onFinish={handleSubmit}
      onFinishFailed={() => {}}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      ref={formRef}
      style={{ display: 'flex', flex: 1, flexDirection: 'column' }}
    >
      {fields.map(({ checkbox, label, name, render, rules }) => (
        <Form.Item
          label={label}
          name={name}
          rules={rules}
          valuePropName={checkbox ? 'checked' : undefined}
        >
          {render({ disabled: loading || saving })}
        </Form.Item>
      ))}

      <Grow />

      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Form.Item {...tailLayout}>
        <Row justify="end">
          <Button
            disabled={loading || saving}
            onClick={handleClose}
            style={{ marginRight: 15 }}
            type="ghost"
          >
            {intl.formatMessage({
              defaultMessage: 'Cancel',
            })}
          </Button>
          <Button
            disabled={loading}
            htmlType="submit"
            loading={saving}
            type="primary"
          >
            {intl.formatMessage({
              defaultMessage: 'Submit',
            })}
          </Button>
        </Row>
      </Form.Item>
    </Form>
  );
};
export default StandardForm;
StandardForm.defaultProps = {
  data: undefined,
  loading: false,
};
