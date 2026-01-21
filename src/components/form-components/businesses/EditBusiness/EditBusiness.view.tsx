import type { FormInstance } from 'antd';
import type { GroupSyncStrategy } from 'graphql/types';
import type { LocationData, TagData } from 'types/DataType';

import { CurrencyCodeMap } from '#/providers/SchemeProvider/SchemeProvider';
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
  Skeleton,
  Switch,
  Typography,
} from 'antd';
import DebounceSelect from 'components/form-components/DebounceSelect';
import AddTag from 'components/form-components/tags/AddTag';
import LocatingCard from 'components/map/LocatingCard';
import { Currency } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';

import type { OnSubmitValues } from './useEditBusiness';

import GroupSyncModal from './components/GroupSyncModal';

interface Props {
  addTag: boolean;
  brands: { label: string; value: string }[];
  brandsLoading: boolean;
  businessName: string;
  currency: Currency | null | undefined;
  form: FormInstance<OnSubmitValues>;
  groups: { label: string; value: string }[];
  groupsLoading: boolean;
  loading: boolean;
  location: LocationData | undefined;
  onClose: () => void;
  onSearchBusiness: (
    value: string
  ) => Promise<{ label: string; value: string }[]>;
  onSubmit: (values: OnSubmitValues) => void;
  onSyncCancel: () => void;
  onSyncConfirm: (strategy: GroupSyncStrategy) => void;
  saving: boolean;
  setLocation: (value: LocationData) => void;
  showSyncModal: boolean;
  tags: { label: string; value: string }[];
  tagsLoading: boolean;
  toggleAddTag: () => void;
  updateNewTagData: (values: TagData) => void;
}

const EditBusiness = ({
  addTag,
  brands,
  brandsLoading,
  businessName,
  currency: _currency,
  form,
  groups,
  groupsLoading,
  loading,
  location,
  onClose,
  onSearchBusiness,
  onSubmit,
  onSyncCancel,
  onSyncConfirm,
  saving,
  setLocation,
  showSyncModal,
  tags,
  tagsLoading,
  toggleAddTag,
  updateNewTagData,
}: Props) => {
  const intl = useIntl();

  return (
    <Form<OnSubmitValues> form={form} layout="vertical" onFinish={onSubmit}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Business Name',
            })}
            name="name"
            rules={[{ required: true }]}
          >
            {loading ? <Skeleton.Input /> : <Input disabled={saving} />}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Site Number',
            })}
            name="siteNumber"
          >
            {loading ? <Skeleton.Input /> : <Input disabled={saving} />}
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
            {loading ? (
              <Skeleton.Input />
            ) : (
              <DebounceSelect
                allowClear
                disabled={saving}
                fetchOptions={onSearchBusiness}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Search for a business...',
                })}
                showSearch
                // style={{ width: 400 }}
              />
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={18}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Brands',
            })}
            name="brands"
            tooltip={intl.formatMessage({
              defaultMessage:
                'select the brands that are relevant to this shop.',
            })}
          >
            <Select
              disabled={saving}
              loading={brandsLoading}
              maxTagCount={3}
              mode="multiple"
              optionFilterProp="label"
            >
              {brands.map((el) => (
                <Select.Option label={el.label} value={el.value}>
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
            label={intl.formatMessage({
              defaultMessage: 'Currency',
            })}
            name="currency"
          >
            <Select
              allowClear
              disabled={saving}
              optionFilterProp="label"
              placeholder={intl.formatMessage({
                defaultMessage: 'Select Currency',
              })}
              showSearch
            >
              {Object.values(Currency).map((curr) => (
                <Select.Option
                  key={curr}
                  label={CurrencyCodeMap[curr]}
                  value={curr}
                >
                  {CurrencyCodeMap[curr]}
                </Select.Option>
              ))}
            </Select>
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
                    'Please select at least one group for this shop.',
                }),
                required: true,
              },
            ]}
            tooltip={intl.formatMessage({
              defaultMessage:
                'select the content groups that are relevant to this shop.',
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
                <Select.Option label={el.label} value={el.value}>
                  {el.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Row align="middle" gutter={16}>
            <Col span={18}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Tags',
                })}
                name="tags"
                tooltip={intl.formatMessage({
                  defaultMessage:
                    'select of any tags that are relevant to this shop or add your own.',
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
                    <Select.Option label={el.label} value={el.value}>
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
            {loading ? (
              <Skeleton.Input />
            ) : (
              <Input disabled={saving} style={{ width: 200 }} />
            )}
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
            {loading ? (
              <Skeleton.Input />
            ) : (
              <Input disabled={saving} style={{ width: 200 }} />
            )}
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
            {loading ? (
              <Skeleton.Input />
            ) : (
              <Input disabled={saving} style={{ width: 200 }} />
            )}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'County',
            })}
            name="county"
          >
            {loading ? (
              <Skeleton.Input />
            ) : (
              <Input disabled={saving} style={{ width: 200 }} />
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Postcode',
            })}
            name="postcode"
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
                defaultMessage: 'Save Business',
              })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
      <GroupSyncModal
        businessName={businessName}
        onCancel={onSyncCancel}
        onConfirm={onSyncConfirm}
        visible={showSyncModal}
      />
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

export default EditBusiness;
