import type { SelectProps } from 'antd';

import { Button, Card, Col, Drawer, Form, Input, Row, Select } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import LinkDem from '../ImportEvidence';

interface OnSubmitValues {
  categories: string[];
  name: string;
  url: string;
}

interface Props {
  categories: SelectProps['options'];
  categoriesChange: (categories: { value: string }[]) => void;
  categoriesLoading: boolean;
  onClose: () => void;
  onSubmit: (values: OnSubmitValues) => void;
  saving: boolean;
  searchEvidence: boolean;
  selectEvidence: (evidence: { url: string }) => void;
  selectedCategories: { value: string }[];
  selectedEvidence: {
    url: string;
  } | null;
  toggleSearchEvidence: () => void;
}

const AddBusiness = ({
  categories,
  categoriesChange,
  categoriesLoading,
  onClose,
  onSubmit,
  saving,
  searchEvidence,
  selectEvidence,
  selectedCategories,
  selectedEvidence,
  toggleSearchEvidence,
}: Props) => {
  const intl = useIntl();

  return (
    <Card style={{ marginLeft: 20, marginRight: 20 }}>
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
        <Row style={{ marginLeft: 20, marginTop: 20 }}>
          <Col>
            {selectedEvidence && selectedEvidence.url && (
              <a href={selectedEvidence.url} rel="noreferrer" target="_blank">
                {selectedEvidence.url}
              </a>
            )}
            <Button
              onClick={toggleSearchEvidence}
              style={{ marginLeft: '10px' }}
            >
              {intl.formatMessage({
                defaultMessage: 'Search Evidence',
              })}
            </Button>
          </Col>
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
                {intl.formatMessage({
                  defaultMessage: 'Create Evidence',
                })}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
      <Drawer
        onClose={toggleSearchEvidence}
        open={searchEvidence}
        title={intl.formatMessage({
          defaultMessage: 'Add DEM Evidence',
        })}
        width="800"
        zIndex={1011}
      >
        {searchEvidence ? (
          <LinkDem
            onClose={toggleSearchEvidence}
            selectEvidence={selectEvidence}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </Card>
  );
};

export default AddBusiness;
