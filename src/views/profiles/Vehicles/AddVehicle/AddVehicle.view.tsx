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
            id: '7vPZdr',
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
                  id: 'uEyWls',
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
                  id: 'sTEPUO',
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
                  id: 'qv7ied',
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
                  id: '6AAM0P',
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
                  id: 'rhSI1/',
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
                  id: '+e8vAT',
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
                        id: 'bzpFEk',
                      })}
                      tooltip={intl.formatMessage({
                        defaultMessage:
                          'select any custom galleries that are relevant to this vehicle or add your own.',
                        id: 'sgPUe8',
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
                    id: '2zJXeA',
                    defaultMessage: 'Profiles',
                  })}
                </Title>
              </Col>
              <Col style={{ marginRight: 20 }}>
                <Paragraph style={{ marginBottom: 1 }} type="secondary" italic>
                  {intl.formatMessage({
                    id: 'PBMkNx',
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
                    id: 'mtr3R4',
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
                    id: 'xb54TN',
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
                    id: 'a0aLil',
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
                            id: 'mtr3R4',
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
                            id: 'xb54TN',
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
                            id: 'a0aLil',
                            defaultMessage: 'Crime Groups',
                          })}
                        </Divider>
                        <Table
                          columns={[
                            {
                              key: 'reference',
                              dataIndex: 'reference',
                              title: intl.formatMessage({
                                id: 'k8ZNgH',
                                defaultMessage: 'Alert ID',
                              }),
                            },
                            {
                              key: 'alias',
                              dataIndex: 'alias',
                              title: intl.formatMessage({
                                id: 'Ri9jA7',
                                defaultMessage: 'Alias',
                              }),
                            },
                            {
                              key: 'totalOffenders',
                              dataIndex: 'totalOffenders',
                              title: intl.formatMessage({
                                id: '+a+2ug',
                                defaultMessage: 'Members',
                              }),
                            },
                            {
                              key: 'totalIncidents',
                              dataIndex: 'totalIncidents',
                              title: intl.formatMessage({
                                id: 'mtr3R4',
                                defaultMessage: 'Incidents',
                              }),
                            },
                            {
                              key: 'totalValue',
                              dataIndex: 'totalValue',
                              title: intl.formatMessage({
                                id: '3YYDlc',
                                defaultMessage: 'Lost Value',
                              }),
                              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                              render: (value) => `£${value || 0}`,
                            },
                            {
                              key: 'totalRecoveredValue',
                              dataIndex: 'totalRecoveredValue',
                              title: intl.formatMessage({
                                id: 'bGwFFv',
                                defaultMessage: 'Recovered Value',
                              }),
                              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                              render: (value) => `£${value || 0}`,
                            },
                            {
                              key: 'totalTheftSuccess',
                              dataIndex: 'totalTheftSuccess',
                              title: intl.formatMessage({
                                id: 'IaZkrc',
                                defaultMessage: 'Success Rate',
                              }),
                              // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions
                              render: (value) => `${value?.toFixed(0) || 0}%`,
                            },
                            {
                              key: 'delete',
                              title: intl.formatMessage({
                                id: 'K3r6DQ',
                                defaultMessage: 'Delete',
                              }),
                              dataIndex: 'delete',
                              width: 50,
                              render: (_, record) => (
                                <Popconfirm
                                  placement="topLeft"
                                  title={intl.formatMessage({
                                    id: 'Ek+T43',
                                    defaultMessage: 'Remove the crime group?',
                                  })}
                                  onConfirm={() => {
                                    removeCrimeGroup(record.key);
                                  }}
                                  okText={intl.formatMessage({
                                    id: 'a5msuh',
                                    defaultMessage: 'Yes',
                                  })}
                                  cancelText={intl.formatMessage({
                                    id: 'oUWADl',
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
                        id: 'PNTO/p',
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
                  id: 'OR3nwV',
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
                  id: 'mvb6VV',
                })}
              </Paragraph>
            </Col>
            <Col style={{ marginLeft: 30 }}>
              <Upload
                accept=".png,.jpeg,.webp"
                action={import.meta.env.VITE_APP_IMAGE_UPLOAD_ENDPOINT}
                fileList={fileList}
                onChange={imgChange}
                beforeUpload={beforeUpload}
                showUploadList={false}
              >
                <Tooltip
                  title={intl.formatMessage({
                    defaultMessage:
                      'Upload any images you have for the vehicle.',
                    id: 'Jp+g66',
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
                      id: 'MntrZe',
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
                    id: 'oLjdVh',
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
                      id: 'Kc9MAV',
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
                    id: 'Fip4H8',
                  })}
                >
                  <Upload
                    accept=".png,.jpeg,.webp"
                    action={import.meta.env.VITE_APP_IMAGE_UPLOAD_ENDPOINT}
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
                              id: 'bRha+v',
                            })}
                            onConfirm={() => onRemoveImage(file.uid)}
                            okText={intl.formatMessage({
                              defaultMessage: 'Yes',
                              id: 'a5msuh',
                            })}
                            cancelText={intl.formatMessage({
                              defaultMessage: 'No',
                              id: 'oUWADl',
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
                      id: 'w9BFSc',
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
                  id: 'EgTScc',
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
                      id: 'wvg3HJ',
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
                      id: 'aLOtmG',
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
                    id: '47FYwb',
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
                  id: 'jvo0vs',
                })}
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
          id: 'mYgStg',
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
