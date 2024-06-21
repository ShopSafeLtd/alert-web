import React from 'react';
import type { FormInstance } from 'antd';
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Switch,
  Typography,
} from 'antd';

import { useIntl } from 'react-intl';
import type { LocationData, TagData } from 'types/DataType';
import LocatingCard from 'components/map/LocatingCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import AddTag from 'components/form-components/tags/AddTag';
import type { FormData } from './useAddBusiness';
import BusinessesSelect from '#/components/form-components/BusinessesSelect/BusinessesSelect.view';

interface Props {
  onSubmit: (values: FormData) => void;
  onClose: () => void;

  saving: boolean;
  form: FormInstance<FormData>;
  location: LocationData | undefined;
  setLocation: (value: LocationData) => void;
  tags: { value: string; label: string }[];
  tagsLoading: boolean;
  addTag: boolean;
  toggleAddTag: () => void;
  updateNewTagData: (values: TagData) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
}

const AddBusiness = ({
  onSubmit,
  onClose,
  saving,
  form,
  location,
  setLocation,
  tagsLoading,
  tags,
  addTag,
  toggleAddTag,
  updateNewTagData,
  groups,
  groupsLoading,
}: Props) => {
  const intl = useIntl();

  return (
    <Form<FormData>
      layout="vertical"
      onFinish={onSubmit}
      initialValues={{ publicName: true }}
      form={form}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label={intl.formatMessage({
              defaultMessage: 'Business Name',
            })}
            rules={[{ required: true }]}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="siteNumber"
            label={intl.formatMessage({
              defaultMessage: 'Site Number',
            })}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label={intl.formatMessage({
          defaultMessage: 'Show business name in the system',
        })}
        name="publicName"
        valuePropName="checked"
        style={{
          marginBottom: 0,
          flexDirection: 'row',
          justifyItems: 'center',
        }}
      >
        <Switch
          disabled={saving}
          style={{ marginLeft: 10, marginTop: -22 }}
          className="scheme-detail-switch"
        />
      </Form.Item>
      <Row gutter={16}>
        <Col span={18}>
          <Form.Item
            name="parent"
            label={intl.formatMessage({
              defaultMessage: 'Parent Business',
            })}
          >
            <BusinessesSelect
              showSearch
              allowClear
              disabled={saving}
              placeholder={intl.formatMessage({
                defaultMessage: 'Search for a business...',
              })}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={18}>
          <Form.Item
            name="groups"
            label={intl.formatMessage({
              defaultMessage: 'Content Groups',
            })}
            tooltip={intl.formatMessage({
              defaultMessage:
                'select the content groups that are relevant to the new shop.',
            })}
          >
            <Select
              loading={groupsLoading}
              disabled={saving}
              mode="multiple"
              maxTagCount={3}
              optionFilterProp="label"
            >
              {groups.map((el) => (
                <Select.Option value={el.value} label={el.label} key={el.value}>
                  {el.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={18}>
          <Row gutter={16} align="middle">
            <Col span={18}>
              <Form.Item
                name="tags"
                label={intl.formatMessage({
                  defaultMessage: 'Tags',
                })}
                tooltip={intl.formatMessage({
                  defaultMessage:
                    'select of any tags that are relevant to the new shop or add your own.',
                })}
              >
                <Select
                  loading={tagsLoading}
                  disabled={saving}
                  mode="multiple"
                  maxTagCount={3}
                  optionFilterProp="label"
                  // value={selectedItems}
                  // onChange={onSelectCustomGallery}
                >
                  {tags.map((el) => (
                    <Select.Option
                      value={el.value}
                      label={el.label}
                      key={el.value}
                    >
                      {el.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col>
              <Button
                disabled={saving}
                style={{ color: 'red', padding: 8 }}
                onClick={toggleAddTag}
                icon={
                  <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
                }
              >
                {intl.formatMessage({
                  defaultMessage: 'Add Tag',
                })}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      <Typography.Text style={{ fontSize: 16, fontWeight: 500 }}>
        {intl.formatMessage({ defaultMessage: 'Location' })}
      </Typography.Text>
      <LocatingCard
        width="100%"
        height={194}
        location={location}
        setLocation={setLocation}
      />
      <Row style={{ marginTop: 10 }} gutter={16}>
        <Col span={12}>
          <Form.Item
            name="building"
            label={intl.formatMessage({
              defaultMessage: 'Building',
            })}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="street"
            label={intl.formatMessage({
              defaultMessage: 'Street',
            })}
            // rules={[{ required: true }]}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="townCity"
            label={intl.formatMessage({
              defaultMessage: 'Town/City',
            })}
            // rules={[{ required: true }]}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="county"
            label={intl.formatMessage({
              defaultMessage: 'County',
            })}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item
            name="postcode"
            label={intl.formatMessage({
              defaultMessage: 'Postcode',
            })}
            // rules={[{ required: true }]}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Row gutter={16} justify="end">
          <Col>
            <Button onClick={onClose}>
              {intl.formatMessage({ defaultMessage: 'Cancel' })}
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
                defaultMessage: 'Create Business',
              })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add Business Tag',
        })}
        open={addTag}
        width="600"
        onClose={toggleAddTag}
      >
        <AddTag
          update={updateNewTagData}
          onClose={toggleAddTag}
          description={intl.formatMessage({
            defaultMessage: 'Tags are added to sort shops.',
          })}
        />
      </Drawer>
    </Form>
  );
};

export default AddBusiness;
