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
import LinkOffender from 'components/form-components/offender/offender/AddExistingOffender';
import LinkIncident from 'components/form-components/linkOptions/LinkIncident';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/pro-light-svg-icons';
import WatermarkImage from 'components/images/WatermarkImage.view';
import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import type {
  CustomGalleryData,
  IncidentCardData,
  VehicleCardData,
  OffenderData,
} from 'types/DataType';
import UploadImage from 'components/images/UploadImage.view';
import AddCustomGallery from 'components/form-components/customGalleries/AddCustomGallery';
import { useIntl } from 'react-intl';
import useStyles from './EditVehicle.styles';
import type { FormData, Image } from './useEditVehicle';

const { confirm } = Modal;

interface Props {
  onClose: () => void;
  editData: VehicleCardData | undefined | null;
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
                        'Select any custom galleries that are relevant to this offender or add your own.',
                      id: 'lGUu1k',
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
          fileList={fileList}
          editImage={editImage}
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
                  {intl.formatMessage({
                    defaultMessage: 'Link Incident',
                    id: '4sHDoC',
                  })}
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
                    {intl.formatMessage({
                      defaultMessage: 'Link Offender',
                      id: 'IWqg0R',
                    })}
                  </Button>
                </div>
              </Col>
            )}
          </Row>
        )}

        {incidentsData && incidentsData.length > 0 ? (
          <>
            <Divider>
              {intl.formatMessage({
                defaultMessage: 'Linked Incidents',
                id: 'RDsV4v',
              })}
            </Divider>
            <Table
              columns={[
                {
                  key: 'reference',
                  dataIndex: 'reference',
                  title: intl.formatMessage({
                    defaultMessage: 'Alert ID',
                    id: 'k8ZNgH',
                  }),
                },
                {
                  key: 'subject',
                  dataIndex: 'subject',
                  title: intl.formatMessage({
                    defaultMessage: 'Subject',
                    id: 'LLtKhp',
                  }),
                },
                {
                  key: 'date',
                  dataIndex: 'date',
                  title: intl.formatMessage({
                    defaultMessage: 'Date',
                    id: 'P7PLVj',
                  }),
                },
                {
                  key: 'Options',
                  title: intl.formatMessage({
                    defaultMessage: 'Delete',
                    id: 'K3r6DQ',
                  }),
                  dataIndex: 'Options',
                  width: 5,
                  render: (_, record) => (
                    <Row>
                      <Col>
                        <Tooltip
                          title={intl.formatMessage({
                            defaultMessage: 'Remove Incident',
                            id: 'NhpFO7',
                          })}
                        >
                          <Button
                            size="small"
                            disabled={saving}
                            onClick={() => {
                              confirm({
                                title: intl.formatMessage({
                                  defaultMessage:
                                    'Do you want to remove the incident?',
                                  id: 'wN3wVs',
                                }),
                                content: intl.formatMessage({
                                  defaultMessage:
                                    'This action cannot be undone.',
                                  id: 'JDJoIZ',
                                }),
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
            <Divider>
              {intl.formatMessage({
                defaultMessage: 'Linked Offenders',
                id: 'hyrc8o',
              })}
            </Divider>
            <Table
              columns={[
                {
                  key: 'images',
                  dataIndex: 'images',
                  title: intl.formatMessage({
                    defaultMessage: 'Image',
                    id: '+0zv6g',
                  }),
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
                  title: intl.formatMessage({
                    defaultMessage: 'Name',
                    id: 'HAlOn1',
                  }),
                },
                {
                  key: 'Options',
                  title: intl.formatMessage({
                    defaultMessage: 'Delete',
                    id: 'K3r6DQ',
                  }),
                  dataIndex: 'Options',
                  width: 5,
                  render: (_, record) => (
                    <Row>
                      <Col>
                        <Tooltip
                          title={intl.formatMessage({
                            defaultMessage: 'Remove Offender',
                            id: 'cZH2Kj',
                          })}
                        >
                          <Button
                            size="small"
                            disabled={saving}
                            onClick={() => {
                              confirm({
                                title: intl.formatMessage({
                                  defaultMessage:
                                    'Do you want to remove the offender?',
                                  id: 'B3Hfqo',
                                }),
                                content: intl.formatMessage({
                                  defaultMessage:
                                    'This action cannot be undone.',
                                  id: 'JDJoIZ',
                                }),
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
          defaultMessage: 'Link Offenders',
          id: 'UhSUQG',
        })}
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
        title={intl.formatMessage({
          defaultMessage: 'Link Incidents',
          id: '1Vs3Qr',
        })}
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
