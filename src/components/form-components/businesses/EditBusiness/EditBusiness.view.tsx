import React from 'react';
import type { FormInstance } from 'antd';
import {
  Drawer,
  Select,
  Button,
  Col,
  Form,
  Input,
  Row,
  Skeleton,
  Switch,
  Typography,
} from 'antd';
import DebounceSelect from 'components/form-components/DebounceSelect';
import { useIntl } from 'react-intl';
import LocatingCard from 'components/map/LocatingCard';
import type { LocationData, TagData } from 'types/DataType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import AddTag from 'components/form-components/tags/AddTag';
import type { OnSubmitValues } from './useEditBusiness';

interface Props {
  onSubmit: (values: OnSubmitValues) => void;
  onClose: () => void;
  onSearchBusiness: (
    value: string
  ) => Promise<{ label: string; value: string }[]>;
  saving: boolean;
  loading: boolean;
  form: FormInstance<OnSubmitValues>;
  location: LocationData | undefined;
  setLocation: (value: LocationData) => void;
  tags: { value: string; label: string }[];
  tagsLoading: boolean;
  addTag: boolean;
  toggleAddTag: () => void;
  updateNewTagData: (values: TagData) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  brands: { value: string; label: string }[];
  brandsLoading: boolean;
}

const EditBusiness = ({
  onSubmit,
  onClose,
  onSearchBusiness,
  saving,
  form,
  loading,
  location,
  setLocation,
  tagsLoading,
  tags,
  addTag,
  toggleAddTag,
  updateNewTagData,
  groups,
  groupsLoading,
  brandsLoading,
  brands,
}: Props) => {
  const intl = useIntl();

  return (
    <Form<OnSubmitValues> layout="vertical" onFinish={onSubmit} form={form}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label={intl.formatMessage({
              defaultMessage: 'Business Name',
              id: 'pGwRxT',
            })}
            rules={[{ required: true }]}
          >
            {loading ? <Skeleton.Input /> : <Input disabled={saving} />}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="siteNumber"
            label={intl.formatMessage({
              defaultMessage: 'Site Number',
              id: 'rAGVXn',
            })}
          >
            {loading ? <Skeleton.Input /> : <Input disabled={saving} />}
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label={intl.formatMessage({
          defaultMessage: 'Show business name in the system',
          id: 'yuNoZz',
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
              id: 'Av/UtY',
            })}
          >
            {loading ? (
              <Skeleton.Input />
            ) : (
              <DebounceSelect
                showSearch
                allowClear
                disabled={saving}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Search for a business...',
                  id: 'qaJxSS',
                })}
                fetchOptions={onSearchBusiness}
                // style={{ width: 400 }}
              />
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={18}>
          <Form.Item
            name="brands"
            label={intl.formatMessage({
              defaultMessage: 'Brands',
              id: 'jWfWEA',
            })}
            tooltip={intl.formatMessage({
              defaultMessage:
                'select the brands that are relevant to this shop.',
              id: 'rs0Bek',
            })}
          >
            <Select
              loading={brandsLoading}
              disabled={saving}
              mode="multiple"
              maxTagCount={3}
              optionFilterProp="label"
            >
              {brands.map((el) => (
                <Select.Option value={el.value} label={el.label}>
                  {el.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={18}>
          <Form.Item
            name="groups"
            label={intl.formatMessage({
              defaultMessage: 'Content Groups',
              id: '3lRewT',
            })}
            tooltip={intl.formatMessage({
              defaultMessage:
                'select the content groups that are relevant to this shop.',
              id: 'iKCl0b',
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
                <Select.Option value={el.value} label={el.label}>
                  {el.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Row gutter={16} align="middle">
            <Col span={18}>
              <Form.Item
                name="tags"
                label={intl.formatMessage({
                  defaultMessage: 'Tags',
                  id: '1EYCdR',
                })}
                tooltip={intl.formatMessage({
                  defaultMessage:
                    'select of any tags that are relevant to this shop or add your own.',
                  id: 'EdSN+T',
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
                    <Select.Option value={el.value} label={el.label}>
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
                  id: 'GUW//c',
                })}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Typography.Text style={{ fontSize: 16, fontWeight: 500 }}>
        {intl.formatMessage({ defaultMessage: 'Location', id: 'rvirM2' })}
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
              id: 'oS/nae',
            })}
          >
            {loading ? (
              <Skeleton.Input />
            ) : (
              <Input style={{ width: 200 }} disabled={saving} />
            )}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="street"
            label={intl.formatMessage({
              defaultMessage: 'Street',
              id: 'BaIwdV',
            })}
            // rules={[{ required: true }]}
          >
            {loading ? (
              <Skeleton.Input />
            ) : (
              <Input style={{ width: 200 }} disabled={saving} />
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="townCity"
            label={intl.formatMessage({
              defaultMessage: 'Town/City',
              id: 'byaTQZ',
            })}
            // rules={[{ required: true }]}
          >
            {loading ? (
              <Skeleton.Input />
            ) : (
              <Input style={{ width: 200 }} disabled={saving} />
            )}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="county"
            label={intl.formatMessage({
              defaultMessage: 'County',
              id: 'B+KJhc',
            })}
          >
            {loading ? (
              <Skeleton.Input />
            ) : (
              <Input style={{ width: 200 }} disabled={saving} />
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item
            name="postcode"
            label={intl.formatMessage({
              defaultMessage: 'Postcode',
              id: 'FJhjgz',
            })}
            // rules={[{ required: true }]}
          >
            {loading ? <Skeleton.Input /> : <Input disabled={saving} />}
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Row gutter={16} justify="end">
          <Col>
            <Button onClick={onClose}>
              {intl.formatMessage({ defaultMessage: 'Cancel', id: '47FYwb' })}
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
                defaultMessage: 'Save Business',
                id: 'Dk/kmv',
              })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add Business Tag',
          id: 'frQeQr',
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
            id: 'M1v6uH',
          })}
        />
      </Drawer>
    </Form>
  );
};

export default EditBusiness;
