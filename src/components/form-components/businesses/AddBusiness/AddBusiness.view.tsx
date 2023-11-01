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
  Switch,
  Typography,
} from 'antd';
import DebounceSelect from 'components/form-components/DebounceSelect';
import { useIntl } from 'react-intl';
import type { LocationData, TagData } from 'types/DataType';
import LocatingCard from 'components/map/LocatingCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import AddTag from 'components/form-components/tags/AddTag';
import type { FormData } from './useAddBusiness';

interface Props {
  onSubmit: (values: FormData) => void;
  onClose: () => void;
  onSearchBusiness: (
    value: string
  ) => Promise<{ label: string; value: string }[]>;
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
  onSearchBusiness,
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
        <Col span={19}>
          <Form.Item
            name="name"
            label={intl.formatMessage({
              defaultMessage: 'Business Name',
              id: 'pGwRxT',
            })}
            rules={[{ required: true }]}
          >
            <Input disabled={saving} />
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
        <Col span={19}>
          <Form.Item
            name="parent"
            label={intl.formatMessage({
              defaultMessage: 'Parent Business',
              id: 'Av/UtY',
            })}
          >
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
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={19}>
          <Form.Item
            name="groups"
            label={intl.formatMessage({
              defaultMessage: 'Content Groups',
              id: '3lRewT',
            })}
            tooltip={intl.formatMessage({
              defaultMessage:
                'select the content groups that are relevant to the new shop.',
              id: 'OW/Jxq',
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
            <Col span={19}>
              <Form.Item
                name="tags"
                label={intl.formatMessage({
                  defaultMessage: 'Tags',
                  id: '1EYCdR',
                })}
                tooltip={intl.formatMessage({
                  defaultMessage:
                    'select of any tags that are relevant to the new shop or add your own.',
                  id: '2daQQ8',
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
            <Input disabled={saving} />
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
              id: 'byaTQZ',
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
              id: 'B+KJhc',
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
              id: 'FJhjgz',
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
                defaultMessage: 'Create Business',
                id: 'a1axpo',
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
        visible={addTag}
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

export default AddBusiness;
