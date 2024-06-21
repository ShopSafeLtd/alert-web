import React from 'react';
import type { SelectProps } from 'antd';
import { Button, Card, Col, Drawer, Form, Input, Row, Select } from 'antd';
import { useIntl } from 'react-intl';
import LinkDem from '../ImportEvidence';

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
  toggleSearchEvidence: () => void;
  searchEvidence: boolean;
  selectedEvidence: {
    url: string;
  } | null;
  selectEvidence: (evidence: { url: string }) => void;
}

const AddBusiness = ({
  onSubmit,
  saving,
  selectedCategories,
  categories,
  categoriesChange,
  categoriesLoading,
  onClose,
  toggleSearchEvidence,
  selectedEvidence,
  searchEvidence,
  selectEvidence,
}: Props) => {
  const intl = useIntl();

  return (
    <Card style={{ marginLeft: 20, marginRight: 20 }}>
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
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    defaultMessage: 'Please input a name!',
                  }),
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
              name="category"
              label={intl.formatMessage({
                defaultMessage: 'Category',
              })}
            >
              <Select
                placeholder={intl.formatMessage({
                  defaultMessage: 'Category',
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
        <Row style={{ marginLeft: 20, marginTop: 20 }}>
          <Col>
            {selectedEvidence && selectedEvidence.url && (
              <a href={selectedEvidence.url} target="_blank" rel="noreferrer">
                {selectedEvidence.url}
              </a>
            )}
            <Button
              style={{ marginLeft: '10px' }}
              onClick={toggleSearchEvidence}
            >
              {intl.formatMessage({
                defaultMessage: 'Search Evidence',
              })}
            </Button>
          </Col>
        </Row>
        <Form.Item>
          <Row style={{ marginTop: 30 }} gutter={10} justify="end">
            <Col>
              <Button disabled={saving} onClick={onClose}>
                {intl.formatMessage({
                  defaultMessage: 'Cancel',
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
                {intl.formatMessage({
                  defaultMessage: 'Create Evidence',
                })}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add DEM Evidence',
        })}
        open={searchEvidence}
        width="800"
        onClose={toggleSearchEvidence}
        zIndex={1011}
      >
        {searchEvidence ? (
          <LinkDem
            selectEvidence={selectEvidence}
            onClose={toggleSearchEvidence}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </Card>
  );
};

export default AddBusiness;
