/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { FormInstance, UploadFile } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import type { OffenderData } from 'components/viewChat/ViewMessage/useViewMessage';
import type {
  CrimeGroupData,
  CustomGalleryData,
  Image,
  IncidentCardData,
} from 'types/DataType';

import PermissionCheckWrapper from '#/components/PermissionCheck/PermissionCheckWrapper';
import hasRolePermission from '#/utils/has-role-permission';
import {
  faEdit,
  faFileArrowUp,
  faImages,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Col,
  Divider,
  Drawer,
  Empty,
  Form,
  Input,
  PageHeader,
  Popconfirm,
  Row,
  Select,
  Table,
  Tooltip,
  Typography,
  Upload,
} from 'antd';
import ImageEditor from 'components/form-components/ImageEditor/ImageEditor.view';
import AddCustomGallery from 'components/form-components/customGalleries/AddCustomGallery';
import LinkCrimeGroup from 'components/form-components/linkOptions/LinkCrimeGroup';
import LinkIncident from 'components/form-components/linkOptions/LinkIncident';
import LinkOffender from 'components/form-components/offender/AddExistingOffender';
import WatermarkImage from 'components/images/WatermarkImage.view';
import IncidentTable from 'components/tables/IncidentTable';
import OffenderTable from 'components/tables/OffenderTable';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';

import type { FormData } from './useAddVehicle';

import customRequest from '../../../../utils/custom-request';
import useStyles from './AddVehicle.styles';

const { Paragraph, Title } = Typography;

interface Props {
  addCrimeGroup: boolean;
  addCustomGallery: boolean;
  beforeUpload: (value: RcFile) => void;
  crimeGroupsData: CrimeGroupData[];
  customGalleries: { label: string; value: string }[];
  customGalleriesLoading: boolean;
  documentList: UploadFile[];
  documentUploadProps: UploadProps;
  editImage: Image | null;
  fileList: Image[];
  form: FormInstance<FormData>;
  groups: { label: string; value: string }[];
  groupsLoading: boolean;
  imgChange: UploadProps['onChange'];
  incidentsData: IncidentCardData[];
  linkIncident: boolean;
  linkOffender: boolean;
  offendersData: OffenderData[];
  onEditImage: (value: Image) => void;
  onRemoveImage: (imageId: string) => void;
  onSubmit: (value: FormData) => void;
  primaryImage: string;
  removeCrimeGroup: (value: string | undefined) => void;
  removeIncident: (value: string | undefined) => void;
  removeOffender: (value: string | undefined) => void;
  reportOnly: boolean;
  saving?: boolean;
  setPrimaryImage: (value: string) => void;
  toggleAddCrimeGroup: () => void;
  toggleAddCustomGallery: () => void;
  toggleEditImage: (value?: Image) => void;
  toggleLinkIncident: () => void;
  toggleLinkOffender: () => void;
  updateCrimeGroupsList: (value: CrimeGroupData) => void;
  updateIncidentList: (value: IncidentCardData) => void;
  updateNewCustomGalleryData: (values: CustomGalleryData) => void;
  updateOffendersList: (value: OffenderData) => void;
}

const AddVehicle = ({
  addCrimeGroup,
  addCustomGallery,
  beforeUpload,
  crimeGroupsData,
  customGalleries,
  customGalleriesLoading,
  documentList,
  documentUploadProps,
  editImage,
  fileList,
  form,
  groups,
  groupsLoading,
  imgChange,
  incidentsData,
  linkIncident,
  linkOffender,
  offendersData,
  onEditImage,
  onRemoveImage,
  onSubmit,
  primaryImage,
  removeCrimeGroup,
  removeIncident,
  removeOffender,
  reportOnly,
  saving,
  setPrimaryImage,
  toggleAddCrimeGroup,
  toggleAddCustomGallery,
  toggleEditImage,
  toggleLinkIncident,
  toggleLinkOffender,
  updateCrimeGroupsList,
  updateIncidentList,
  updateNewCustomGalleryData,
  updateOffendersList,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();
  return (
    <div className={classes.page}>
      <Form<FormData> form={form} layout="vertical" onFinish={onSubmit}>
        <PageHeader
          onBack={reportOnly ? undefined : () => window.history.back()}
          title={intl.formatMessage({
            defaultMessage: 'Add Vehicle',
          })}
        />
        {/* vehicle details */}
        <Card>
          <Row align="bottom" style={{ marginBottom: 30 }}>
            <Col>
              <Title level={4} style={{ marginBottom: 0, marginLeft: 5 }}>
                {intl.formatMessage({
                  defaultMessage: 'Vehicle Details',
                })}
              </Title>
            </Col>
            <Col>
              <Paragraph
                italic
                style={{ marginBottom: 1, marginLeft: 5 }}
                type="secondary"
              >
                {intl.formatMessage({
                  defaultMessage:
                    '- Please complete the basic details for the vehicle.',
                })}
              </Paragraph>
            </Col>
          </Row>
          <Row gutter={50}>
            <Col span={8}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Registration',
                })}
                name="registration"
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Make',
                })}
                name="make"
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Model',
                })}
                name="model"
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Colour',
                })}
                name="colour"
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.OffenderGalleries,
              }}
              unauthorizedElement={<div />}
            >
              <Col span={12}>
                <Row align="middle" gutter={5}>
                  <Col flex={1}>
                    <Form.Item
                      label={intl.formatMessage({
                        defaultMessage: 'Custom Galleries',
                      })}
                      name="customGalleries"
                      tooltip={intl.formatMessage({
                        defaultMessage:
                          'select any custom galleries that are relevant to this vehicle or add your own.',
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
            </PermissionCheckWrapper>
          </Row>
          {/* {adminRights && (
            <Row gutter={50}>
              <Col span={12}>
                <Row gutter={5} align="middle">
                  <Col flex={1}>
                    <Form.Item
                      name="customGalleries"
                      label={intl.formatMessage({
                        defaultMessage: 'Custom Galleries',
                        id: 'bzpFEk',
                      })}
                      tooltip={intl.formatMessage({
                        defaultMessage:
                          'select any custom galleries that are relevant to this vehicle or add your own.',
                        id: 'Or8c6M',
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
          )} */}
        </Card>
        {/* Profiles */}
        <PermissionCheckWrapper
          permission={{
            method: PermissionMethod.Edit,
            model: PermissionModel.Offenders,
          }}
          unauthorizedElement={<div />}
        >
          <Card>
            <Row
              align="middle"
              gutter={10}
              style={{ marginBottom: 20, width: '100%' }}
            >
              <Col>
                <Title level={4} style={{ marginBottom: 0 }}>
                  {intl.formatMessage({
                    defaultMessage: 'Profiles',
                  })}
                </Title>
              </Col>
              <Col style={{ marginRight: 20 }}>
                <Paragraph italic style={{ marginBottom: 1 }} type="secondary">
                  {intl.formatMessage({
                    defaultMessage:
                      '- Please add the profiles that were involved in the vehicle.',
                  })}
                </Paragraph>
              </Col>
              <Col>
                <Button
                  disabled={saving}
                  icon={
                    <FontAwesomeIcon
                      className="button-icon"
                      icon={faPlus}
                      size="lg"
                    />
                  }
                  onClick={toggleLinkIncident}
                  style={{ color: 'red' }}
                >
                  {intl.formatMessage({
                    defaultMessage: 'Incidents',
                  })}
                </Button>
              </Col>
              <Col>
                <Button
                  disabled={saving}
                  icon={
                    <FontAwesomeIcon
                      className="button-icon"
                      icon={faPlus}
                      size="lg"
                    />
                  }
                  onClick={toggleLinkOffender}
                  style={{ color: 'red' }}
                >
                  {intl.formatMessage({
                    defaultMessage: 'Offenders',
                  })}
                </Button>
              </Col>
              <Col>
                <Button
                  disabled={saving}
                  icon={
                    <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
                  }
                  onClick={toggleAddCrimeGroup}
                  style={{ color: 'red' }}
                >
                  {intl.formatMessage({
                    defaultMessage: 'Crime Groups',
                  })}
                </Button>
              </Col>
            </Row>
            <Row gutter={20} style={{ marginTop: 10 }}>
              <Col flex={1}>
                {(incidentsData && incidentsData.length > 0) ||
                (offendersData && offendersData.length > 0) ||
                (crimeGroupsData && crimeGroupsData.length > 0) ? (
                  <>
                    {incidentsData && incidentsData.length > 0 ? (
                      <>
                        <Divider>
                          {intl.formatMessage({
                            defaultMessage: 'Incidents',
                          })}
                        </Divider>
                        <IncidentTable
                          deleteRights={hasRolePermission({
                            permission: {
                              method: PermissionMethod.Delete,
                              model: PermissionModel.Incidents,
                            },
                          })}
                          hasNavigation={false}
                          incidents={incidentsData}
                          onDelete={removeIncident}
                        />
                      </>
                    ) : null}

                    {offendersData && offendersData.length > 0 ? (
                      <>
                        <Divider>
                          {intl.formatMessage({
                            defaultMessage: 'Offenders',
                          })}
                        </Divider>
                        <OffenderTable
                          deleteRights={hasRolePermission({
                            permission: {
                              method: PermissionMethod.Delete,
                              model: PermissionModel.Offenders,
                            },
                          })}
                          hasNavigation={false}
                          offenders={offendersData}
                          onDeleteOffender={removeOffender}
                        />
                      </>
                    ) : null}
                    {crimeGroupsData && crimeGroupsData.length > 0 ? (
                      <>
                        <Divider>
                          {intl.formatMessage({
                            defaultMessage: 'Crime Groups',
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
                              dataIndex: 'alias',
                              key: 'alias',
                              title: intl.formatMessage({
                                defaultMessage: 'Alias',
                              }),
                            },
                            {
                              dataIndex: 'totalOffenders',
                              key: 'totalOffenders',
                              title: intl.formatMessage({
                                defaultMessage: 'Members',
                              }),
                            },
                            {
                              dataIndex: 'totalIncidents',
                              key: 'totalIncidents',
                              title: intl.formatMessage({
                                defaultMessage: 'Incidents',
                              }),
                            },
                            {
                              dataIndex: 'totalValue',
                              key: 'totalValue',
                              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                              render: (value) =>
                                intl.formatNumber(value || 0, {
                                  currency: 'GBP',
                                  style: 'currency',
                                }),
                              title: intl.formatMessage({
                                defaultMessage: 'Lost Value',
                              }),
                            },
                            {
                              dataIndex: 'totalRecoveredValue',
                              key: 'totalRecoveredValue',
                              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                              render: (value) =>
                                intl.formatNumber(value || 0, {
                                  currency: 'GBP',
                                  style: 'currency',
                                }),
                              title: intl.formatMessage({
                                defaultMessage: 'Recovered Value',
                              }),
                            },
                            {
                              dataIndex: 'totalTheftSuccess',
                              key: 'totalTheftSuccess',
                              // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions
                              render: (value) => `${value?.toFixed(0) || 0}%`,
                              title: intl.formatMessage({
                                defaultMessage: 'Loss Rate',
                              }),
                            },
                            {
                              dataIndex: 'delete',
                              key: 'delete',
                              render: (_, record) => (
                                <Popconfirm
                                  cancelText={intl.formatMessage({
                                    defaultMessage: 'No',
                                  })}
                                  okText={intl.formatMessage({
                                    defaultMessage: 'Yes',
                                  })}
                                  onConfirm={() => {
                                    removeCrimeGroup(record.key);
                                  }}
                                  overlayInnerStyle={{ padding: 10 }}
                                  placement="topLeft"
                                  title={intl.formatMessage({
                                    defaultMessage: 'Remove the crime group?',
                                  })}
                                >
                                  <Button
                                    disabled={saving}
                                    icon={<FontAwesomeIcon icon={faTrash} />}
                                  />
                                </Popconfirm>
                              ),
                              title: intl.formatMessage({
                                defaultMessage: 'Delete',
                              }),
                              width: 50,
                            },
                          ]}
                          dataSource={crimeGroupsData.map((crimeGroup) => ({
                            alias: crimeGroup.alias,
                            key: crimeGroup.id,
                            reference: crimeGroup.reference,
                            totalIncidents: crimeGroup.totalIncidents,
                            totalOffenders: crimeGroup.totalOffenders,
                            totalRecoveredValue: crimeGroup.totalRecoveredValue,
                            totalTheftSuccess: crimeGroup.totalTheftSuccess,
                            totalValue: crimeGroup.totalValue,
                          }))}
                          pagination={
                            crimeGroupsData && crimeGroupsData.length > 5
                              ? {
                                  pageSize: 5,
                                }
                              : false
                          }
                          size="small"
                        />
                      </>
                    ) : null}
                  </>
                ) : (
                  <Row justify="center">
                    <Empty
                      description={intl.formatMessage({
                        defaultMessage: 'No profiles added yet.',
                      })}
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                  </Row>
                )}
              </Col>
            </Row>
          </Card>
        </PermissionCheckWrapper>

        {/* images */}
        <Card>
          <Row align="middle" style={{ marginBottom: 20 }}>
            <Col>
              <Title level={4} style={{ marginBottom: 0, marginLeft: 5 }}>
                {intl.formatMessage({
                  defaultMessage: 'Images & Other Media',
                })}
              </Title>
            </Col>
            <Col>
              <Paragraph
                italic
                style={{ marginBottom: 1, marginLeft: 5 }}
                type="secondary"
              >
                {intl.formatMessage({
                  defaultMessage:
                    '- Please add any images & media that you have of the vehicle.',
                })}
              </Paragraph>
            </Col>
            <Col style={{ marginLeft: 30 }}>
              <Upload
                accept=".png,.jpeg,.webp"
                beforeUpload={beforeUpload}
                customRequest={customRequest}
                fileList={fileList}
                onChange={imgChange}
                showUploadList={false}
              >
                <Tooltip
                  placement="bottom"
                  title={intl.formatMessage({
                    defaultMessage:
                      'Upload any images you have for the vehicle.',
                  })}
                >
                  <Button
                    icon={
                      <FontAwesomeIcon
                        icon={faImages}
                        style={{ marginRight: 5 }}
                      />
                    }
                    style={{ color: 'red' }}
                  >
                    {intl.formatMessage({
                      defaultMessage: 'Upload Image',
                    })}
                  </Button>
                </Tooltip>
              </Upload>
            </Col>
            <Col style={{ marginLeft: 10 }}>
              <Upload
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...documentUploadProps}
                fileList={documentList}
                listType="picture"
                showUploadList={false}
                style={{ display: 'flex' }}
              >
                <Tooltip
                  placement="bottom"
                  title={intl.formatMessage({
                    defaultMessage:
                      'Add documents to the vehicle such as PDFs or videos.',
                  })}
                >
                  <Button
                    icon={
                      <FontAwesomeIcon
                        icon={faFileArrowUp}
                        style={{ marginRight: 5 }}
                      />
                    }
                    type="text"
                  >
                    {intl.formatMessage({
                      defaultMessage: 'Upload Document',
                    })}
                  </Button>
                </Tooltip>
              </Upload>
            </Col>
          </Row>
          {(fileList && fileList.length > 0) ||
          (documentList && documentList.length > 0) ? (
            <>
              {fileList && fileList.length > 0 && (
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Images',
                  })}
                  name="images"
                >
                  <Upload
                    accept=".png,.jpeg,.webp"
                    beforeUpload={beforeUpload}
                    customRequest={customRequest}
                    fileList={fileList}
                    // eslint-disable-next-line react/no-unstable-nested-components
                    itemRender={(el, file: Image) => (
                      <Card
                        bodyStyle={{
                          borderRadius: 10,
                          overflow: 'hidden',
                          padding: 0,
                        }}
                        key={el.key}
                      >
                        <div style={{ height: 200, width: '100%' }}>
                          <Button
                            onClick={() => toggleEditImage(file)}
                            size="small"
                            style={{
                              left: 5,
                              padding: '6.5px 10px',
                              position: 'absolute',
                              top: 5,
                              zIndex: 10,
                            }}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>
                          <Popconfirm
                            cancelText={intl.formatMessage({
                              defaultMessage: 'No',
                            })}
                            okText={intl.formatMessage({
                              defaultMessage: 'Yes',
                            })}
                            onConfirm={() => onRemoveImage(file.uid)}
                            overlayInnerStyle={{ padding: 10 }}
                            placement="topLeft"
                            title={intl.formatMessage({
                              defaultMessage: 'Remove the image?',
                            })}
                            trigger="hover"
                          >
                            <Button
                              size="small"
                              style={{
                                left: 45,
                                padding: '6.5px 10px',
                                position: 'absolute',
                                top: 5,
                                zIndex: 10,
                              }}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </Button>
                          </Popconfirm>
                          <WatermarkImage
                            position={file.position}
                            url={file.url || file.thumbUrl}
                          />
                        </div>
                      </Card>
                    )}
                    listType="picture-card"
                    onChange={imgChange}
                  >
                    {/* {fileList.length < 10 &&
                  intl.formatMessage({
                    defaultMessage: '+ Upload',
                    id: '3QJWLZ',
                  })} */}
                  </Upload>
                </Form.Item>
              )}

              {documentList.length > 0 && (
                <div style={{ width: '35%' }}>
                  <Form.Item
                    label={intl.formatMessage({
                      defaultMessage: 'Other Media',
                    })}
                    name="documents"
                  >
                    <Upload
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...documentUploadProps}
                      fileList={documentList}
                      listType="picture"
                      style={{ display: 'flex' }}
                    />
                    {/* <Button icon={<UploadOutlined />}>
                  {intl.formatMessage({
                    defaultMessage: 'Upload Document',
                    id: 'Kc9MAV',
                  })}
                </Button>
              </Upload> */}
                  </Form.Item>
                </div>
              )}
            </>
          ) : (
            <Row justify="center">
              <Empty
                description={intl.formatMessage({
                  defaultMessage: 'No images & media added yet.',
                })}
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            </Row>
          )}
        </Card>
        <ImageEditor
          image={editImage}
          onClose={toggleEditImage}
          open={!!editImage}
          primaryImage={primaryImage}
          setPrimaryImage={setPrimaryImage}
          submitImage={onEditImage}
        />
        {/* groups */}
        {groups.length > 1 && (
          <Card>
            <>
              <Row align="bottom" style={{ marginBottom: 30 }}>
                <Col>
                  <Title level={4} style={{ marginBottom: 0, marginLeft: 5 }}>
                    {intl.formatMessage({
                      defaultMessage: 'Who is it visible to?',
                    })}
                  </Title>
                </Col>
                <Col>
                  <Paragraph
                    italic
                    style={{ marginBottom: 1, marginLeft: 5 }}
                    type="secondary"
                  >
                    {intl.formatMessage({
                      defaultMessage:
                        '- Please select the content groups that this vehicle is for',
                    })}
                  </Paragraph>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
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
              </Row>
            </>
          </Card>
        )}

        <Form.Item>
          <Row gutter={10} justify="end" style={{ marginTop: 10 }}>
            {!reportOnly && (
              <Col>
                <Button disabled={saving} onClick={() => window.history.back()}>
                  {intl.formatMessage({
                    defaultMessage: 'Cancel',
                  })}
                </Button>
              </Col>
            )}
            <Col>
              <Button
                disabled={saving}
                htmlType="submit"
                loading={saving}
                type="primary"
              >
                {intl.formatMessage({
                  defaultMessage: 'Save',
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
      <Drawer
        onClose={toggleAddCrimeGroup}
        open={addCrimeGroup}
        title={intl.formatMessage({
          defaultMessage: 'Add Crime Groups',
        })}
        width="800"
        zIndex={1001}
      >
        {addCrimeGroup ? (
          <LinkCrimeGroup
            crimeGroupIds={crimeGroupsData.map(({ id }) => id)}
            onClose={toggleAddCrimeGroup}
            update={updateCrimeGroupsList}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default AddVehicle;
