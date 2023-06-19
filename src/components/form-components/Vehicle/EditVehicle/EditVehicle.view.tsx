import React from 'react';
import type { FormInstance } from 'antd';
import {
  Button,
  Col,
  Divider,
  Drawer,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Skeleton,
  Table,
  Tooltip,
} from 'antd';
import type { ListCrimeGroupsQuery } from 'graphql/generated';
import type { OffenderData } from 'components/viewChat/ViewMessage/useViewMessage';
import LinkOffender from 'components/form-components/offender/offender/AddExistingOffender';
import LinkIncident from 'components/form-components/linkOptions/LinkIncident';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/pro-light-svg-icons';
import WatermarkImage from 'components/images/WatermarkImage.view';
import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import type {
  CustomGalleryData,
  IncidentCardData,
  VehicleData,
} from 'types/DataType';

import UploadImage from 'components/images/UploadImage.view';
import AddCustomGallery from 'components/form-components/customGalleries/AddCustomGallery';
import useStyles from './EditVehicle.styles';
import type { FormData, Image } from './useEditVehicle';

const { confirm } = Modal;

interface Props {
  onClose: () => void;
  editData: VehicleData | undefined | null;
  onSubmit: (value: FormData) => void;
  CrimeGroupsData: ListCrimeGroupsQuery | undefined;
  CrimeGroupsLoading: boolean;
  saving: boolean;
  offendersData: OffenderData[];
  incidentsData: IncidentCardData[];
  linkIncident: boolean;
  linkOffender: boolean;
  toggleLinkIncident: () => void;
  toggleLinkOffender: () => void;
  updateOffendersList: (value: OffenderData) => void;
  updateIncidentList: (value: IncidentCardData) => void;
  removeOffender: (value: string | undefined) => void;
  removeIncident: (value: string | undefined) => void;
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
  fromIncident?: boolean;
  fromOffender?: boolean;
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
  offendersData,
  incidentsData,
  linkIncident,
  linkOffender,
  toggleLinkIncident,
  toggleLinkOffender,
  updateIncidentList,
  updateOffendersList,
  removeOffender,
  removeIncident,
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
  fromIncident,
  fromOffender,
  customGalleries,
  customGalleriesLoading,
  addCustomGallery,
  toggleAddCustomGallery,
  updateNewCustomGalleryData,
  form,
}: Props): JSX.Element => {
  const classes = useStyles();
  return editData ? (
    <div>
      <Form<FormData>
        initialValues={{
          make: editData.make || '',
          model: editData.model || '',
          colour: editData.colour || '',
          registration: editData.registration || '',
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
            <Form.Item name="make" label="Make">
              <Input disabled={saving} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="model" label="Model">
              <Input disabled={saving} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="colour" label="Colour">
              <Input disabled={saving} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="registration" label="Registration">
              <Input disabled={saving} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          {showGroups && (
            <Col span={12}>
              <Form.Item
                name="groups"
                label="Groups"
                tooltip="Please select the relevant groups that you would like this vehicle to be visible to."
                rules={[
                  {
                    required: true,
                    message:
                      'Please select at least one group for the vehicle.',
                  },
                ]}
              >
                <Select
                  loading={groupsLoading}
                  disabled={saving}
                  mode="multiple"
                  maxTagCount={3}
                  placeholder="Select groups..."
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
              <Form.Item name="crimeGroup" label="Crime Groups">
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
                      label: `CG-${crimeGroup.reference}`,
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
                    label="Custom Galleries"
                    tooltip="select any custom galleries that are relevant to this offender or add your own."
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
                    Add Custom Gallery
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        )}

        <UploadImage
          imgChange={imgChange}
          beforeUpload={beforeUpload}
          fileList={fileList}
          editImage={editImage}
          onEditImage={onEditImage}
          toggleEditImage={toggleEditImage}
          onRemoveImage={onRemoveImage}
          primaryImage={primaryImage}
          setPrimaryImage={setPrimaryImage}
          title="vehicle"
        />
        {adminRights && (
          <Row gutter={16}>
            {!fromIncident && (
              <Col>
                <Button
                  onClick={toggleLinkIncident}
                  disabled={saving || linkOffender}
                  icon={
                    <FontAwesomeIcon
                      className="button-icon"
                      icon={faPlus}
                      size="lg"
                    />
                  }
                >
                  Link Incident
                </Button>
              </Col>
            )}

            {!fromOffender && (
              <Col>
                <div>
                  <Button
                    onClick={toggleLinkOffender}
                    disabled={saving || linkIncident}
                    icon={
                      <FontAwesomeIcon
                        className="button-icon"
                        icon={faPlus}
                        size="lg"
                      />
                    }
                  >
                    Link Offender
                  </Button>
                </div>
              </Col>
            )}
          </Row>
        )}

        {incidentsData && incidentsData.length > 0 ? (
          <>
            <Divider>Linked Incidents</Divider>
            <Table
              columns={[
                {
                  key: 'reference',
                  dataIndex: 'reference',
                  title: 'Alert ID',
                },
                {
                  key: 'subject',
                  dataIndex: 'subject',
                  title: 'Subject',
                },
                {
                  key: 'date',
                  dataIndex: 'date',
                  title: 'Date',
                },
                {
                  key: 'Options',
                  title: 'Delete',
                  dataIndex: 'Options',
                  width: 5,
                  render: (_, record) => (
                    <Row>
                      <Col>
                        <Tooltip title="Remove Incident">
                          <Button
                            size="small"
                            disabled={saving}
                            onClick={() => {
                              confirm({
                                title: 'Do you want to remove the incident?',
                                content: 'This action cannot be undone.',
                                onOk() {
                                  removeIncident(record.key);
                                },
                              });
                            }}
                            icon={<FontAwesomeIcon icon={faTrash} />}
                          />
                        </Tooltip>
                      </Col>
                    </Row>
                  ),
                },
              ]}
              dataSource={incidentsData.map((incident) => ({
                subject: incident.subject,
                reference: incident.reference,

                date: incident.dayTime,

                key: incident.id,
              }))}
              pagination={false}
              size="small"
            />
          </>
        ) : null}

        {offendersData && offendersData.length > 0 ? (
          <>
            <Divider>Linked Offenders</Divider>
            <Table
              columns={[
                {
                  key: 'images',
                  dataIndex: 'images',
                  title: 'Image',
                  render: (images: { id: string; optimised: string }[]) =>
                    // eslint-disable-next-line
                    images.length > 0 ? (
                      <div className={classes.searchImageContainer}>
                        <div className={classes.searchImage}>
                          <WatermarkImage url={images[0]?.optimised} />
                        </div>
                      </div>
                    ) : (
                      <Skeleton.Image className={classes.imageSkeleton} />
                    ),
                  onCell: () => ({
                    className: classes.imageCell,
                  }),
                },
                {
                  key: 'name',
                  dataIndex: 'name',
                  title: 'Name',
                },

                {
                  key: 'Options',
                  title: 'Delete',
                  dataIndex: 'Options',
                  width: 5,
                  render: (_, record) => (
                    <Row>
                      <Col>
                        <Tooltip title="Remove Offender">
                          <Button
                            size="small"
                            disabled={saving}
                            onClick={() => {
                              confirm({
                                title: 'Do you want to remove the offender?',
                                content: 'This action cannot be undone.',
                                onOk() {
                                  removeOffender(record.key);
                                },
                              });
                            }}
                            icon={<FontAwesomeIcon icon={faTrash} />}
                          />
                        </Tooltip>
                      </Col>
                    </Row>
                  ),
                },
              ]}
              dataSource={offendersData.map((offender) => ({
                key: offender.id,
                name: offender.name,
                images: offender.images,
              }))}
              pagination={false}
              size="small"
            />
          </>
        ) : null}

        <Form.Item>
          <Row style={{ marginTop: 30 }} gutter={16} justify="end">
            <Col>
              <Button disabled={saving} onClick={onClose}>
                Cancel
              </Button>
            </Col>
            <Col>
              <Button
                type="primary"
                htmlType="submit"
                disabled={saving}
                loading={saving}
              >
                Save
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
      <Drawer
        title="Link Offenders"
        visible={linkOffender}
        width="800"
        onClose={toggleLinkOffender}
      >
        {linkOffender ? (
          <LinkOffender
            update={updateOffendersList}
            onClose={toggleLinkOffender}
            offenderIds={offendersData.map(({ id }) => id)}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title="Link Incidents"
        visible={linkIncident}
        width="800"
        onClose={toggleLinkIncident}
      >
        {linkIncident ? (
          <LinkIncident
            update={updateIncidentList}
            onClose={toggleLinkIncident}
            incidentIds={incidentsData?.map(({ id }) => id)}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title="Add Custom Gallery"
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
