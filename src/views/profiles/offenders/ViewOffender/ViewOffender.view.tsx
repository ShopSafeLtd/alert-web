/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import type {
  AssociatedOffendersQuery,
  ViewOffenderQuery,
} from 'graphql/generated';
import { UpdateType } from 'graphql/generated';
import {
  Badge,
  Button,
  Card,
  Checkbox,
  Col,
  Descriptions,
  Drawer,
  Empty,
  Input,
  Modal,
  Popover,
  Row,
  Skeleton,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faBellSlash,
  faCircleInfo,
  faClock,
  faEarth,
  faEdit,
  faMarsAndVenus,
  faPassport,
  faTrash,
  faUserClock,
  faUserHair,
  faUsers,
  faUser,
  faUserTag,
  faHeadSide,
  faComment,
} from '@fortawesome/pro-light-svg-icons';
import {
  calcAge,
  getIdSource,
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderHeight,
  getOffenderRace,
} from 'utils/offender/get-offender-desc';
import { calcExpired } from 'utils/offender/get-offender-exclusion';
import OffenderSideList from 'components/offenders/OffenderSideList';
import moment from 'moment';
import LinkIncident from 'components/form-components/linkOptions/LinkIncident';
import InfiniteScroll from 'react-infinite-scroll-component';
import UpdateContent from 'views/incidents/ViewIncident/Update.view';
import UpdateBar from 'components/MessageInput/UpdateBar';
import WatermarkImage from 'components/images/WatermarkImage.view';
import IncidentTable from 'components/tables/IncidentTable';
import VehicleTable from 'components/tables/VehicleTable';
import CrimeGroupTable from 'components/tables/CrimeGroupTable';
import { Link } from 'react-router-dom';
import MapCard from 'components/map/MapCard/MapCard.view';
import CheckTags from 'components/form-components/check-tags/CheckTags.view';
import AssociatedOffender from 'components/offenders/AssociatedOffender';
import { calcDuration } from 'utils';
import LightBox from 'components/images/LightBox/LightBox.container';
import OffenderMatches from 'components/rekognition/OffenderMatches/OffenderMatches.container';
import formatCalendar from 'utils/format-calendar-24h';
import type { ViewAssociate } from './useViewOffender';
import useStyles from './ViewOffender.styles';

const { Title, Text, Paragraph } = Typography;
interface TableItem {
  description: string | null | undefined;
  endDate: Date;
  location?: string | undefined;
  activeDay?: string | undefined;
}
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
  toggleSubscribe: () => void;
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
  optionRowShow: boolean;
  setOptionRowShow: (value: boolean) => void;
  publicOffenderDOB: boolean;
  onDelete: (offenderId: string) => void;
  associatesData: AssociatedOffendersQuery | undefined;
  onAssociateFilterChange: (value: string[]) => void;
  associateFilters: (string | undefined)[];
  associatesLoading: boolean;
  viewAssociate: ViewAssociate | null;
  toggleViewAssociate: (value: ViewAssociate | null) => void;
  viewMatches: string | null;
  toggleViewMatches: (offenderId: string | null) => void;
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
  toggleSubscribe,
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
  optionRowShow,
  setOptionRowShow,
  publicOffenderDOB,
  onDelete,
  associatesData,
  onAssociateFilterChange,
  associateFilters,
  associatesLoading,
  toggleViewAssociate,
  viewAssociate,
  toggleViewMatches,
  viewMatches,
}: Props): JSX.Element => {
  const classes = useStyles();
  const expandedRowRender = (record: TableItem) => (
    <Text style={{ fontSize: 14, padding: 0, margin: 0 }}>
      Description: {record.description}
    </Text>
  );
  return (
    <div className="page-container">
      <Row wrap={false}>
        <Col>
          <OffenderSideList current={offenderId} />
        </Col>

        <Col flex={1} className={classes.detailsContent}>
          <Row gutter={8} className={classes.headerBar} justify="end">
            {data?.offender?.searchedMatches &&
              data?.offender?.searchedMatches.length > 0 && (
                <Col>
                  <Button danger onClick={() => toggleViewMatches(offenderId)}>
                    {data.offender.searchedMatches.length} Face ID Match
                    {data.offender.searchedMatches.length > 1 ? 'es' : ''}
                  </Button>
                </Col>
              )}
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
                  type="ghost"
                  color={data?.offender?.subscribed ? undefined : 'danger'}
                >
                  <FontAwesomeIcon
                    size="1x"
                    style={{ marginRight: 8 }}
                    icon={data?.offender?.subscribed ? faBellSlash : faBell}
                  />
                  {data?.offender?.subscribed ? 'Un-follow' : 'Follow'}
                </Button>
              </Tooltip>
            </Col>
            {editRights && (
              <Col>
                <Link to={`/app/offenders/edit/${offenderId}`}>
                  <Button type="ghost">
                    <FontAwesomeIcon
                      size="1x"
                      style={{ marginRight: 8 }}
                      icon={faEdit}
                    />
                    Edit
                  </Button>
                </Link>
              </Col>
            )}
            {deleteRights && (
              <Col>
                <Button type="ghost" onClick={() => onDelete(offenderId)}>
                  <FontAwesomeIcon
                    size="1x"
                    style={{ marginRight: 8 }}
                    icon={faTrash}
                  />
                  Delete
                </Button>
              </Col>
            )}
          </Row>
          <Row
            gutter={8}
            justify="start"
            align="middle"
            wrap={false}
            className={classes.images}
            style={{
              height:
                data?.offender?.images && data?.offender?.images.length > 0
                  ? undefined
                  : 0,
            }}
          >
            {data?.offender?.images.map((image, i) => (
              <Col key={image.id}>
                <div onClick={() => openLightbox(i)} className={classes.image}>
                  <WatermarkImage
                    url={image.optimised}
                    position={image.position}
                  />
                </div>
              </Col>
            ))}
          </Row>
          {loading && (
            <Row style={{ width: '100%', marginBottom: 20, marginLeft: 10 }}>
              <Row gutter={8} className={classes.offenderRow}>
                {Array.from({ length: 4 }).map((_, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Col key={index}>
                    <Skeleton.Avatar
                      active
                      shape="square"
                      style={{
                        height: 200,
                        width: 150,
                        borderRadius: '0.625rem',
                      }}
                    />
                  </Col>
                ))}
              </Row>
            </Row>
          )}
          <div className={classes.content}>
            <Card>
              <Row align="middle" gutter={10}>
                <Col>
                  <Title style={{ margin: 0 }} level={3}>
                    {data?.offender?.name}
                  </Title>
                </Col>
                <Col>
                  <Text>- - ALert ID: {data?.offender?.reference}</Text>
                </Col>
              </Row>

              <Row style={{ marginTop: 5 }}>
                {data?.offender?.tags.map((tag) => (
                  <Col key={tag.id}>
                    <Tag color="red" className={classes.tag}>
                      {tag.name}
                    </Tag>
                  </Col>
                ))}
              </Row>

              <Descriptions column={1} style={{ marginTop: 10 }}>
                {data?.offender?.alias && data.offender.alias.length > 0 && (
                  <Descriptions.Item
                    label={
                      <span className={classes.tagLabel}>
                        <FontAwesomeIcon
                          className={classes.descIcon}
                          icon={faUser}
                        />
                        Alias
                      </span>
                    }
                  >
                    <Row>
                      {data?.offender?.alias.map((el, i) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <Tag key={i} className={classes.tag}>
                          {el}
                        </Tag>
                      ))}
                    </Row>
                  </Descriptions.Item>
                )}
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
                      Verified {`(${getIdSource(data?.offender.idSource)})`}
                    </Typography.Text>
                  ) : (
                    <Typography.Text type="warning">
                      Not Verified
                    </Typography.Text>
                  )}
                </Descriptions.Item>
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
                  {formatCalendar(data?.offender?.updatedAt || moment())}
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <span className={classes.tagLabel}>
                      <FontAwesomeIcon
                        className={classes.descIcon}
                        icon={faUsers}
                      />
                      Groups
                    </span>
                  }
                >
                  <Row>
                    {data?.offender?.groups?.map((group) => (
                      <Tag key={group.id} className={classes.tag}>
                        {group.name}
                      </Tag>
                    ))}
                  </Row>
                </Descriptions.Item>
              </Descriptions>
            </Card>
            <Row gutter={16}>
              <Col span={12}>
                <Card>
                  <Title level={4} style={{ marginBottom: 10 }}>
                    Physical Description
                  </Title>
                  <Descriptions column={1}>
                    {(publicOffenderDOB || editRights) && (
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
                    )}
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
                            icon={faHeadSide}
                          />
                          Height
                        </span>
                      }
                    >
                      {getOffenderHeight(data?.offender?.height)}
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
                  <Descriptions column={1}>
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
                  </Descriptions>
                  <Descriptions column={1}>
                    {data?.offender?.comment && (
                      <Descriptions.Item
                        label={
                          <span>
                            <FontAwesomeIcon
                              className={classes.descIcon}
                              icon={faComment}
                            />
                            Comment
                          </span>
                        }
                      >
                        {data?.offender?.comment}
                      </Descriptions.Item>
                    )}
                  </Descriptions>
                </Card>
              </Col>
              <Col span={12}>
                {data?.offender?.incidents &&
                data?.offender?.incidents.length > 0 ? (
                  <MapCard
                    width="100%"
                    height={301}
                    markers={
                      data?.offender?.incidents.map((incident) => ({
                        geoLat: incident.location?.geoLat,
                        geoLng: incident.location?.geoLng,
                      })) || []
                    }
                  />
                ) : (
                  <Card
                    style={{
                      height: 'calc(100% - 20px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description="No incidents to map"
                    />
                  </Card>
                )}
              </Col>
            </Row>
            <Card>
              <Row style={{ marginBottom: 20 }} align="middle">
                <Col>
                  <Title level={4} style={{ marginBottom: 0, marginRight: 20 }}>
                    Known Associates
                  </Title>
                </Col>
                <Col>
                  <CheckTags
                    options={[
                      {
                        label: 'Linked Incidents',
                        value: 'LINKED_INCIDENTS',
                      },
                      {
                        label: 'Linked OCGs',
                        value: 'LINKED_OCG',
                      },
                    ]}
                    onChange={onAssociateFilterChange}
                    value={associateFilters as string[]}
                  />
                </Col>
              </Row>
              <Row gutter={[8, 8]} className={classes.offenderRow} wrap={false}>
                {associatesLoading && (
                  <Row gutter={8} className={classes.offenderRow}>
                    {Array.from({ length: 4 }).map((_, index) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <Col key={index}>
                        <Skeleton.Avatar
                          active
                          shape="square"
                          style={{
                            height: 200,
                            width: 150,
                            borderRadius: '0.625rem',
                          }}
                        />
                      </Col>
                    ))}
                  </Row>
                )}
                {associatesData?.offender?.knownAssociates &&
                  associatesData.offender.knownAssociates.length === 0 && (
                    <Row justify="center" style={{ width: '100%' }}>
                      <Col>
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          description="No known associated for this offender"
                        />
                      </Col>
                    </Row>
                  )}
                {associatesData?.offender?.knownAssociates?.map((associate) => (
                  <Col key={associate.id}>
                    <Card
                      // onClick={() => setAddRecentOffender(offender)}
                      style={{ border: 0 }}
                      bodyStyle={{
                        width: 150,
                        height: 200,
                        position: 'relative',
                        padding: 0,
                        borderRadius: '0.625rem',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                      }}
                      onClick={() => toggleViewAssociate(associate)}
                    >
                      <Row gutter={8} className={classes.offenderBadge}>
                        <Col>
                          <Badge
                            color="basic"
                            count={
                              associate.totalAssociatedIncidents
                                ? `Incidents: ${associate.totalAssociatedIncidents}`
                                : undefined
                            }
                          />
                        </Col>
                        <Col>
                          <Badge
                            color="basic"
                            count={
                              associate.totalAssociatedCrimeGroups
                                ? 'OCG'
                                : undefined
                            }
                          />
                        </Col>
                      </Row>
                      {associate.images.length > 0 && (
                        <WatermarkImage
                          url={associate.images[0]?.optimised}
                          position={associate.images[0]?.position}
                        />
                      )}
                      {associate.images.length === 0 && (
                        <FontAwesomeIcon
                          style={{ color: 'rgb(114, 132, 154)' }}
                          icon={faUser}
                          size="3x"
                        />
                      )}
                      <Paragraph
                        className={classes.offenderParagraph}
                        style={{
                          bottom: 9,
                          paddingBottom: 0,
                        }}
                      >
                        {`Alert ID: ${associate.reference}`}
                      </Paragraph>
                      <Paragraph
                        className={classes.offenderParagraph}
                        style={{
                          bottom: -15,
                          paddingTop: 0,
                        }}
                      >
                        {associate.name}
                      </Paragraph>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card>
            <Card>
              <Title level={4}>Incidents</Title>
              <IncidentTable
                incidents={data?.offender?.incidents || []}
                hasNavigation
              />
            </Card>
            <Card>
              <Title level={4}>Exclusions</Title>
              <Table
                size="small"
                loading={loading}
                pagination={
                  data?.offender?.bans && data.offender.bans.length > 5
                    ? {
                        pageSize: 5,
                      }
                    : false
                }
                expandable={{
                  expandedRowRender,
                  rowExpandable: (record) => !!record.description,
                }}
                columns={[
                  {
                    key: 'duration',
                    title: 'Duration',
                    dataIndex: 'duration',
                    render: (value) => <Text>{value}</Text>,
                  },
                  {
                    key: 'activeDay',
                    title: 'Active Days',
                    dataIndex: 'activeDay',
                    width: 150,
                  },
                  {
                    key: 'status',
                    title: 'Status',
                    dataIndex: 'status',
                    render: (value, record) =>
                      calcExpired(new Date(record.endDate)) ? (
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
                      ),
                  },
                  {
                    key: 'location',
                    title: 'Location',
                    dataIndex: 'location',
                    ellipsis: true,
                  },

                  {
                    key: 'type',
                    title: 'Type',
                    dataIndex: 'type',
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
                  activeDay: calcDuration(
                    new Date(ban?.startDate),
                    new Date(ban?.endDate)
                  ),
                  status: `${new Date(
                    ban?.startDate
                  ).toDateString()}  -->  ${new Date(
                    ban?.endDate
                  ).toDateString()}`,
                  location: ban.location,
                  description: ban.description,
                  type: ban.type,
                }))}
              />
            </Card>
            {editRights && (
              <Card>
                <Title level={4}>Addresses</Title>
                <Table
                  size="small"
                  loading={loading}
                  pagination={
                    data?.offender?.addresses &&
                    data.offender.addresses.length > 10
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
                  dataSource={data?.offender?.addresses.map((address) => ({
                    key: address.id,
                    alias: address.alias,
                    full: address.full,
                  }))}
                />
              </Card>
            )}
            <Card>
              <Title level={4}>Vehicles</Title>
              <VehicleTable
                vehicles={data?.offender?.vehicles || []}
                hasNavigation
              />
            </Card>
            <Card>
              <Title level={4}>Crime Groups</Title>
              <CrimeGroupTable
                crimeGroups={data?.offender?.crimeGroups || []}
                hasNavigation
              />
            </Card>
          </div>
        </Col>
        <Col span={8}>
          <div className={classes.updatesContainer}>
            <InfiniteScroll
              height={
                optionRowShow ? 'calc(100vh - 279px)' : 'calc(100vh - 169px)'
              }
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
                          vehicles={update.linkedVehicles}
                          crimeGroups={update.linkedCrimeGroups}
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
                      vehicles={update.linkedVehicles}
                      crimeGroups={update.linkedCrimeGroups}
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
                            reply.createdBy.id === userId ? 'left' : 'right'
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
                              vehicles={update.linkedVehicles}
                              crimeGroups={update.linkedCrimeGroups}
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
                          vehicles={update.linkedVehicles}
                          crimeGroups={update.linkedCrimeGroups}
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
                            marginLeft: update.replies.length > 0 ? 48 : 0,
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
                            marginLeft: update.replies.length > 0 ? 48 : 0,
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
              setOptionRowShow={setOptionRowShow}
            />
          </div>
        </Col>
      </Row>

      <Drawer
        title="Link Incidents"
        open={linkIncident}
        width="800"
        onClose={toggleLinkIncident}
      >
        {linkIncident ? (
          <LinkIncident
            update={(value) => updateIncidentList(value.id || '')}
            onClose={toggleLinkIncident}
            incidentIds={data?.offender?.incidents.map(({ id }) => id) || []}
          />
        ) : (
          <div />
        )}
      </Drawer>

      <Drawer
        title="Associated Offender"
        onClose={() => toggleViewAssociate(null)}
        width="800"
        open={viewAssociate !== null}
      >
        {viewAssociate && (
          <AssociatedOffender
            offender={viewAssociate}
            onClose={() => toggleViewAssociate(null)}
          />
        )}
      </Drawer>

      <Modal
        title="Select Images To Add"
        open={addImages !== null}
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
        open={editUpdate !== null}
        onOk={handleEditUpdate}
        onCancel={() => setEditUpdate(null)}
        okText="Save"
      >
        <Input
          value={editUpdateInput}
          onChange={(e) => setEditUpdateInput(e.target.value)}
        />
      </Modal>
      {/* <Lightbox
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
      /> */}

      <LightBox
        images={data?.offender?.images}
        open={lightBoxOpen.open}
        close={() => openLightbox(0)}
        index={lightBoxOpen.index}
      />

      <Drawer
        open={viewMatches !== null}
        onClose={() => toggleViewMatches(null)}
        title="View Face AI matches"
        width={800}
      >
        {viewMatches && <OffenderMatches offenderId={viewMatches} />}
      </Drawer>
    </div>
  );
};

export default ViewOffender;
