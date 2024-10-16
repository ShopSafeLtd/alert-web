import type { FormInstance } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import type { ListCrimeGroupsQuery } from 'graphql/crime-groups/queries/__generated__/list-crime-groups.generated';
import type { CustomGalleryData, Image, VehicleCardData } from 'types/DataType';

import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Drawer, Form, Input, Row, Select, Skeleton } from 'antd';
import AddCustomGallery from 'components/form-components/customGalleries/AddCustomGallery';
import UploadImage from 'components/images/UploadImage.view';
import React from 'react';
import { useIntl } from 'react-intl';

import type { FormData } from './useEditVehicle';

interface Props {
  CrimeGroupsData: ListCrimeGroupsQuery | undefined;
  CrimeGroupsLoading: boolean;
  addCustomGallery: boolean;
  adminRights: boolean;
  beforeUpload: (value: RcFile) => void;
  customGalleries: { label: string; value: string }[];
  customGalleriesLoading: boolean;
  editData: VehicleCardData | null | undefined;
  editImage: Image | null;
  fileList: Image[];
  form: FormInstance<FormData>;
  groups: { label: string; value: string }[];
  groupsLoading: boolean;
  imgChange: UploadProps['onChange'];
  onClose: () => void;
  onEditImage: (value: Image) => void;
  onRemoveImage: (imageId: string) => void;
  onSubmit: (value: FormData) => void;
  primaryImage: string;
  saving: boolean;
  setPrimaryImage: (value: string) => void;
  showGroups?: boolean;
  toggleAddCustomGallery: () => void;
  toggleEditImage: (value?: Image) => void;
  updateNewCustomGalleryData: (values: CustomGalleryData) => void;
}

const EditVehicle = ({
  CrimeGroupsData,
  CrimeGroupsLoading,
  addCustomGallery,
  adminRights,
  beforeUpload,
  customGalleries,
  customGalleriesLoading,
  editData,
  editImage,
  fileList,
  form,
  groupsLoading,
  imgChange,
  onClose,
  onEditImage,
  onRemoveImage,
  onSubmit,
  primaryImage,
  saving,
  setPrimaryImage,
  showGroups,
  toggleAddCustomGallery,
  toggleEditImage,
  updateNewCustomGalleryData,
}: Props): JSX.Element => {
  // const classes = useStyles();
  const intl = useIntl();
  return editData ? (
    <div>
      <Form<FormData>
        form={form}
        initialValues={{
          colour: editData.colour || '',
          crimeGroup:
            editData.crimeGroup && editData.crimeGroup.length > 0
              ? editData.crimeGroup.map((id) => id)
              : [],
          customGalleries:
            editData?.customGalleries && editData?.customGalleries.length > 0
              ? editData.customGalleries.map((id) => id)
              : [],
          groups:
            editData.groups && editData.groups.length > 0
              ? editData.groups.map((id) => id)
              : [],
          make: editData.make || '',
          model: editData.model || '',
          registration: editData.registration || '',
        }}
        layout="vertical"
        onFinish={onSubmit}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Make',
              })}
              name="make"
            >
              <Input disabled={saving} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Model',
              })}
              name="model"
            >
              <Input disabled={saving} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Colour',
              })}
              name="colour"
            >
              <Input disabled={saving} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Registration',
              })}
              name="registration"
            >
              <Input disabled={saving} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          {showGroups && (
            <Col span={12}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Groups',
                })}
                name="groups"
                rules={[
                  {
                    message: intl.formatMessage({
                      defaultMessage:
                        'Please select at least one group for the vehicle.',
                    }),
                    required: true,
                  },
                ]}
                tooltip={intl.formatMessage({
                  defaultMessage:
                    'Please select the relevant groups that you would like this vehicle to be visible to.',
                })}
              >
                <GroupsSelect
                  disabled={saving}
                  loading={groupsLoading}
                  maxTagCount={3}
                  mode="multiple"
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Select groups...',
                  })}
                />
              </Form.Item>
            </Col>
          )}
          {adminRights && (
            <Col span={12}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Crime Groups',
                })}
                name="crimeGroup"
              >
                <Select
                  disabled={saving}
                  filterOption
                  loading={CrimeGroupsLoading}
                  maxTagCount={3}
                  mode="multiple"
                  optionFilterProp="label"
                  options={CrimeGroupsData?.listCrimeGroups.crimeGroups.map(
                    (crimeGroup) => ({
                      label: intl.formatMessage(
                        {
                          defaultMessage: 'CG-{ref}',
                        },
                        {
                          ref: crimeGroup.reference,
                        }
                      ),
                      value: crimeGroup.id,
                    })
                  )}
                />
              </Form.Item>
            </Col>
          )}
        </Row>

        {showGroups && (
          <Row gutter={16}>
            <Col span={24}>
              <Row align="middle" gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label={intl.formatMessage({
                      defaultMessage: 'Custom Galleries',
                    })}
                    name="customGalleries"
                    tooltip={intl.formatMessage({
                      defaultMessage:
                        'Select any custom galleries that are relevant to this vehicle or add your own.',
                    })}
                  >
                    <Select
                      disabled={saving}
                      loading={customGalleriesLoading}
                      maxTagCount={3}
                      mode="multiple"
                      optionFilterProp="label"
                      // value={selectedItems}
                      // onChange={onSelectCustomGallery}
                    >
                      {customGalleries.map((el) => (
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
                      <FontAwesomeIcon
                        icon={faPlus}
                        style={{ marginRight: 5 }}
                      />
                    }
                    onClick={toggleAddCustomGallery}
                    style={{ color: 'red', padding: 8 }}
                  >
                    {intl.formatMessage({
                      defaultMessage: 'Add Custom Gallery',
                    })}
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        )}
        <UploadImage
          beforeUpload={beforeUpload}
          editImage={editImage}
          fileList={fileList}
          imgChange={imgChange}
          onEditImage={onEditImage}
          onRemoveImage={onRemoveImage}
          primaryImage={primaryImage}
          setPrimaryImage={setPrimaryImage}
          title={intl.formatMessage({
            defaultMessage: 'vehicle',
          })}
          toggleEditImage={toggleEditImage}
        />

        <Form.Item>
          <Row gutter={16} justify="end" style={{ marginTop: 30 }}>
            <Col>
              <Button disabled={saving} onClick={onClose}>
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
                {intl.formatMessage({ defaultMessage: 'Save' })}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>

      <Drawer
        onClose={toggleAddCustomGallery}
        open={addCustomGallery}
        title={intl.formatMessage({
          defaultMessage: 'Add Custom Gallery',
        })}
        width="400"
      >
        {addCustomGallery ? (
          <AddCustomGallery
            onClose={toggleAddCustomGallery}
            update={updateNewCustomGalleryData}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  ) : (
    <Skeleton />
  );
};

export default EditVehicle;
