import React from 'react'
import { Input, InputNumber, Form, InputNumberProps } from 'antd'

interface EditableCellProps<T> extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: T;
  index: number;
  children: React.ReactNode;
  formatter?: InputNumberProps['formatter']
}

type EditableCellType<T = any> = React.FC<EditableCellProps<T>>

export const EditableCell: EditableCellType = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  formatter,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber formatter={formatter} /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};