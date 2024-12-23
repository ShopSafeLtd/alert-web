import type { SelectProps, UploadProps } from 'antd';

import { UploadOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select, Upload } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import useStyles from './AddDocument.styles';

interface OnSubmitValues {
  categories: string[];
  name: string;
  url: string;
}

interface Props {
  categories: SelectProps['options'];
  categoriesChange: (categories: { value: string }[]) => void;
  categoriesLoading: boolean;
  documentUploadProps: UploadProps;
  onClose: () => void;
  onSubmit: (values: OnSubmitValues) => void;
  providedId: boolean;
  saving: boolean;
  selectedCategories: { value: string }[];
}

const AddDocument = ({
  categories,
  categoriesChange,
  categoriesLoading,
  documentUploadProps,
  onClose,
  onSubmit,
  providedId,
  saving,
  selectedCategories,
}: Props) => {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Form<OnSubmitValues>
      initialValues={{
        categories: [],
        name: '',
        url: '',
      }}
      onFinish={onSubmit}
    >
      <Row gutter={16} style={{ marginLeft: 10, marginRight: 10 }}>
        <Col span={24}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Name',
            })}
            name="name"
            rules={[
              {
                message: intl.formatMessage({
                  defaultMessage: 'Please input a name!',
                }),
                required: true,
              },
            ]}
          >
            <Input
              placeholder={intl.formatMessage({
                defaultMessage: 'Name',
              })}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginLeft: 10, marginRight: 10 }}>
        <Col span={24}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Category',
            })}
            name="category"
          >
            <Select
              labelInValue
              loading={categoriesLoading}
              maxTagCount={2}
              mode="tags"
              onChange={categoriesChange}
              optionFilterProp="value"
              options={categories}
              placeholder={intl.formatMessage({
                defaultMessage: 'Category',
              })}
              size="small"
              style={{ minWidth: 200 }}
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
          maxCount={1}
          style={{ display: 'flex' }}
        >
          <Button icon={<UploadOutlined />}>
            {intl.formatMessage({
              defaultMessage: 'Upload Document',
            })}
          </Button>
        </Upload>
      </Row>
      <Form.Item>
        <Row gutter={10} justify="end" style={{ marginTop: 30 }}>
          <Col>
            <Button disabled={saving} onClick={onClose}>
              {intl.formatMessage({
                defaultMessage: 'Cancel',
              })}
            </Button>
          </Col>
          <Col>
            <Button
              disabled={saving}
              htmlType="submit"
              loading={saving}
              type="primary"
            >
              {providedId
                ? intl.formatMessage({
                    defaultMessage: 'Create Evidence',
                  })
                : intl.formatMessage({
                    defaultMessage: 'Create Document',
                  })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default AddDocument;
