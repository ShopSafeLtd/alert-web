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
import type { OffenderData } from 'components/viewChat/ViewMessage/useViewMessage';
import LinkOffender from 'components/form-components/offender/offender/AddExistingOffender';
import LinkIncident from 'components/form-components/linkOptions/LinkIncident';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/pro-light-svg-icons';
import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import WatermarkImage from 'components/images/WatermarkImage.view';
import type {
  CustomGalleryData,
  Image,
  IncidentCardData,
} from 'types/DataType';
import AddCustomGallery from 'components/form-components/customGalleries/AddCustomGallery';
import UploadImage from 'components/images/UploadImage.view';
import { useIntl } from 'react-intl';
import useStyles from './AddVehicle.styles';
import type { FormData } from './useAddVehicle';
import type { ListCrimeGroupsQuery } from 'graphql/crime-groups/queries/list-crime-groups.generated';

const { confirm } = Modal;

interface Props {
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  CrimeGroupsData: ListCrimeGroupsQuery | undefined;
  CrimeGroupsLoading: boolean;
  saving?: boolean;
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
  fromIncident?: boolean;
  fromOffender?: boolean;
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

const AddVehicle = ({
  onClose,
  onSubmit,
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
  fromIncident,
  fromOffender,
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
  const classes = useStyles();
  const intl = useIntl();
  return (
    <div>
      <Form<FormData> layout="vertical" onFinish={onSubmit} form={form}>
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
                        'select any custom galleries that are relevant to this offender or add your own.',
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
          fileList={fileList}
          editImage={editImage}
          onEditImage={onEditImage}
          toggleEditImage={toggleEditImage}
          onRemoveImage={onRemoveImage}
          primaryImage={primaryImage}
          setPrimaryImage={setPrimaryImage}
          title={intl.formatMessage({
            defaultMessage: 'vehicle',
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
              })}
            </Divider>
            <Table
              columns={[
                {
                  key: 'reference',
                  dataIndex: 'reference',
                  title: intl.formatMessage({
                    defaultMessage: 'Alert ID',
                  }),
                },
                {
                  key: 'subject',
                  dataIndex: 'subject',
                  title: intl.formatMessage({
                    defaultMessage: 'Subject',
                  }),
                },
                {
                  key: 'date',
                  dataIndex: 'date',
                  title: intl.formatMessage({
                    defaultMessage: 'Date',
                  }),
                },
                {
                  key: 'Options',
                  title: intl.formatMessage({
                    defaultMessage: 'Delete',
                  }),
                  dataIndex: 'Options',
                  width: 5,
                  render: (_, record) => (
                    <Row>
                      <Col>
                        <Tooltip
                          title={intl.formatMessage({
                            defaultMessage: 'Remove Incident',
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
                                }),
                                content: intl.formatMessage({
                                  defaultMessage:
                                    'This action cannot be undone.',
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
              })}
            </Divider>
            <Table
              columns={[
                {
                  key: 'images',
                  dataIndex: 'images',
                  title: intl.formatMessage({
                    defaultMessage: 'Image',
                  }),
                  // eslint-disable-next-line no-confusing-arrow
                  render: (images: { id: string; optimised: string }[]) =>
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
                  }),
                },

                {
                  key: 'Options',
                  title: intl.formatMessage({
                    defaultMessage: 'Delete',
                  }),
                  dataIndex: 'Options',
                  width: 5,
                  render: (_, record) => (
                    <Row>
                      <Col>
                        <Tooltip
                          title={intl.formatMessage({
                            defaultMessage: 'Remove Offender',
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
                                }),
                                content: intl.formatMessage({
                                  defaultMessage:
                                    'This action cannot be undone.',
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
                {intl.formatMessage({
                  defaultMessage: 'Create Vehicle',
                })}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Link Offenders',
        })}
        open={linkOffender}
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
        })}
        open={linkIncident}
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
        })}
        open={addCustomGallery}
        width="800"
        onClose={toggleAddCustomGallery}
      >
        <AddCustomGallery
          update={updateNewCustomGalleryData}
          onClose={toggleAddCustomGallery}
        />
      </Drawer>
    </div>
  );
};

export default AddVehicle;
