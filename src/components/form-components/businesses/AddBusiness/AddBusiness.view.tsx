import type { FormInstance } from 'antd';
import type { LocationData, TagData } from 'types/DataType';

import BusinessesSelect from '#/components/form-components/BusinessesSelect/BusinessesSelect.view';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import AddTag from 'components/form-components/tags/AddTag';
import LocatingCard from 'components/map/LocatingCard';
import React from 'react';
import { useIntl } from 'react-intl';

import type { FormData } from './useAddBusiness';

import { countriesOptions } from '../../../../constants/countriesOptions';

interface Props {
  addTag: boolean;
  form: FormInstance<FormData>;

  groups: { label: string; value: string }[];
  groupsLoading: boolean;
  location: LocationData | undefined;
  onClose: () => void;
  onSubmit: (values: FormData) => void;
  saving: boolean;
  setLocation: (value: LocationData) => void;
  tags: { label: string; value: string }[];
  tagsLoading: boolean;
  toggleAddTag: () => void;
  updateNewTagData: (values: TagData) => void;
}

const AddBusiness = ({
  addTag,
  form,
  groups,
  groupsLoading,
  location,
  onClose,
  onSubmit,
  saving,
  setLocation,
  tags,
  tagsLoading,
  toggleAddTag,
  updateNewTagData,
}: Props) => {
  const intl = useIntl();

  return (
    <Form<FormData>
      form={form}
      initialValues={{ publicName: true }}
      layout="vertical"
      onFinish={onSubmit}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Business Name',
            })}
            name="name"
            rules={[{ required: true }]}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Site Number',
            })}
            name="siteNumber"
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
        style={{
          flexDirection: 'row',
          justifyItems: 'center',
          marginBottom: 0,
        }}
        valuePropName="checked"
      >
        <Switch
          className="scheme-detail-switch"
          disabled={saving}
          style={{ marginLeft: 10, marginTop: -22 }}
        />
      </Form.Item>
      <Row gutter={16}>
        <Col span={18}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Parent Business',
            })}
            name="parent"
          >
            <BusinessesSelect
              allowClear
              disabled={saving}
              placeholder={intl.formatMessage({
                defaultMessage: 'Search for a business...',
              })}
              showSearch
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={18}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Content Groups',
            })}
            name="groups"
            rules={[
              {
                message: intl.formatMessage({
                  defaultMessage:
                    'Please select at least one group for the shop.',
                }),
                required: true,
              },
            ]}
            tooltip={intl.formatMessage({
              defaultMessage:
                'select the content groups that are relevant to the new shop.',
            })}
          >
            <Select
              disabled={saving}
              loading={groupsLoading}
              maxTagCount={3}
              mode="multiple"
              optionFilterProp="label"
            >
              {groups.map((el) => (
                <Select.Option key={el.value} label={el.label} value={el.value}>
                  {el.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={18}>
          <Row align="middle" gutter={16}>
            <Col span={18}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Tags',
                })}
                name="tags"
                tooltip={intl.formatMessage({
                  defaultMessage:
                    'select of any tags that are relevant to the new shop or add your own.',
                })}
              >
                <Select
                  disabled={saving}
                  loading={tagsLoading}
                  maxTagCount={3}
                  mode="multiple"
                  optionFilterProp="label"
                  // value={selectedItems}
                  // onChange={onSelectCustomGallery}
                >
                  {tags.map((el) => (
                    <Select.Option
                      key={el.value}
                      label={el.label}
                      value={el.value}
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
                icon={
                  <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
                }
                onClick={toggleAddTag}
                style={{ color: 'red', padding: 8 }}
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
        height={194}
        location={location}
        setLocation={setLocation}
        width="100%"
      />
      <Row gutter={16} style={{ marginTop: 10 }}>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Building',
            })}
            name="building"
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Street',
            })}
            name="street"
            // rules={[{ required: true }]}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Town/City',
            })}
            name="townCity"
            // rules={[{ required: true }]}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'County',
            })}
            name="county"
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Postcode',
            })}
            name="postcode"
            // rules={[{ required: true }]}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Country',
            })}
            name="country"
          >
            <Select
              allowClear
              disabled={saving}
              optionFilterProp="label"
              options={countriesOptions}
              placeholder={intl.formatMessage({
                defaultMessage: 'Select Country',
              })}
              showSearch
            />
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
              disabled={saving}
              htmlType="submit"
              loading={saving}
              type="primary"
            >
              {intl.formatMessage({
                defaultMessage: 'Create Business',
              })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
      <Drawer
        onClose={toggleAddTag}
        open={addTag}
        title={intl.formatMessage({
          defaultMessage: 'Add Business Tag',
        })}
        width="600"
      >
        <AddTag
          description={intl.formatMessage({
            defaultMessage: 'Tags are added to sort shops.',
          })}
          onClose={toggleAddTag}
          update={updateNewTagData}
        />
      </Drawer>
    </Form>
  );
};

export default AddBusiness;
