/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { UpdateType, ViewOffenderQuery } from 'graphql/generated';
import {
  Button,
  Checkbox,
  Col,
  Descriptions,
  Drawer,
  Dropdown,
  Empty,
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
  faCircleInfo,
  faClock,
  faEarth,
  faEdit,
  faLocationDot,
  faMarsAndVenus,
  faPassport,
  faPeopleGroup,
  faTrash,
  faUserClock,
  faUserHair,
  faUsers,
  faUserTag,
} from '@fortawesome/pro-light-svg-icons';
import {
  calcAge,
  getIdSource,
  getLastOffence,
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderRace,
} from 'utils/offender/get-offender-desc';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { calcExpired } from 'utils/offender/get-offender-exclusion';
import OffenderSideList from 'components/offenders/OffenderSideList';
import moment from 'moment';
import LinkIncident from 'components/form-components/offender/LinkIncident';
import { useNavigate } from 'react-router';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import InfiniteScroll from 'react-infinite-scroll-component';
import UpdateContent from 'views/incidents/ViewIncident/Update.view';
import UpdateBar from 'components/form-components/update-bar';
import WatermarkSlide, {
  WatermarkSlideType,
} from 'components/images/WatermartkSlide.view';
import WatermarkImage from 'components/images/WatermarkImage.view';
import useStyles from './ViewOffender.styles';

const { Title, Text } = Typography;

interface Props {
  data: ViewOffenderQuery | undefined;
  loading: boolean;
  saving: boolean;
  openLightbox: (index: number) => void;
  offenderId: string;
  editRights: boolean;
  deleteRights: boolean;
  linkIncident: boolean;
  toggleLinkIncident: () => void;
  updateIncidentList: (value: string) => void;
  optionMenuItems: ItemType[];
  toggleSubscribe: () => void;
  lightboxElements: {
    src: string;
  }[];
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
  setEditUpdate: (value: { id: string; text: string } | null) => void;
  confirmDeleteUpdate: (updateId: string) => void;
  confirmUpdateImages: (images: { id: string; url: string }[]) => void;
  editUpdate: { id: string; text: string } | null;
  selectedImages: string[];
  addImages:
    | {
        id: string;
        url: string;
      }[]
    | null;
  handleEditUpdate: () => void;
  editUpdateInput: string;
  setEditUpdateInput: (value: string) => void;
  toggleSelectImages: (id: string) => void;
  addUpdateImages: (images: { id: string }[]) => void;
  closeAddImages: () => void;
  lightBoxOpen: {
    open: boolean;
    index: number;
  };
}

const ViewOffender = ({
  data,
  loading,
  saving,
  openLightbox,
  offenderId,
  deleteRights,
  editRights,
  linkIncident,
  toggleLinkIncident,
  updateIncidentList,
  optionMenuItems,
  toggleSubscribe,
  lightboxElements,
  scrolledToTop,
  loadMore,
  userId,
  setEditUpdate,
  confirmDeleteUpdate,
  setReplyTo,
  confirmUpdateImages,
  replyTo,
  addImages,
  editUpdate,
  selectedImages,
  editUpdateInput,
  handleEditUpdate,
  setEditUpdateInput,
  addUpdateImages,
  closeAddImages,
  toggleSelectImages,
  lightBoxOpen,
}: Props): JSX.Element => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <div className="page-container">
      <Row wrap={false}>
        <Col>
          <OffenderSideList current={offenderId} />
        </Col>

        <Col flex={1}>
          <div className={classes.viewOffender}>
            <Row className={classes.headerBar}>
              <Col className={classes.detailsHeader} span={12}>
                <Row>
                  <Col className={classes.centerCell} flex={1}>
                    <Title className={classes.headerTitle} level={4}>
                      {data?.offender?.name}
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
                        data?.offender?.subscribed
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
                          data?.offender?.subscribed ? undefined : 'danger'
                        }
                      >
                        <FontAwesomeIcon
                          size="1x"
                          style={{ marginRight: 8 }}
                          icon={
                            data?.offender?.subscribed ? faBellSlash : faBell
                          }
                        />
                        {data?.offender?.subscribed
                          ? 'Un-follow Updates'
                          : 'Follow Updates'}
                      </Button>
                    </Tooltip>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className={classes.content}>
              <Col span={12} className={classes.detailsContent}>
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
                        data?.offender?.images &&
                        data?.offender?.images.length > 0
                          ? undefined
                          : 0,
                    }}
                  >
                    {data?.offender?.images.map((image, i) => (
                      <Col key={image.id}>
                        <div
                          onClick={() => openLightbox(i)}
                          className={classes.image}
                        >
                          <WatermarkImage url={image.optimised} />
                        </div>
                      </Col>
                    ))}
                  </Row>
                )}
                <div className={classes.details}>
                  {loading ? (
                    <Skeleton />
                  ) : (
                    <div>
                      <Title level={4}>{data?.offender?.name}</Title>
                      <Row
                        style={{ marginTop: 10, marginBottom: 10 }}
                        className="offender-tags"
                      >
                        {data?.offender?.tags.map((tag) => (
                          <Col key={tag.id}>
                            <Tag color="red">{tag.name}</Tag>
                          </Col>
                        ))}
                      </Row>
                      <Descriptions column={2}>
                        <Descriptions.Item
                          label={
                            <span>
                              <FontAwesomeIcon
                                className={classes.descIcon}
                                icon={faUserClock}
                              />
                              Age
                            </span>
                          }
                        >
                          {data?.offender?.dateOfBirth
                            ? calcAge(data?.offender?.dateOfBirth)
                            : getOffenderAge(data?.offender?.age)}
                        </Descriptions.Item>

                        <Descriptions.Item
                          label={
                            <span>
                              <FontAwesomeIcon
                                className={classes.descIcon}
                                icon={faMarsAndVenus}
                              />
                              Sex
                            </span>
                          }
                        >
                          {getOffenderGender(data?.offender?.gender)}
                        </Descriptions.Item>

                        <Descriptions.Item
                          label={
                            <span>
                              <FontAwesomeIcon
                                className={classes.descIcon}
                                icon={faUserTag}
                              />
                              Build
                            </span>
                          }
                        >
                          {getOffenderBuild(data?.offender?.build)}
                        </Descriptions.Item>
                        <Descriptions.Item
                          label={
                            <span>
                              <FontAwesomeIcon
                                className={classes.descIcon}
                                icon={faEarth}
                              />
                              Ethnicity
                            </span>
                          }
                        >
                          {getOffenderRace(data?.offender?.race, false)}
                        </Descriptions.Item>
                        {data?.offender?.hair && (
                          <Descriptions.Item
                            label={
                              <span>
                                <FontAwesomeIcon
                                  className={classes.descIcon}
                                  icon={faUserHair}
                                />
                                Hair
                              </span>
                            }
                          >
                            {data?.offender?.hair}
                          </Descriptions.Item>
                        )}
                      </Descriptions>
                      <Descriptions column={1} className={classes.desc}>
                        <Descriptions.Item
                          label={
                            <span>
                              <FontAwesomeIcon
                                className={classes.descIcon}
                                icon={faPassport}
                              />
                              Verified
                            </span>
                          }
                        >
                          {data?.offender?.idVerified ? (
                            <Typography.Text type="success">
                              Verified{' '}
                              {`(${getIdSource(data?.offender.idSource)})`}
                            </Typography.Text>
                          ) : (
                            <Typography.Text type="warning">
                              Not Verified
                            </Typography.Text>
                          )}
                        </Descriptions.Item>
                        {data?.offender?.peculiarities && (
                          <Descriptions.Item
                            label={
                              <span>
                                <FontAwesomeIcon
                                  className={classes.descIcon}
                                  icon={faCircleInfo}
                                />
                                Additional Info
                              </span>
                            }
                          >
                            {data?.offender?.peculiarities}
                          </Descriptions.Item>
                        )}
                        {data?.offender?.incidents &&
                          data?.offender?.incidents.length > 0 && (
                            <Descriptions.Item
                              label={
                                <span>
                                  <FontAwesomeIcon
                                    className={classes.descIcon}
                                    icon={faLocationDot}
                                  />
                                  Last offence
                                </span>
                              }
                            >
                              {
                                getLastOffence(data?.offender?.incidents)
                                  .message
                              }
                            </Descriptions.Item>
                          )}
                        <Descriptions.Item
                          label={
                            <span>
                              <FontAwesomeIcon
                                className={classes.descIcon}
                                icon={faClock}
                              />
                              Last updated
                            </span>
                          }
                        >
                          {moment(data?.offender?.updatedAt || moment()).format(
                            `ddd MMM DD YYYY - HH:mm`
                          )}
                        </Descriptions.Item>
                        <Descriptions.Item
                          label={
                            <span>
                              <FontAwesomeIcon
                                className={classes.descIcon}
                                icon={faPeopleGroup}
                              />
                              Crime Groups
                            </span>
                          }
                        >
                          {data?.offender?.crimeGroups &&
                          data?.offender?.crimeGroups.length > 0
                            ? data?.offender?.crimeGroups.map((group) => (
                                <Tag key={group.id}>CG-{group.reference}</Tag>
                              ))
                            : 'None'}
                        </Descriptions.Item>
                        <Descriptions.Item
                          label={
                            <span>
                              <FontAwesomeIcon
                                className={classes.descIcon}
                                icon={faUsers}
                              />
                              Groups
                            </span>
                          }
                        >
                          {data?.offender?.groups?.map((group) => (
                            <Tag key={group.id}>{group.name}</Tag>
                          ))}
                        </Descriptions.Item>
                      </Descriptions>
                      <Title level={4}>Exclusions</Title>
                      {data?.offender?.bans.length && !loading ? (
                        <Table
                          size="small"
                          loading={loading}
                          pagination={
                            data.offender.bans &&
                            data?.offender.bans.length > 10
                              ? {
                                  pageSize: 10,
                                }
                              : false
                          }
                          className={classes.exclusions}
                          columns={[
                            {
                              key: 'duration',
                              title: 'Duration',
                              dataIndex: 'duration',
                              render: (value) => (
                                <>
                                  <Text>{value}</Text>
                                </>
                              ),
                            },
                            {
                              key: 'status',
                              title: 'Status',
                              dataIndex: 'status',
                              render: (value, record) => (
                                <>
                                  {calcExpired(new Date(record.endDate)) ? (
                                    <Tag
                                      color="red"
                                      style={{
                                        marginLeft: 10,
                                      }}
                                    >
                                      EXPIRED
                                    </Tag>
                                  ) : (
                                    <Tag
                                      color="success"
                                      style={{
                                        marginLeft: 10,
                                      }}
                                    >
                                      ACTIVE
                                    </Tag>
                                  )}
                                </>
                              ),
                            },
                            {
                              key: 'location',
                              title: 'Location',
                              dataIndex: 'location',
                              ellipsis: true,
                            },
                          ]}
                          dataSource={data?.offender?.bans.map((ban) => ({
                            endDate: ban.endDate,
                            duration: `${new Date(
                              ban?.startDate
                            ).toDateString()}  -->  ${new Date(
                              ban?.endDate
                            ).toDateString()}`,
                            status: `${new Date(
                              ban?.startDate
                            ).toDateString()}  -->  ${new Date(
                              ban?.endDate
                            ).toDateString()}`,
                            location: ban.location,
                          }))}
                        />
                      ) : (
                        <Empty
                          description="No exclusions on offender"
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                        />
                      )}
                      <Title level={4}>Addresses</Title>
                      {data?.offender?.addresses.length && !loading ? (
                        <Table
                          size="small"
                          loading={loading}
                          pagination={
                            data.offender.addresses &&
                            data?.offender.addresses.length > 10
                              ? {
                                  pageSize: 10,
                                }
                              : false
                          }
                          className={classes.exclusions}
                          columns={[
                            {
                              key: 'alias',
                              title: 'Alias',
                              dataIndex: 'alias',
                            },
                            {
                              key: 'full',
                              title: 'Full Address',
                              dataIndex: 'full',
                            },
                          ]}
                          dataSource={data?.offender?.addresses.map(
                            (address) => ({
                              key: address.id,
                              alias: address.alias,
                              full: address.full,
                            })
                          )}
                        />
                      ) : (
                        <Empty
                          description="No addresses for this offender"
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                        />
                      )}
                      <Title level={4}>Incidents</Title>
                      {data?.offender?.incidents.length && !loading ? (
                        <Table
                          size="small"
                          loading={loading}
                          columns={[
                            {
                              key: 'types',
                              title: 'Types',
                              dataIndex: 'types',
                            },
                            {
                              key: 'date',
                              title: 'Date',
                              dataIndex: 'date',
                            },
                            {
                              key: 'location',
                              title: 'Location',
                              dataIndex: 'location',
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
                                        `/app/incidents/view/${record.key}`
                                      )
                                    }
                                  />
                                </Button>
                              ),
                            },
                          ]}
                          dataSource={data?.offender?.incidents.map(
                            (incident) => ({
                              types: incident.crimeTypes.map(
                                (type, index) =>
                                  `${index > 0 ? ' ' : ''}${type.name}`
                              ),
                              date: incident.dayTime,
                              location: incident.createdBy.businesses[0]?.name,
                              key: incident.id,
                            })
                          )}
                          pagination={
                            data?.offender?.incidents &&
                            data?.offender?.incidents.length > 10
                              ? {
                                  pageSize: 10,
                                }
                              : false
                          }
                        />
                      ) : (
                        <Empty
                          description="No incidents on offender"
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                        />
                      )}
                      {data?.offender?.vehicles.length && !loading ? (
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
                            dataSource={data?.offender?.vehicles.map(
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
                              data?.offender?.vehicles &&
                              data?.offender?.vehicles.length > 5
                                ? {
                                    pageSize: 5,
                                  }
                                : false
                            }
                            rowClassName={classes.offenderRow}
                          />
                        </div>
                      ) : null}
                      {data?.offender?.vehicles.length && !loading ? (
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
                                title: 'Alert ID',
                              },
                              {
                                key: 'alias',
                                dataIndex: 'alias',
                                title: 'Alias',
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
                            dataSource={data?.offender?.crimeGroups.map(
                              (crimeGroup) => ({
                                key: crimeGroup.id,
                                reference: crimeGroup.reference,
                                alias: crimeGroup.alias,
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
                              data?.offender?.vehicles &&
                              data?.offender?.vehicles.length > 5
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
                    dataLength={data?.offender?.updates?.length || 0}
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
                    {data?.offender?.updates.map((update) => (
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
                    offenderId={offenderId}
                    setReplyTo={setReplyTo}
                    subscribed={data?.offender?.subscribed || false}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

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
            incidentIds={data?.offender?.incidents.map(({ id }) => id) || []}
          />
        ) : (
          <div />
        )}
      </Drawer>

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
              <div style={{ width: 200, height: 200, marginBottom: 10 }}>
                <WatermarkImage url={image.url} />
              </div>
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
      <Lightbox
        open={lightBoxOpen.open}
        close={() => openLightbox(0)}
        plugins={[Zoom]}
        index={lightBoxOpen.index}
        slides={lightboxElements}
        controller={{
          closeOnBackdropClick: true,
        }}
        render={{
          slide: (slide: WatermarkSlideType) => (
            <WatermarkSlide slide={slide} />
          ),
        }}
      />
    </div>
  );
};

export default ViewOffender;
