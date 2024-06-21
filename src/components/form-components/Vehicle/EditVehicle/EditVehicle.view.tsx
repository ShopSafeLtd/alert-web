import React from 'react';
import type { FormInstance } from 'antd';
import { Button, Col, Drawer, Form, Input, Row, Select, Skeleton } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-light-svg-icons';

import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import type { CustomGalleryData, Image, VehicleCardData } from 'types/DataType';
import UploadImage from 'components/images/UploadImage.view';
import AddCustomGallery from 'components/form-components/customGalleries/AddCustomGallery';
import { useIntl } from 'react-intl';
// import useStyles from './EditVehicle.styles';
import type { FormData } from './useEditVehicle';
import type { ListCrimeGroupsQuery } from 'graphql/crime-groups/queries/list-crime-groups.generated';

interface Props {
  onClose: () => void;
  editData: VehicleCardData | undefined | null;
  onSubmit: (value: FormData) => void;
  CrimeGroupsData: ListCrimeGroupsQuery | undefined;
  CrimeGroupsLoading: boolean;
  saving: boolean;
  adminRights: boolean;
  imgChange: UploadProps['onChange'];
  beforeUpload: (value: RcFile) => void;
  fileList: Image[];
  primaryImage: string;
  setPrimaryImage: (value: string) => void;
  editImage: Image | null;
  onEditImage: (value: Image) => void;
  onRemoveImage: (imageId: string) => void;
  toggleEditImage: (value?: Image) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  showGroups?: boolean;
  customGalleries: { value: string; label: string }[];
  customGalleriesLoading: boolean;
  addCustomGallery: boolean;
  toggleAddCustomGallery: () => void;
  updateNewCustomGalleryData: (values: CustomGalleryData) => void;
  form: FormInstance<FormData>;
}

const EditVehicle = ({
  onClose,
  onSubmit,
  editData,
  CrimeGroupsData,
  CrimeGroupsLoading,
  saving,
  adminRights,
  imgChange,
  beforeUpload,
  fileList,
  onRemoveImage,
  onEditImage,
  toggleEditImage,
  editImage,
  primaryImage,
  setPrimaryImage,
  groups,
  groupsLoading,
  showGroups,
  customGalleries,
  customGalleriesLoading,
  addCustomGallery,
  toggleAddCustomGallery,
  updateNewCustomGalleryData,
  form,
}: Props): JSX.Element => {
  // const classes = useStyles();
  const intl = useIntl();
  return editData ? (
    <div>
      <Form<FormData>
        initialValues={{
          make: editData.make || '',
          model: editData.model || '',
          colour: editData.colour || '',
          registration: editData.registration || '',
          groups:
            editData.groups && editData.groups.length > 0
              ? editData.groups.map((id) => id)
              : [],
          crimeGroup:
            editData.crimeGroup && editData.crimeGroup.length > 0
              ? editData.crimeGroup.map((id) => id)
              : [],
          customGalleries:
            editData?.customGalleries && editData?.customGalleries.length > 0
              ? editData.customGalleries.map((id) => id)
              : [],
        }}
        layout="vertical"
        onFinish={onSubmit}
        form={form}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="make"
              label={intl.formatMessage({
                defaultMessage: 'Make',
              })}
            >
              <Input disabled={saving} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="model"
              label={intl.formatMessage({
                defaultMessage: 'Model',
              })}
            >
              <Input disabled={saving} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="colour"
              label={intl.formatMessage({
                defaultMessage: 'Colour',
              })}
            >
              <Input disabled={saving} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="registration"
              label={intl.formatMessage({
                defaultMessage: 'Registration',
              })}
            >
              <Input disabled={saving} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          {showGroups && (
            <Col span={12}>
              <Form.Item
                name="groups"
                label={intl.formatMessage({
                  defaultMessage: 'Groups',
                })}
                tooltip={intl.formatMessage({
                  defaultMessage:
                    'Please select the relevant groups that you would like this vehicle to be visible to.',
                })}
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      defaultMessage:
                        'Please select at least one group for the vehicle.',
                    }),
                  },
                ]}
              >
                <Select
                  loading={groupsLoading}
                  disabled={saving}
                  mode="multiple"
                  maxTagCount={3}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Select groups...',
                  })}
                >
                  {groups.map((group) => (
                    <Select.Option key={group.value} value={group.value}>
                      {group.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          )}
          {adminRights && (
            <Col span={12}>
              <Form.Item
                name="crimeGroup"
                label={intl.formatMessage({
                  defaultMessage: 'Crime Groups',
                })}
              >
                <Select
                  loading={CrimeGroupsLoading}
                  disabled={saving}
                  mode="multiple"
                  maxTagCount={3}
                  filterOption
                  optionFilterProp="label"
                  options={CrimeGroupsData?.listCrimeGroups.crimeGroups.map(
                    (crimeGroup) => ({
                      value: crimeGroup.id,
                      label: intl.formatMessage(
                        {
                          defaultMessage: 'CG-{ref}',
                        },
                        {
                          ref: crimeGroup.reference,
                        }
                      ),
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
              <Row gutter={16} align="middle">
                <Col span={12}>
                  <Form.Item
                    name="customGalleries"
                    label={intl.formatMessage({
                      defaultMessage: 'Custom Galleries',
                    })}
                    tooltip={intl.formatMessage({
                      defaultMessage:
                        'Select any custom galleries that are relevant to this vehicle or add your own.',
                    })}
                  >
                    <Select
                      loading={customGalleriesLoading}
                      disabled={saving}
                      mode="multiple"
                      maxTagCount={3}
                      optionFilterProp="label"
                      // value={selectedItems}
                      // onChange={onSelectCustomGallery}
                    >
                      {customGalleries.map((el) => (
                        <Select.Option
                          key={el.value}
                          value={el.value}
                          label={el.label}
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
                    onClick={toggleAddCustomGallery}
                    icon={
                      <FontAwesomeIcon
                        icon={faPlus}
                        style={{ marginRight: 5 }}
                      />
                    }
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
          imgChange={imgChange}
          beforeUpload={beforeUpload}
          editImage={editImage}
          fileList={fileList}
          onEditImage={onEditImage}
          toggleEditImage={toggleEditImage}
          onRemoveImage={onRemoveImage}
          primaryImage={primaryImage}
          setPrimaryImage={setPrimaryImage}
          title={intl.formatMessage({
            defaultMessage: 'vehicle',
          })}
        />

        <Form.Item>
          <Row style={{ marginTop: 30 }} gutter={16} justify="end">
            <Col>
              <Button disabled={saving} onClick={onClose}>
                {intl.formatMessage({ defaultMessage: 'Cancel' })}
              </Button>
            </Col>
            <Col>
              <Button
                type="primary"
                htmlType="submit"
                disabled={saving}
                loading={saving}
              >
                {intl.formatMessage({ defaultMessage: 'Save' })}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add Custom Gallery',
        })}
        open={addCustomGallery}
        width="400"
        onClose={toggleAddCustomGallery}
      >
        {addCustomGallery ? (
          <AddCustomGallery
            update={updateNewCustomGalleryData}
            onClose={toggleAddCustomGallery}
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
