import React from 'react';
import type { FormInstance, UploadFile } from 'antd';
import {
  Popconfirm,
  Upload,
  Empty,
  PageHeader,
  Typography,
  Card,
  Button,
  Col,
  Divider,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Table,
  Tooltip,
} from 'antd';

import type { OffenderData } from 'components/viewChat/ViewMessage/useViewMessage';
import LinkOffender from 'components/form-components/offender/offender/AddExistingOffender';
import LinkIncident from 'components/form-components/linkOptions/LinkIncident';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faFileArrowUp,
  faImages,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import WatermarkImage from 'components/images/WatermarkImage.view';
import type {
  CrimeGroupData,
  CustomGalleryData,
  Image,
  IncidentCardData,
} from 'types/DataType';
import AddCustomGallery from 'components/form-components/customGalleries/AddCustomGallery';
import { useIntl } from 'react-intl';
import LinkCrimeGroup from 'components/form-components/linkOptions/LinkCrimeGroup';
import ImageEditor from 'components/form-components/ImageEditor/ImageEditor.view';
import IncidentTable from 'components/tables/IncidentTable';
import OffenderTable from 'components/tables/OffenderTable';
import type { FormData } from './useAddVehicle';
import useStyles from './AddVehicle.styles';
import customRequest from '../../../../utils/custom-request';

const { Title, Paragraph } = Typography;

interface Props {
  onSubmit: (value: FormData) => void;
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
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  customGalleries: { value: string; label: string }[];
  customGalleriesLoading: boolean;
  addCustomGallery: boolean;
  toggleAddCustomGallery: () => void;
  updateNewCustomGalleryData: (values: CustomGalleryData) => void;
  form: FormInstance<FormData>;
  reportOnly: boolean;
  crimeGroupsData: CrimeGroupData[];
  addCrimeGroup: boolean;
  toggleAddCrimeGroup: () => void;
  updateCrimeGroupsList: (value: CrimeGroupData) => void;
  removeCrimeGroup: (value: string | undefined) => void;
  documentList: UploadFile[];
  documentUploadProps: UploadProps;
}

const AddVehicle = ({
  onSubmit,
  documentList,
  documentUploadProps,
  crimeGroupsData,
  addCrimeGroup,
  toggleAddCrimeGroup,
  updateCrimeGroupsList,
  removeCrimeGroup,
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
  customGalleries,
  customGalleriesLoading,
  addCustomGallery,
  toggleAddCustomGallery,
  updateNewCustomGalleryData,
  form,
  reportOnly,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();
  return (
    <div className={classes.page}>
      <Form<FormData> layout="vertical" onFinish={onSubmit} form={form}>
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
              {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
              <Title style={{ marginBottom: 0 }} level={4}>
                1.
              </Title>
            </Col>
            <Col>
              <Title level={4} style={{ marginBottom: 0, marginLeft: 5 }}>
                {intl.formatMessage({
                  defaultMessage: 'Vehicle Details',
                })}
              </Title>
            </Col>
            <Col>
              <Paragraph
                style={{ marginBottom: 1, marginLeft: 5 }}
                type="secondary"
                italic
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
                name="registration"
                label={intl.formatMessage({
                  defaultMessage: 'Registration',
                })}
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="make"
                label={intl.formatMessage({
                  defaultMessage: 'Make',
                })}
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="model"
                label={intl.formatMessage({
                  defaultMessage: 'Model',
                })}
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="colour"
                label={intl.formatMessage({
                  defaultMessage: 'Colour',
                })}
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
            {adminRights && (
              <Col span={12}>
                <Row gutter={5} align="middle">
                  <Col flex={1}>
                    <Form.Item
                      name="customGalleries"
                      label={intl.formatMessage({
                        defaultMessage: 'Custom Galleries',
                      })}
                      tooltip={intl.formatMessage({
                        defaultMessage:
                          'select any custom galleries that are relevant to this vehicle or add your own.',
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
                            value={el.value}
                            label={el.label}
                            key={el.value}
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
            )}
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
        {adminRights && (
          <Card>
            <Row
              gutter={10}
              align="middle"
              style={{ marginBottom: 20, width: '100%' }}
            >
              <Col>
                {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                <Title style={{ marginBottom: 0 }} level={4}>
                  2.
                </Title>
              </Col>
              <Col>
                <Title style={{ marginBottom: 0 }} level={4}>
                  {intl.formatMessage({
                    defaultMessage: 'Profiles',
                  })}
                </Title>
              </Col>
              <Col style={{ marginRight: 20 }}>
                <Paragraph style={{ marginBottom: 1 }} type="secondary" italic>
                  {intl.formatMessage({
                    defaultMessage:
                      '- Please add the profiles that were involved in the vehicle.',
                  })}
                </Paragraph>
              </Col>
              <Col>
                <Button
                  style={{ color: 'red' }}
                  onClick={toggleLinkIncident}
                  disabled={saving}
                  icon={
                    <FontAwesomeIcon
                      className="button-icon"
                      icon={faPlus}
                      size="lg"
                    />
                  }
                >
                  {intl.formatMessage({
                    defaultMessage: 'Incidents',
                  })}
                </Button>
              </Col>
              <Col>
                <Button
                  style={{ color: 'red' }}
                  onClick={toggleLinkOffender}
                  disabled={saving}
                  icon={
                    <FontAwesomeIcon
                      className="button-icon"
                      icon={faPlus}
                      size="lg"
                    />
                  }
                >
                  {intl.formatMessage({
                    defaultMessage: 'Offenders',
                  })}
                </Button>
              </Col>
              <Col>
                <Button
                  style={{ color: 'red' }}
                  disabled={saving}
                  onClick={toggleAddCrimeGroup}
                  icon={
                    <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
                  }
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
                          incidents={incidentsData}
                          hasNavigation={false}
                          deleteRights={adminRights}
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
                          offenders={offendersData}
                          deleteRights={adminRights}
                          onDeleteOffender={removeOffender}
                          hasNavigation={false}
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
                              key: 'reference',
                              dataIndex: 'reference',
                              title: intl.formatMessage({
                                defaultMessage: 'Alert ID',
                              }),
                            },
                            {
                              key: 'alias',
                              dataIndex: 'alias',
                              title: intl.formatMessage({
                                defaultMessage: 'Alias',
                              }),
                            },
                            {
                              key: 'totalOffenders',
                              dataIndex: 'totalOffenders',
                              title: intl.formatMessage({
                                defaultMessage: 'Members',
                              }),
                            },
                            {
                              key: 'totalIncidents',
                              dataIndex: 'totalIncidents',
                              title: intl.formatMessage({
                                defaultMessage: 'Incidents',
                              }),
                            },
                            {
                              key: 'totalValue',
                              dataIndex: 'totalValue',
                              title: intl.formatMessage({
                                defaultMessage: 'Lost Value',
                              }),
                              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                              render: (value) => `£${value || 0}`,
                            },
                            {
                              key: 'totalRecoveredValue',
                              dataIndex: 'totalRecoveredValue',
                              title: intl.formatMessage({
                                defaultMessage: 'Recovered Value',
                              }),
                              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                              render: (value) => `£${value || 0}`,
                            },
                            {
                              key: 'totalTheftSuccess',
                              dataIndex: 'totalTheftSuccess',
                              title: intl.formatMessage({
                                defaultMessage: 'Loss Rate',
                              }),
                              // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions
                              render: (value) => `${value?.toFixed(0) || 0}%`,
                            },
                            {
                              key: 'delete',
                              title: intl.formatMessage({
                                defaultMessage: 'Delete',
                              }),
                              dataIndex: 'delete',
                              width: 50,
                              render: (_, record) => (
                                <Popconfirm
                                  placement="topLeft"
                                  title={intl.formatMessage({
                                    defaultMessage: 'Remove the crime group?',
                                  })}
                                  onConfirm={() => {
                                    removeCrimeGroup(record.key);
                                  }}
                                  okText={intl.formatMessage({
                                    defaultMessage: 'Yes',
                                  })}
                                  cancelText={intl.formatMessage({
                                    defaultMessage: 'No',
                                  })}
                                  overlayInnerStyle={{ padding: 10 }}
                                >
                                  <Button
                                    disabled={saving}
                                    icon={<FontAwesomeIcon icon={faTrash} />}
                                  />
                                </Popconfirm>
                              ),
                            },
                          ]}
                          dataSource={crimeGroupsData.map((crimeGroup) => ({
                            key: crimeGroup.id,
                            reference: crimeGroup.reference,
                            alias: crimeGroup.alias,
                            totalOffenders: crimeGroup.totalOffenders,
                            totalIncidents: crimeGroup.totalIncidents,
                            totalValue: crimeGroup.totalValue,
                            totalRecoveredValue: crimeGroup.totalRecoveredValue,
                            totalTheftSuccess: crimeGroup.totalTheftSuccess,
                          }))}
                          size="small"
                          pagination={
                            crimeGroupsData && crimeGroupsData.length > 5
                              ? {
                                  pageSize: 5,
                                }
                              : false
                          }
                        />
                      </>
                    ) : null}
                  </>
                ) : (
                  <Row justify="center">
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description={intl.formatMessage({
                        defaultMessage: 'No profiles added yet.',
                      })}
                    />
                  </Row>
                )}
              </Col>
            </Row>
          </Card>
        )}

        {/* images */}
        <Card>
          <Row align="middle" style={{ marginBottom: 20 }}>
            <Col>
              <Title style={{ marginBottom: 0 }} level={4}>
                {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                {adminRights ? '3.' : '2.'}
              </Title>
            </Col>
            <Col>
              <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
                {intl.formatMessage({
                  defaultMessage: 'Images & Other Media',
                })}
              </Title>
            </Col>
            <Col>
              <Paragraph
                style={{ marginBottom: 1, marginLeft: 5 }}
                type="secondary"
                italic
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
                customRequest={customRequest}
                fileList={fileList}
                onChange={imgChange}
                beforeUpload={beforeUpload}
                showUploadList={false}
              >
                <Tooltip
                  title={intl.formatMessage({
                    defaultMessage:
                      'Upload any images you have for the vehicle.',
                  })}
                  placement="bottom"
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
                listType="picture"
                style={{ display: 'flex' }}
                fileList={documentList}
                showUploadList={false}
              >
                <Tooltip
                  title={intl.formatMessage({
                    defaultMessage:
                      'Add documents to the vehicle such as PDFs or videos.',
                  })}
                  placement="bottom"
                >
                  <Button
                    type="text"
                    icon={
                      <FontAwesomeIcon
                        icon={faFileArrowUp}
                        style={{ marginRight: 5 }}
                      />
                    }
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
                  name="images"
                  label={intl.formatMessage({
                    defaultMessage: 'Images',
                  })}
                >
                  <Upload
                    accept=".png,.jpeg,.webp"
                    customRequest={customRequest}
                    listType="picture-card"
                    fileList={fileList}
                    onChange={imgChange}
                    beforeUpload={beforeUpload}
                    // eslint-disable-next-line react/no-unstable-nested-components
                    itemRender={(el, file: Image) => (
                      <Card
                        key={el.key}
                        bodyStyle={{
                          padding: 0,
                          overflow: 'hidden',
                          borderRadius: 10,
                        }}
                      >
                        <div style={{ height: 200, width: '100%' }}>
                          <Button
                            size="small"
                            style={{
                              position: 'absolute',
                              zIndex: 10,
                              padding: '6.5px 10px',
                              top: 5,
                              left: 5,
                            }}
                            onClick={() => toggleEditImage(file)}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>
                          <Popconfirm
                            placement="topLeft"
                            trigger="hover"
                            title={intl.formatMessage({
                              defaultMessage: 'Remove the image?',
                            })}
                            onConfirm={() => onRemoveImage(file.uid)}
                            okText={intl.formatMessage({
                              defaultMessage: 'Yes',
                            })}
                            cancelText={intl.formatMessage({
                              defaultMessage: 'No',
                            })}
                            overlayInnerStyle={{ padding: 10 }}
                          >
                            <Button
                              size="small"
                              style={{
                                position: 'absolute',
                                zIndex: 10,
                                padding: '6.5px 10px',
                                top: 5,
                                left: 45,
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
                    name="documents"
                    label={intl.formatMessage({
                      defaultMessage: 'Other Media',
                    })}
                  >
                    <Upload
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...documentUploadProps}
                      listType="picture"
                      style={{ display: 'flex' }}
                      fileList={documentList}
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
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={intl.formatMessage({
                  defaultMessage: 'No images & media added yet.',
                })}
              />
            </Row>
          )}
        </Card>
        <ImageEditor
          submitImage={onEditImage}
          onClose={toggleEditImage}
          open={!!editImage}
          image={editImage}
          primaryImage={primaryImage}
          setPrimaryImage={setPrimaryImage}
        />
        {/* groups */}
        {groups.length > 1 && (
          <Card>
            <>
              <Row align="bottom" style={{ marginBottom: 30 }}>
                <Col>
                  <Title style={{ marginBottom: 0 }} level={4}>
                    {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                    {adminRights ? '4.' : '3.'}
                  </Title>
                </Col>
                <Col>
                  <Title level={4} style={{ marginBottom: 0, marginLeft: 5 }}>
                    {intl.formatMessage({
                      defaultMessage: 'Who is it visible to?',
                    })}
                  </Title>
                </Col>
                <Col>
                  <Paragraph
                    style={{ marginBottom: 1, marginLeft: 5 }}
                    type="secondary"
                    italic
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
              </Row>
            </>
          </Card>
        )}

        <Form.Item>
          <Row style={{ marginTop: 10 }} gutter={10} justify="end">
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
                type="primary"
                htmlType="submit"
                disabled={saving}
                loading={saving}
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
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add Crime Groups',
        })}
        open={addCrimeGroup}
        width="800"
        onClose={toggleAddCrimeGroup}
        zIndex={1001}
      >
        {addCrimeGroup ? (
          <LinkCrimeGroup
            update={updateCrimeGroupsList}
            crimeGroupIds={crimeGroupsData.map(({ id }) => id)}
            onClose={toggleAddCrimeGroup}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default AddVehicle;
