/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import {
  Age,
  Build,
  Gender,
  Race,
  UpdateType,
  ViewIncidentQuery,
} from 'graphql/generated';
import {
  Button,
  Checkbox,
  Col,
  Descriptions,
  Drawer,
  Dropdown,
  Empty,
  Image,
  Input,
  Menu,
  Modal,
  Popover,
  Row,
  Skeleton,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUpRightFromSquare,
  faBell,
  faBellSlash,
  faChevronDown,
  faEdit,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import {
  calcAge,
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderRace,
} from 'utils/offender/get-offender-desc';
import { Link } from 'react-router-dom';
import IncidentSideList from 'components/incidents/IncidentSideList';
import UpdateBar from 'components/form-components/update-bar';
import LinkOffender from 'components/form-components/incident/offender/AddExistingOffender';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { useNavigate } from 'react-router';
import InfiniteScroll from 'react-infinite-scroll-component';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import UpdateContent from './Update.view';
import useStyles from './ViewIncident.styles';

const { Title, Paragraph } = Typography;

interface OffenderData {
  id: string;
  name?: string | null;
  age?: Age | null;
  gender?: Gender | null;
  race?: Race | null;
  build?: Build | null;
  dateOfBirth?: Date | null;
  hair?: string | null;
  dateSource?: string | null;
  peculiarities?: string | null;
  approved?: boolean | null;
  groups?:
    | {
        id: string;
        name: string;
      }[]
    | undefined;
  images?: {
    id: string;
    optimised?: string | null;
    url?: string | null;
    fileName?: string | null;
    type?: string | null;
    new?: boolean;
  }[];
  imageUid?: string[] | undefined;
}

interface Props {
  data: ViewIncidentQuery | undefined;
  loading: boolean;
  saving: boolean;
  openLightbox: (index: number) => void;
  incidentId: string;
  editRights: boolean;
  deleteRights: boolean;
  linkOffender: boolean;
  toggleLinkOffender: () => void;
  updateOffendersList: (value: OffenderData) => void;
  scrolledToTop: () => void;
  loadMore: boolean;
  userId: string;
  replyTo: {
    id: string;
    text: string;
    createdAt: string;
    createdBy: string;
  } | null;
  setReplyTo: (
    value: {
      id: string;
      text: string;
      createdAt: string;
      createdBy: string;
    } | null
  ) => void;
  confirmUpdateImages: (images: { id: string; url: string }[]) => void;
  addUpdateImages: (images: { id: string }[]) => void;
  addImages:
    | {
        id: string;
        url: string;
      }[]
    | null;
  closeAddImages: () => void;
  toggleSubscribe: () => void;
  toggleSelectImages: (id: string) => void;
  selectedImages: string[];
  confirmDeleteUpdate: (updateId: string) => void;
  editUpdate: { id: string; text: string } | null;
  setEditUpdate: (value: { id: string; text: string } | null) => void;
  handleEditUpdate: () => void;
  editUpdateInput: string;
  setEditUpdateInput: (value: string) => void;
  optionMenuItems: ItemType[];
  lightboxElements: {
    src: string;
  }[];
  lightBoxOpen: {
    open: boolean;
    index: number;
  };
}

const ViewIncident = ({
  data,
  loading,
  saving,
  openLightbox,
  incidentId,
  deleteRights,
  editRights,
  linkOffender,
  toggleLinkOffender,
  updateOffendersList,
  loadMore,
  scrolledToTop,
  userId,
  replyTo,
  setReplyTo,
  confirmUpdateImages,
  addImages,
  addUpdateImages,
  closeAddImages,
  toggleSubscribe,
  selectedImages,
  toggleSelectImages,
  confirmDeleteUpdate,
  editUpdate,
  editUpdateInput,
  handleEditUpdate,
  setEditUpdate,
  setEditUpdateInput,
  optionMenuItems,
  lightboxElements,
  lightBoxOpen,
}: Props): JSX.Element => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <Row wrap={false}>
        <Col>
          <IncidentSideList current={incidentId} />
        </Col>

        <Col flex={1}>
          <div className={classes.viewIncident}>
            <Row className={classes.headerBar}>
              <Col className={classes.detailsHeader} span={12}>
                <Row>
                  <Col className={classes.centerCell} flex={1}>
                    <Title className={classes.headerTitle} level={4}>
                      {data?.incident?.subject}
                    </Title>
                  </Col>
                  {(editRights || deleteRights) && (
                    <Dropdown overlay={<Menu items={optionMenuItems} />}>
                      <Button type="text">
                        <Space>
                          Options
                          <FontAwesomeIcon icon={faChevronDown} />
                        </Space>
                      </Button>
                    </Dropdown>
                  )}
                </Row>
              </Col>
              <Col span={12}>
                <Row>
                  <Col className={classes.centerCell} flex={1}>
                    <Title className={classes.headerTitle} level={4}>
                      Updates
                    </Title>
                  </Col>
                  <Col>
                    <Tooltip
                      title={
                        data?.incident?.subscribed
                          ? 'Stop getting notified about updates.'
                          : 'Get notified about updates.'
                      }
                    >
                      <Button
                        onClick={toggleSubscribe}
                        disabled={saving}
                        loading={saving}
                        type="text"
                        color={
                          data?.incident?.subscribed ? undefined : 'danger'
                        }
                      >
                        <FontAwesomeIcon
                          size="1x"
                          style={{ marginRight: 8 }}
                          icon={
                            data?.incident?.subscribed ? faBellSlash : faBell
                          }
                        />
                        {data?.incident?.subscribed
                          ? 'Un-follow Updates'
                          : 'Follow Updates'}
                      </Button>
                    </Tooltip>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className={classes.content}>
              <Col className={classes.detailsContent} span={12}>
                {loading ? (
                  <Skeleton />
                ) : (
                  <Row
                    gutter={8}
                    justify="start"
                    align="middle"
                    wrap={false}
                    className={classes.images}
                    style={{
                      height:
                        data?.incident?.images &&
                        data?.incident?.images.length > 0
                          ? undefined
                          : 0,
                    }}
                  >
                    {data?.incident?.images.map((image, i) => (
                      <Col key={image.id}>
                        <div
                          onClick={() => openLightbox(i)}
                          className={classes.image}
                          style={{ backgroundImage: `url(${image.optimised})` }}
                        />
                      </Col>
                    ))}
                  </Row>
                )}
                <div className={classes.details}>
                  {loading ? (
                    <Skeleton />
                  ) : (
                    <div className="incident-tab-content">
                      <Row className="incident-tags">
                        {data?.incident?.crimeTypes.map((crimeType) => (
                          <Col key={crimeType.id}>
                            <Tag color="red">{crimeType.name}</Tag>
                          </Col>
                        ))}
                      </Row>{' '}
                      <Paragraph type="secondary" style={{ marginTop: 10 }}>
                        {data?.incident?.description}
                      </Paragraph>
                      <Descriptions column={1} className={classes.desc}>
                        <Descriptions.Item
                          className={classes.detail}
                          label="Alert ID"
                        >
                          {data?.incident?.reference}
                          {data?.incident?.policeRef
                            ? ` / Crime Ref: ${data?.incident?.policeRef}`
                            : ''}
                        </Descriptions.Item>
                        <Descriptions.Item
                          className={classes.detail}
                          label={<span>Created At</span>}
                        >
                          {data?.incident?.dayTime}
                        </Descriptions.Item>
                        <Descriptions.Item
                          className={classes.detail}
                          label={<span>Created By</span>}
                        >
                          {`${data?.incident?.createdBy.fullName} -
                              ${data?.incident?.createdBy.businesses[0]?.name}`}
                        </Descriptions.Item>
                        <Descriptions.Item
                          className={classes.detail}
                          label={<span>Value</span>}
                        >
                          {data?.incident?.totalValue ? '£' : ''}
                          {data?.incident?.totalValue || 'Unknown'}
                        </Descriptions.Item>
                        <Descriptions.Item
                          className={classes.detail}
                          label={<span>Recovered Value</span>}
                        >
                          {data?.incident?.totalRecoveredValue ? '£' : ''}
                          {data?.incident?.totalRecoveredValue || 'Unknown'}
                        </Descriptions.Item>
                        <Descriptions.Item
                          className={classes.detail}
                          label={<span>Report To Police</span>}
                        >
                          {data?.incident?.policeReported ? 'Yes' : 'No'}
                        </Descriptions.Item>
                        <Descriptions.Item
                          className={classes.detail}
                          label={<span>Police Involved</span>}
                        >
                          {data?.incident?.policeInvolved ? 'Yes' : 'No'}
                        </Descriptions.Item>
                        <Descriptions.Item
                          className={classes.detail}
                          label={<span>Business</span>}
                        >
                          {editRights ? (
                            <Link
                              to={`/app/scheme-settings/business/view/${data?.incident?.business?.id}`}
                            >
                              {data?.incident?.business?.name}
                            </Link>
                          ) : (
                            data?.incident?.business?.name
                          )}
                        </Descriptions.Item>
                        <Descriptions.Item
                          className={classes.detail}
                          label={<span>Groups</span>}
                        >
                          {data?.incident?.groups.map((group) => (
                            <Tag key={group.id}>{group.name}</Tag>
                          ))}
                        </Descriptions.Item>
                      </Descriptions>
                      <div style={{ marginBottom: 20 }}>
                        <Title level={4}>Goods</Title>
                        <Table
                          columns={[
                            {
                              title: 'Name',
                              dataIndex: 'name',
                              key: 'name',
                            },
                            {
                              title: 'Value',
                              dataIndex: 'value',
                              key: 'value',
                              render: (value) => `£${value.toFixed(2)}`,
                            },
                            {
                              title: 'Recovered Value',
                              dataIndex: 'recoveredValue',
                              key: 'recoveredValue',
                              render: (value) => `£${value.toFixed(2)}`,
                            },
                          ]}
                          dataSource={data?.incident?.incidentItems.map(
                            (item) => ({
                              key: item.id,
                              name: item.name,
                              value: item.value,
                              recoveredValue: item.recoveredValue,
                            })
                          )}
                          size="small"
                          rowClassName={classes.offenderRow}
                          pagination={false}
                          summary={(tableData) => {
                            const totalValue = tableData
                              .map((item) => item.value)
                              .reduce((a, b) => a + b);
                            const totalRecovered = tableData
                              .map((item) => item.recoveredValue)
                              .reduce((a, b) => a + b);

                            return (
                              <>
                                <Table.Summary.Row>
                                  <Table.Summary.Cell index={0}>
                                    Total:
                                  </Table.Summary.Cell>
                                  <Table.Summary.Cell index={1}>
                                    £{totalValue.toFixed(2)}
                                  </Table.Summary.Cell>
                                  <Table.Summary.Cell index={1}>
                                    £{totalRecovered.toFixed(2)}
                                  </Table.Summary.Cell>
                                </Table.Summary.Row>
                              </>
                            );
                          }}
                        />
                      </div>
                      <div className="incident-offender-container">
                        {/* <Divider>Offender</Divider> */}
                        <Title level={4}>Offenders</Title>
                        {data?.incident?.offenders.length && !loading ? (
                          <Table
                            columns={[
                              {
                                title: 'Name',
                                dataIndex: 'name',
                                key: 'name',
                              },
                              {
                                title: 'Gender',
                                dataIndex: 'gender',
                                key: 'gender',
                              },
                              {
                                title: 'Ethnicity',
                                dataIndex: 'ethnicity',
                                key: 'ethnicity',
                              },
                              {
                                title: 'Age',
                                dataIndex: 'age',
                                key: 'age',
                              },
                              {
                                title: 'Build',
                                dataIndex: 'build',
                                key: 'build',
                              },
                              {
                                title: '',
                                dataIndex: 'actions',
                                key: 'actions',
                                render: (_, record) => (
                                  <Button type="text" size="small">
                                    <FontAwesomeIcon
                                      icon={faArrowUpRightFromSquare}
                                      onClick={() =>
                                        navigate(
                                          `/app/offenders/view/${record.key}`
                                        )
                                      }
                                    />
                                  </Button>
                                ),
                              },
                            ]}
                            dataSource={data?.incident?.offenders.map(
                              (offender) => ({
                                key: offender.id,
                                name: offender.name,
                                gender: getOffenderGender(offender.gender),
                                ethnicity: getOffenderRace(offender.race, true),
                                age: offender.dateOfBirth
                                  ? calcAge(offender.dateOfBirth)
                                  : getOffenderAge(offender.age),
                                build: getOffenderBuild(offender.build),
                              })
                            )}
                            size="small"
                            pagination={
                              data?.incident?.offenders &&
                              data?.incident?.offenders.length > 5
                                ? {
                                    pageSize: 5,
                                  }
                                : false
                            }
                            rowClassName={classes.offenderRow}
                          />
                        ) : (
                          <Empty
                            description="No offenders on incident"
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                          />
                        )}
                      </div>
                      {data?.incident?.vehicles.length && !loading ? (
                        <div className="incident-offender-container">
                          {/* <Divider>Offender</Divider> */}
                          <Title level={4} style={{ marginTop: 20 }}>
                            Vehicles
                          </Title>
                          <Table
                            columns={[
                              {
                                key: 'make',
                                dataIndex: 'make',
                                title: 'Make',
                              },
                              {
                                key: 'colour',
                                dataIndex: 'colour',
                                title: 'Colour',
                              },
                              {
                                key: 'model',
                                dataIndex: 'model',
                                title: 'Model',
                              },
                              {
                                key: 'registration',
                                dataIndex: 'registration',
                                title: 'Registration',
                              },

                              {
                                title: '',
                                dataIndex: 'actions',
                                key: 'actions',
                                render: (_, record) => (
                                  <Button type="text" size="small">
                                    <FontAwesomeIcon
                                      icon={faArrowUpRightFromSquare}
                                      onClick={() =>
                                        navigate(
                                          `/app/vehicles/view/${record.key}`
                                        )
                                      }
                                    />
                                  </Button>
                                ),
                              },
                            ]}
                            dataSource={data?.incident?.vehicles.map(
                              (vehicle) => ({
                                key: vehicle.id,
                                make: vehicle.make,
                                colour: vehicle.colour,
                                model: vehicle.model,
                                registration: vehicle.registration,
                              })
                            )}
                            size="small"
                            pagination={
                              data?.incident?.vehicles &&
                              data?.incident?.vehicles.length > 5
                                ? {
                                    pageSize: 5,
                                  }
                                : false
                            }
                            rowClassName={classes.offenderRow}
                          />
                        </div>
                      ) : null}
                      {data?.incident?.vehicles.length && !loading ? (
                        <div className="incident-offender-container">
                          {/* <Divider>Offender</Divider> */}
                          <Title level={4} style={{ marginTop: 20 }}>
                            Crime Groups
                          </Title>
                          <Table
                            columns={[
                              {
                                key: 'reference',
                                dataIndex: 'reference',
                                title: 'Reference',
                              },
                              {
                                key: 'totalOffenders',
                                dataIndex: 'totalOffenders',
                                title: 'Members',
                              },
                              {
                                key: 'totalIncidents',
                                dataIndex: 'totalIncidents',
                                title: 'Incidents',
                              },
                              {
                                key: 'totalValue',
                                dataIndex: 'totalValue',
                                title: 'Lost Value',
                                render: (value) => `£${value || 0}`,
                              },
                              // {
                              //   key: 'totalRecoveredValue',
                              //   dataIndex: 'totalRecoveredValue',
                              //   title: 'Recovered Value',
                              //   render: (value) => `£${value || 0}`,
                              // },
                              // {
                              //   key: 'totalTheftSuccess',
                              //   dataIndex: 'totalTheftSuccess',
                              //   title: 'Success Rate',
                              //   render: (value) => `${value?.toFixed(0) || 0}%`,
                              // },

                              {
                                title: '',
                                dataIndex: 'actions',
                                key: 'actions',
                                render: (_, record) => (
                                  <Button type="text" size="small">
                                    <FontAwesomeIcon
                                      icon={faArrowUpRightFromSquare}
                                      onClick={() =>
                                        navigate(
                                          `/app/crime-groups/view/${record.key}`
                                        )
                                      }
                                    />
                                  </Button>
                                ),
                              },
                            ]}
                            dataSource={data?.incident?.crimeGroups.map(
                              (crimeGroup) => ({
                                key: crimeGroup.id,
                                reference: crimeGroup.reference,
                                totalOffenders: crimeGroup.totalOffenders,
                                totalIncidents: crimeGroup.totalIncidents,
                                totalValue: crimeGroup.totalValue,
                                // totalRecoveredValue:
                                //   crimeGroup.totalRecoveredValue,
                                // totalTheftSuccess: crimeGroup.totalTheftSuccess,
                              })
                            )}
                            size="small"
                            pagination={
                              data?.incident?.vehicles &&
                              data?.incident?.vehicles.length > 5
                                ? {
                                    pageSize: 5,
                                  }
                                : false
                            }
                            rowClassName={classes.offenderRow}
                          />
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              </Col>
              <Col span={12}>
                <div className={classes.updatesContainer}>
                  <InfiniteScroll
                    height="calc(100vh - 225px)"
                    className="update-scroll"
                    initialScrollY={0}
                    dataLength={data?.incident?.updates?.length || 0}
                    next={scrolledToTop}
                    hasMore={loadMore}
                    inverse
                    style={{
                      justifyContent: 'end',
                      // display: 'flex',
                      flexDirection: 'column',
                    }}
                    loader={
                      <div className="message-date">
                        <div className="date-line" />
                        <div className="date">Loading...</div>
                        <div className="date-line" />
                      </div>
                    }
                  >
                    {data?.incident?.updates.map((update) => (
                      <div key={update.id} className="update-wrapper">
                        {editRights && update.type !== UpdateType.System ? (
                          <Popover
                            trigger="click"
                            placement={
                              update.createdBy.id === userId ? 'left' : 'right'
                            }
                            overlayClassName="message-popover"
                            content={
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                }}
                              >
                                <Button
                                  type="text"
                                  disabled={saving}
                                  icon={
                                    <FontAwesomeIcon
                                      style={{ marginRight: 5 }}
                                      icon={faEdit}
                                      size="lg"
                                    />
                                  }
                                  onClick={() => {
                                    setEditUpdate({
                                      id: update.id,
                                      text: update.text || '',
                                    });
                                  }}
                                  size="small"
                                >
                                  Edit Update
                                </Button>
                                <Button
                                  type="text"
                                  disabled={saving}
                                  icon={
                                    <FontAwesomeIcon
                                      style={{ marginRight: 5 }}
                                      icon={faTrash}
                                      size="lg"
                                    />
                                  }
                                  onClick={() => {
                                    confirmDeleteUpdate(update.id);
                                  }}
                                  size="small"
                                >
                                  Delete Update
                                </Button>
                              </div>
                            }
                          >
                            <div>
                              <UpdateContent
                                userId={userId}
                                content={update.text}
                                createdAt={update.createdAt}
                                from={update.createdBy}
                                id={update.id}
                                images={update.images}
                                incidents={update.linkedIncidents}
                                offenders={update.linkedOffenders}
                                showDate
                                showUser
                              />
                            </div>
                          </Popover>
                        ) : (
                          <UpdateContent
                            userId={userId}
                            content={update.text}
                            createdAt={update.createdAt}
                            from={update.createdBy}
                            id={update.id}
                            images={update.images}
                            incidents={update.linkedIncidents}
                            offenders={update.linkedOffenders}
                            showDate
                            showUser
                          />
                        )}
                        {update.replies.map((reply) => (
                          <div className="update-reply">
                            {editRights ? (
                              <Popover
                                trigger="click"
                                placement={
                                  reply.createdBy.id === userId
                                    ? 'left'
                                    : 'right'
                                }
                                overlayClassName="message-popover"
                                content={
                                  <div
                                    style={{
                                      display: 'flex',
                                      flexDirection: 'column',
                                    }}
                                  >
                                    <Button
                                      type="text"
                                      disabled={saving}
                                      icon={
                                        <FontAwesomeIcon
                                          style={{ marginRight: 5 }}
                                          icon={faEdit}
                                          size="lg"
                                        />
                                      }
                                      onClick={() => {
                                        setEditUpdate({
                                          id: reply.id,
                                          text: reply.text || '',
                                        });
                                      }}
                                      size="small"
                                    >
                                      Edit Update
                                    </Button>
                                    <Button
                                      type="text"
                                      disabled={saving}
                                      icon={
                                        <FontAwesomeIcon
                                          style={{ marginRight: 5 }}
                                          icon={faTrash}
                                          size="lg"
                                        />
                                      }
                                      onClick={() => {
                                        confirmDeleteUpdate(reply.id);
                                      }}
                                      size="small"
                                    >
                                      Delete Update
                                    </Button>
                                  </div>
                                }
                              >
                                <div>
                                  <UpdateContent
                                    userId={userId}
                                    content={reply.text}
                                    createdAt={reply.createdAt}
                                    from={reply.createdBy}
                                    id={reply.id}
                                    images={reply.images}
                                    incidents={reply.linkedIncidents}
                                    offenders={reply.linkedOffenders}
                                    showDate
                                    showUser
                                  />
                                </div>
                              </Popover>
                            ) : (
                              <UpdateContent
                                userId={userId}
                                content={reply.text}
                                createdAt={reply.createdAt}
                                from={reply.createdBy}
                                id={reply.id}
                                images={reply.images}
                                incidents={reply.linkedIncidents}
                                offenders={reply.linkedOffenders}
                                showDate
                                showUser
                              />
                            )}
                          </div>
                        ))}
                        <Row>
                          {update.type !== UpdateType.System && (
                            <Col>
                              <Button
                                style={{
                                  marginLeft:
                                    update.replies.length > 0 ? 48 : 0,
                                }}
                                type="text"
                                danger
                                size="small"
                                onClick={() =>
                                  setReplyTo({
                                    createdAt: update.createdAt,
                                    createdBy:
                                      userId === update.createdBy.id
                                        ? 'You'
                                        : `${update.createdBy.fullName} - ${update.createdBy.businesses[0]?.name}`,
                                    id: update.id,
                                    text: update.text || '',
                                  })
                                }
                              >
                                Reply
                              </Button>
                            </Col>
                          )}
                          {update.type === UpdateType.Image && editRights && (
                            <Col>
                              <Button
                                style={{
                                  marginLeft:
                                    update.replies.length > 0 ? 48 : 0,
                                }}
                                type="text"
                                danger
                                size="small"
                                onClick={() =>
                                  confirmUpdateImages(
                                    update.images.map(({ id, optimised }) => ({
                                      id,
                                      url: optimised || '',
                                    }))
                                  )
                                }
                              >
                                Add Image To Incident
                              </Button>
                            </Col>
                          )}
                        </Row>
                      </div>
                    ))}
                  </InfiniteScroll>
                  <UpdateBar
                    replyTo={replyTo}
                    incidentId={incidentId}
                    setReplyTo={setReplyTo}
                    subscribed={data?.incident?.subscribed || false}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <Modal
        title="Select Images To Add"
        visible={addImages !== null}
        onOk={() => addUpdateImages(selectedImages.map((id) => ({ id })))}
        onCancel={closeAddImages}
        width={addImages ? addImages.length * 250 : 400}
        okText="Add Images"
      >
        <Row justify="center" gutter={8}>
          {addImages?.map((image) => (
            <Col
              key={image.id}
              style={{
                position: 'relative',
              }}
            >
              <Checkbox
                onChange={() => toggleSelectImages(image.id)}
                checked={selectedImages.includes(image.id)}
                style={{
                  position: 'absolute',
                  top: 5,
                  left: 10,
                  zIndex: 100,
                }}
              />
              <Image
                src={image.url}
                style={{ maxWidth: 200, marginBottom: 10 }}
              />
            </Col>
          ))}
        </Row>
      </Modal>

      <Modal
        title="Edit Update Content"
        visible={editUpdate !== null}
        onOk={handleEditUpdate}
        onCancel={() => setEditUpdate(null)}
        okText="Save"
      >
        <Input
          value={editUpdateInput}
          onChange={(e) => setEditUpdateInput(e.target.value)}
        />
      </Modal>

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
            offenderIds={data?.incident?.offenders.map(({ id }) => id)}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Lightbox
        open={lightBoxOpen.open}
        close={() => openLightbox(0)}
        plugins={[Zoom]}
        index={lightBoxOpen.index}
        slides={lightboxElements}
        controller={{
          closeOnBackdropClick: true,
        }}
      />
    </div>
  );
};

export default ViewIncident;
