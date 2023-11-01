import React from 'react';
import type { FormInstance } from 'antd';
import { Button, Col, Drawer, Form, Input, Row, Select, Skeleton } from 'antd';
import type { ListCrimeGroupsQuery } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-light-svg-icons';

import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import type { CustomGalleryData, Image, VehicleCardData } from 'types/DataType';
import UploadImage from 'components/images/UploadImage.view';
import AddCustomGallery from 'components/form-components/customGalleries/AddCustomGallery';
import { useIntl } from 'react-intl';
// import useStyles from './EditVehicle.styles';
import type { FormData } from './useEditVehicle';

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
                id: '6AAM0P',
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
                id: 'rhSI1/',
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
                id: '+e8vAT',
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
                id: 'qv7ied',
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
                  id: 'hzmswI',
                })}
                tooltip={intl.formatMessage({
                  defaultMessage:
                    'Please select the relevant groups that you would like this vehicle to be visible to.',
                  id: 'cz35+X',
                })}
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      defaultMessage:
                        'Please select at least one group for the vehicle.',
                      id: 'QVpuqK',
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
                    id: 'aVKXev',
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
                  id: 'a0aLil',
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
                          defaultMessage: `CG-{ref}`,
                          id: 'h/qDZq',
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
                      id: 'bzpFEk',
                    })}
                    tooltip={intl.formatMessage({
                      defaultMessage:
                        'Select any custom galleries that are relevant to this vehicle or add your own.',
                      id: '2pmewe',
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
                      id: 'rLyRNN',
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
            id: 'qcNaCj',
          })}
        />

        <Form.Item>
          <Row style={{ marginTop: 30 }} gutter={16} justify="end">
            <Col>
              <Button disabled={saving} onClick={onClose}>
                {intl.formatMessage({ defaultMessage: 'Cancel', id: '47FYwb' })}
              </Button>
            </Col>
            <Col>
              <Button
                type="primary"
                htmlType="submit"
                disabled={saving}
                loading={saving}
              >
                {intl.formatMessage({ defaultMessage: 'Save', id: 'jvo0vs' })}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add Custom Gallery',
          id: 'rLyRNN',
        })}
        visible={addCustomGallery}
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
