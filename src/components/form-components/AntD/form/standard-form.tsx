import React, { useEffect, useRef } from 'react';
import { Button, Form, FormInstance, FormItemProps, Row } from 'antd';
import { Grow } from 'components/layout-components/AntD';

interface Field extends FormItemProps {
  checkbox?: boolean;

  render(props: { disabled: boolean }): JSX.Element;
}

interface Props<T> {
  loading?: boolean;
  saving: boolean;
  data?: T;
  initialValues: T;
  fields: Field[];

  onClose(): void;

  onSubmit(data: T): void;
}

export const StandardForm = <T,>({
  onClose,
  onSubmit,
  loading,
  saving,
  data,
  initialValues,
  fields,
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

  const handleSubmit = async (inputData: T) => {
    onSubmit(inputData);
  };

  return (
    <Form
      name="basic"
      onFinish={handleSubmit}
      onFinishFailed={() => {}}
      ref={formRef}
      style={{ display: 'flex', flexDirection: 'column', flex: 1 }}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      initialValues={initialValues}
      layout="vertical"
    >
      {fields.map(({ render, name, label, rules, checkbox }) => (
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
            type="ghost"
            onClick={handleClose}
            style={{ marginRight: 15 }}
            disabled={loading || saving}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={saving}
            disabled={loading}
          >
            Submit
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
