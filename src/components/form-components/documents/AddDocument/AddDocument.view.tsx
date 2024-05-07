import React from 'react';
import type { SelectProps, UploadProps } from 'antd';
import { Button, Col, Form, Input, Row, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';
import useStyles from './AddDocument.styles';

interface OnSubmitValues {
  name: string;
  url: string;
  categories: string[];
}

interface Props {
  onSubmit: (values: OnSubmitValues) => void;
  saving: boolean;
  categories: SelectProps['options'];
  categoriesLoading: boolean;
  selectedCategories: { value: string }[];
  categoriesChange: (categories: { value: string }[]) => void;
  onClose: () => void;
  documentUploadProps: UploadProps;
  providedId: boolean;
}

const AddDocument = ({
  onSubmit,
  saving,
  selectedCategories,
  categories,
  categoriesChange,
  categoriesLoading,
  onClose,
  documentUploadProps,
  providedId,
}: Props) => {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Form<OnSubmitValues>
      initialValues={{
        name: '',
        url: '',
        categories: [],
      }}
      onFinish={onSubmit}
    >
      <Row gutter={16} style={{ marginLeft: 10, marginRight: 10 }}>
        <Col span={24}>
          <Form.Item
            name="name"
            label={intl.formatMessage({
              defaultMessage: 'Name',
              id: 'HAlOn1',
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage: 'Please input a name!',
                  id: '705XBo',
                }),
              },
            ]}
          >
            <Input
              placeholder={intl.formatMessage({
                defaultMessage: 'Name',
                id: 'HAlOn1',
              })}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginLeft: 10, marginRight: 10 }}>
        <Col span={24}>
          <Form.Item
            name="category"
            label={intl.formatMessage({
              defaultMessage: 'Category',
              id: 'ccXLVi',
            })}
          >
            <Select
              placeholder={intl.formatMessage({
                defaultMessage: 'Category',
                id: 'ccXLVi',
              })}
              mode="tags"
              size="small"
              maxTagCount={2}
              style={{ minWidth: 200 }}
              loading={categoriesLoading}
              onChange={categoriesChange}
              options={categories}
              optionFilterProp="value"
              labelInValue
              value={selectedCategories}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row className={classes.btn}>
        <Upload
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...documentUploadProps}
          listType="picture"
          style={{ display: 'flex' }}
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>
            {intl.formatMessage({
              defaultMessage: 'Upload Document',
              id: 'Kc9MAV',
            })}
          </Button>
        </Upload>
      </Row>
      <Form.Item>
        <Row style={{ marginTop: 30 }} gutter={10} justify="end">
          <Col>
            <Button disabled={saving} onClick={onClose}>
              {intl.formatMessage({
                defaultMessage: 'Cancel',
                id: '47FYwb',
              })}
            </Button>
          </Col>
          <Col>
            <Button
              loading={saving}
              disabled={saving}
              type="primary"
              htmlType="submit"
            >
              {providedId
                ? intl.formatMessage({
                    defaultMessage: 'Create Evidence',
                    id: '5RJkQZ',
                  })
                : intl.formatMessage({
                    defaultMessage: 'Create Document',
                    id: 'JxpaMx',
                  })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default AddDocument;
