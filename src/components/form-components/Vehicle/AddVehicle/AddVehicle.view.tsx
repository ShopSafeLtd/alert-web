import type { FormInstance } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import type { OffenderData } from 'components/viewChat/ViewMessage/useViewMessage';
import type { ListCrimeGroupsQuery } from 'graphql/crime-groups/queries/__generated__/list-crime-groups.generated';
import type {
  CustomGalleryData,
  Image,
  IncidentCardData,
} from 'types/DataType';

import { faPlus, faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import AddCustomGallery from 'components/form-components/customGalleries/AddCustomGallery';
import LinkIncident from 'components/form-components/linkOptions/LinkIncident';
import LinkOffender from 'components/form-components/offender/offender/AddExistingOffender';
import UploadImage from 'components/images/UploadImage.view';
import WatermarkImage from 'components/images/WatermarkImage.view';
import React from 'react';
import { useIntl } from 'react-intl';

import type { FormData } from './useAddVehicle';

import useStyles from './AddVehicle.styles';

const { confirm } = Modal;

interface Props {
  CrimeGroupsData: ListCrimeGroupsQuery | undefined;
  CrimeGroupsLoading: boolean;
  addCustomGallery: boolean;
  adminRights: boolean;
  beforeUpload: (value: RcFile) => void;
  customGalleries: { label: string; value: string }[];
  customGalleriesLoading: boolean;
  editImage: Image | null;
  fileList: Image[];
  form: FormInstance<FormData>;
  fromIncident?: boolean;
  fromOffender?: boolean;
  groups: { label: string; value: string }[];
  groupsLoading: boolean;
  imgChange: UploadProps['onChange'];
  incidentsData: IncidentCardData[];
  linkIncident: boolean;
  linkOffender: boolean;

  offendersData: OffenderData[];
  onClose: () => void;
  onEditImage: (value: Image) => void;
  onRemoveImage: (imageId: string) => void;
  onSubmit: (value: FormData) => void;
  primaryImage: string;
  removeIncident: (value: string | undefined) => void;
  removeOffender: (value: string | undefined) => void;
  saving?: boolean;
  setPrimaryImage: (value: string) => void;
  showGroups?: boolean;
  toggleAddCustomGallery: () => void;
  toggleEditImage: (value?: Image) => void;
  toggleLinkIncident: () => void;
  toggleLinkOffender: () => void;
  updateIncidentList: (value: IncidentCardData) => void;
  updateNewCustomGalleryData: (values: CustomGalleryData) => void;
  updateOffendersList: (value: OffenderData) => void;
}

const AddVehicle = ({
  CrimeGroupsData,
  CrimeGroupsLoading,
  addCustomGallery,
  adminRights,
  beforeUpload,
  customGalleries,
  customGalleriesLoading,
  editImage,
  fileList,
  form,
  fromIncident,
  fromOffender,
  groups,
  groupsLoading,
  imgChange,
  incidentsData,
  linkIncident,
  linkOffender,

  offendersData,
  onClose,
  onEditImage,
  onRemoveImage,
  onSubmit,
  primaryImage,
  removeIncident,
  removeOffender,
  saving,
  setPrimaryImage,
  showGroups,
  toggleAddCustomGallery,
  toggleEditImage,
  toggleLinkIncident,
  toggleLinkOffender,
  updateIncidentList,
  updateNewCustomGalleryData,
  updateOffendersList,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();
  return (
    <div>
      <Form<FormData> form={form} layout="vertical" onFinish={onSubmit}>
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
                <Select
                  disabled={saving}
                  loading={groupsLoading}
                  maxTagCount={3}
                  mode="multiple"
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
                        'select any custom galleries that are relevant to this offender or add your own.',
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

        {adminRights && (
          <Row gutter={16}>
            {!fromIncident && (
              <Col>
                <Button
                  disabled={saving || linkOffender}
                  icon={
                    <FontAwesomeIcon
                      className="button-icon"
                      icon={faPlus}
                      size="lg"
                    />
                  }
                  onClick={toggleLinkIncident}
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
                    disabled={saving || linkIncident}
                    icon={
                      <FontAwesomeIcon
                        className="button-icon"
                        icon={faPlus}
                        size="lg"
                      />
                    }
                    onClick={toggleLinkOffender}
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
                  dataIndex: 'reference',
                  key: 'reference',
                  title: intl.formatMessage({
                    defaultMessage: 'Alert ID',
                  }),
                },
                {
                  dataIndex: 'subject',
                  key: 'subject',
                  title: intl.formatMessage({
                    defaultMessage: 'Subject',
                  }),
                },
                {
                  dataIndex: 'date',
                  key: 'date',
                  title: intl.formatMessage({
                    defaultMessage: 'Date',
                  }),
                },
                {
                  dataIndex: 'Options',
                  key: 'Options',
                  render: (_, record) => (
                    <Row>
                      <Col>
                        <Tooltip
                          title={intl.formatMessage({
                            defaultMessage: 'Remove Incident',
                          })}
                        >
                          <Button
                            disabled={saving}
                            icon={<FontAwesomeIcon icon={faTrash} />}
                            onClick={() => {
                              confirm({
                                content: intl.formatMessage({
                                  defaultMessage:
                                    'This action cannot be undone.',
                                }),
                                onOk() {
                                  removeIncident(record.key);
                                },
                                title: intl.formatMessage({
                                  defaultMessage:
                                    'Do you want to remove the incident?',
                                }),
                              });
                            }}
                            size="small"
                          />
                        </Tooltip>
                      </Col>
                    </Row>
                  ),
                  title: intl.formatMessage({
                    defaultMessage: 'Delete',
                  }),
                  width: 5,
                },
              ]}
              dataSource={incidentsData.map((incident) => ({
                date: incident.dayTime,
                key: incident.id,

                reference: incident.reference,

                subject: incident.subject,
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
                  dataIndex: 'images',
                  key: 'images',
                  onCell: () => ({
                    className: classes.imageCell,
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
                  title: intl.formatMessage({
                    defaultMessage: 'Image',
                  }),
                },
                {
                  dataIndex: 'name',
                  key: 'name',
                  title: intl.formatMessage({
                    defaultMessage: 'Name',
                  }),
                },

                {
                  dataIndex: 'Options',
                  key: 'Options',
                  render: (_, record) => (
                    <Row>
                      <Col>
                        <Tooltip
                          title={intl.formatMessage({
                            defaultMessage: 'Remove Offender',
                          })}
                        >
                          <Button
                            disabled={saving}
                            icon={<FontAwesomeIcon icon={faTrash} />}
                            onClick={() => {
                              confirm({
                                content: intl.formatMessage({
                                  defaultMessage:
                                    'This action cannot be undone.',
                                }),
                                onOk() {
                                  removeOffender(record.key);
                                },
                                title: intl.formatMessage({
                                  defaultMessage:
                                    'Do you want to remove the offender?',
                                }),
                              });
                            }}
                            size="small"
                          />
                        </Tooltip>
                      </Col>
                    </Row>
                  ),
                  title: intl.formatMessage({
                    defaultMessage: 'Delete',
                  }),
                  width: 5,
                },
              ]}
              dataSource={offendersData.map((offender) => ({
                images: offender.images,
                key: offender.id,
                name: offender.name,
              }))}
              pagination={false}
              size="small"
            />
          </>
        ) : null}

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
                {intl.formatMessage({
                  defaultMessage: 'Create Vehicle',
                })}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
      <Drawer
        onClose={toggleLinkOffender}
        open={linkOffender}
        title={intl.formatMessage({
          defaultMessage: 'Link Offenders',
        })}
        width="800"
      >
        {linkOffender ? (
          <LinkOffender
            offenderIds={offendersData.map(({ id }) => id)}
            onClose={toggleLinkOffender}
            update={updateOffendersList}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={toggleLinkIncident}
        open={linkIncident}
        title={intl.formatMessage({
          defaultMessage: 'Link Incidents',
        })}
        width="800"
      >
        {linkIncident ? (
          <LinkIncident
            incidentIds={incidentsData?.map(({ id }) => id)}
            onClose={toggleLinkIncident}
            update={updateIncidentList}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={toggleAddCustomGallery}
        open={addCustomGallery}
        title={intl.formatMessage({
          defaultMessage: 'Add Custom Gallery',
        })}
        width="800"
      >
        <AddCustomGallery
          onClose={toggleAddCustomGallery}
          update={updateNewCustomGalleryData}
        />
      </Drawer>
    </div>
  );
};

export default AddVehicle;
