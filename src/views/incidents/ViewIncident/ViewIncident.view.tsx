/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import type {
  Age,
  Build,
  Gender,
  Race,
  ViewIncidentQuery,
} from 'graphql/generated';
import { CrimeType, UpdateType } from 'graphql/generated';
import {
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
  faBuilding,
  faClock,
  faEdit,
  faPage,
  faSirenOn,
  faTags,
  faTrash,
  faUsers,
  faUserTag,
} from '@fortawesome/pro-light-svg-icons';
import { Link } from 'react-router-dom';
import IncidentSideList from 'components/incidents/IncidentSideList';
import UpdateBar from 'components/MessageInput/UpdateBar';
import LinkOffender from 'components/form-components/offender/offender/AddExistingOffender';
import InfiniteScroll from 'react-infinite-scroll-component';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import type { WatermarkSlideType } from 'components/images/WatermartkSlide.view';
import WatermarkSlide from 'components/images/WatermartkSlide.view';
import WatermarkImage from 'components/images/WatermarkImage.view';
import OffenderTable from 'components/tables/OffenderTable';
import VehicleTable from 'components/tables/VehicleTable';
import MapCard from 'components/map/MapCard/MapCard.view';
import { useIntl } from 'react-intl';
import moment from 'moment';
import UpdateContent from './Update.view';
import useStyles from './ViewIncident.styles';
import EvidenceTable from '../../../components/tables/EvidenceTable';

const { Title, Paragraph, Text } = Typography;

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
  editUpdateInput: string;
  handleEditUpdate: () => void;
  setEditUpdateInput: (value: string) => void;
  lightboxElements: {
    src: string;
  }[];
  lightBoxOpen: {
    open: boolean;
    index: number;
  };
  optionRowShow: boolean;
  setOptionRowShow: (value: boolean) => void;
  onDelete: (incidentId: string) => void;
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
  lightboxElements,
  lightBoxOpen,
  optionRowShow,
  setOptionRowShow,
  onDelete,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();
  return (
    <div className="page-container">
      <Row wrap={false}>
        <Col>
          <IncidentSideList current={incidentId} />
        </Col>

        <Col flex={1}>
          <div className={classes.viewIncident}>
            <Row className={classes.content}>
              <Col className={classes.detailsContent} span={16}>
                <Row gutter={8} className={classes.headerBar} justify="end">
                  <Col>
                    <Tooltip
                      title={
                        data?.incident?.subscribed
                          ? intl.formatMessage({
                              defaultMessage:
                                'Stop getting notified about updates.',
                              id: 'WpTY6U',
                            })
                          : intl.formatMessage({
                              defaultMessage: 'Get notified about updates.',
                              id: 'icr+Hj',
                            })
                      }
                    >
                      <Button
                        onClick={toggleSubscribe}
                        disabled={saving}
                        loading={saving}
                        type="ghost"
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
                          ? intl.formatMessage({
                              defaultMessage: 'Un-follow',
                              id: 'U9yypY',
                            })
                          : intl.formatMessage({
                              defaultMessage: 'Follow',
                              id: 'ieGrWo',
                            })}
                      </Button>
                    </Tooltip>
                  </Col>
                  {editRights && (
                    <Col>
                      <Link to={`/app/incidents/edit/${incidentId}`}>
                        <Button type="ghost">
                          <FontAwesomeIcon
                            size="1x"
                            style={{ marginRight: 8 }}
                            icon={faEdit}
                          />
                          {intl.formatMessage({
                            defaultMessage: 'Edit',
                            id: 'wEQDC6',
                          })}
                        </Button>
                      </Link>
                    </Col>
                  )}

                  {data?.incident?.scheme.mg11Available && (
                    <Col>
                      <Link to={`/app/mg11/create/${incidentId}`}>
                        <Button type="ghost">
                          <FontAwesomeIcon
                            size="1x"
                            style={{ marginRight: 8 }}
                            icon={faPage}
                          />
                          {intl.formatMessage({
                            defaultMessage: 'Create MG11',
                            id: 'CpvwMZ',
                          })}
                        </Button>
                      </Link>
                    </Col>
                  )}
                  {deleteRights && (
                    <Col>
                      <Button type="ghost" onClick={() => onDelete(incidentId)}>
                        <FontAwesomeIcon
                          size="1x"
                          style={{ marginRight: 8 }}
                          icon={faTrash}
                        />
                        {intl.formatMessage({
                          defaultMessage: 'Delete',
                          id: 'K3r6DQ',
                        })}
                      </Button>
                    </Col>
                  )}
                </Row>
                {loading ? (
                  <Skeleton />
                ) : (
                  <Row
                    gutter={[8, 8]}
                    justify="start"
                    align="middle"
                    wrap
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
                        >
                          <WatermarkImage
                            url={image.optimised}
                            position={image.position}
                          />
                        </div>
                      </Col>
                    ))}
                  </Row>
                )}
                <div className={classes.details}>
                  {loading ? (
                    <Skeleton />
                  ) : (
                    <div className="incident-tab-content">
                      <Card>
                        <Title className={classes.headerTitle} level={4}>
                          {data?.incident?.subject}
                        </Title>
                        <Text>
                          {intl.formatMessage(
                            {
                              defaultMessage: 'Alert ID: {ref}',
                              id: 'umL9sI',
                            },
                            {
                              ref: data?.incident?.reference,
                            }
                          )}
                        </Text>
                        <Paragraph type="secondary" style={{ marginTop: 10 }}>
                          {data?.incident?.description}
                        </Paragraph>

                        <Descriptions column={1} className={classes.desc}>
                          <Descriptions.Item
                            className={classes.detail}
                            label={
                              <span>
                                <FontAwesomeIcon
                                  className={classes.descIcon}
                                  icon={faBuilding}
                                />
                                {intl.formatMessage({
                                  defaultMessage: 'Business',
                                  id: 'w1Fanr',
                                })}
                              </span>
                            }
                          >
                            {editRights ? (
                              <Link
                                to={`/app/scheme-settings/business/view/${
                                  data?.incident?.business?.id || ''
                                }`}
                              >
                                {data?.incident?.business?.name}
                              </Link>
                            ) : (
                              data?.incident?.business?.name
                            )}
                          </Descriptions.Item>
                          <Descriptions.Item
                            className={classes.detail}
                            label={
                              <span>
                                <FontAwesomeIcon
                                  className={classes.descIcon}
                                  icon={faClock}
                                />
                                {intl.formatMessage({
                                  defaultMessage: 'Date & Time',
                                  id: 'io/Qlk',
                                })}
                              </span>
                            }
                          >
                            {data?.incident?.dayTime}
                          </Descriptions.Item>
                        </Descriptions>

                        <Descriptions column={1} className={classes.desc}>
                          <Descriptions.Item
                            className={classes.detailTag}
                            label={
                              <span className={classes.tagLabel}>
                                <FontAwesomeIcon
                                  className={classes.descIcon}
                                  icon={faUsers}
                                />
                                {intl.formatMessage({
                                  defaultMessage: 'Groups',
                                  id: 'hzmswI',
                                })}
                              </span>
                            }
                          >
                            <Row>
                              {data?.incident?.groups.map((group) => (
                                <Tag key={group.id} className={classes.tag}>
                                  {group.name}
                                </Tag>
                              ))}
                            </Row>
                          </Descriptions.Item>
                          <Descriptions.Item
                            className={classes.detailTag}
                            label={
                              <span className={classes.tagLabel}>
                                <FontAwesomeIcon
                                  className={classes.descIcon}
                                  icon={faSirenOn}
                                />
                                {intl.formatMessage({
                                  defaultMessage: 'Crime Types',
                                  id: 'Piba4q',
                                })}
                              </span>
                            }
                          >
                            <Row>
                              {data?.incident?.crimeTypes.map((tag) => (
                                <Tag
                                  color="red"
                                  key={tag.id}
                                  className={classes.tag}
                                >
                                  {tag.name}
                                </Tag>
                              )) ||
                                intl.formatMessage({
                                  defaultMessage: 'None',
                                  id: '450Fty',
                                })}
                            </Row>
                          </Descriptions.Item>
                          <Descriptions.Item
                            className={classes.detailTag}
                            label={
                              <span className={classes.tagLabel}>
                                <FontAwesomeIcon
                                  className={classes.descIcon}
                                  icon={faTags}
                                />
                                {intl.formatMessage({
                                  defaultMessage: 'Involved Tags',
                                  id: 'hqB+1X',
                                })}
                              </span>
                            }
                          >
                            <Row>
                              {data?.incident?.involvedTags.map((tag) => (
                                <Tag
                                  color="red"
                                  key={tag.id}
                                  className={classes.tag}
                                >
                                  {tag.name}
                                </Tag>
                              )) ||
                                intl.formatMessage({
                                  defaultMessage: 'None',
                                  id: '450Fty',
                                })}
                            </Row>
                          </Descriptions.Item>

                          <Descriptions.Item
                            className={classes.detailTag}
                            label={
                              <span className={classes.tagLabel}>
                                <FontAwesomeIcon
                                  className={classes.descIcon}
                                  icon={faUserTag}
                                />
                                {intl.formatMessage({
                                  defaultMessage: 'Impact Tags',
                                  id: 'JZVMXj',
                                })}
                              </span>
                            }
                          >
                            <Row justify="start" align="middle">
                              {data?.incident?.impactTags.map((tag) => (
                                <Tag
                                  color="red"
                                  key={tag.id}
                                  className={classes.tag}
                                >
                                  {tag.name}
                                </Tag>
                              )) ||
                                intl.formatMessage({
                                  defaultMessage: 'None',
                                  id: '450Fty',
                                })}
                            </Row>
                          </Descriptions.Item>
                        </Descriptions>
                      </Card>
                      <Row gutter={16}>
                        <Col xs={24} xl={12}>
                          <MapCard
                            width="100%"
                            height={194}
                            markers={[
                              {
                                geoLat: data?.incident?.location?.geoLat,
                                geoLng: data?.incident?.location?.geoLng,
                              },
                            ]}
                          />
                        </Col>
                        <Col xs={24} xl={12}>
                          <Card>
                            <Title level={4}>
                              {intl.formatMessage({
                                defaultMessage: 'Police Information',
                                id: 'bhVnhl',
                              })}
                            </Title>
                            <Descriptions
                              column={1}
                              style={{ marginTop: 10 }}
                              className={classes.desc}
                            >
                              <Descriptions.Item
                                className={classes.detail}
                                label={
                                  <span>
                                    {intl.formatMessage({
                                      defaultMessage: 'Police Reported',
                                      id: 'KrBn25',
                                    })}
                                  </span>
                                }
                              >
                                {data?.incident?.policeReported
                                  ? intl.formatMessage({
                                      defaultMessage: 'Yes',
                                      id: 'a5msuh',
                                    })
                                  : intl.formatMessage({
                                      defaultMessage: 'No',
                                      id: 'oUWADl',
                                    })}
                              </Descriptions.Item>
                              <Descriptions.Item
                                className={classes.detail}
                                label={
                                  <span>
                                    {intl.formatMessage({
                                      defaultMessage: 'Police Attenteded',
                                      id: 'qT9KAx',
                                    })}
                                  </span>
                                }
                              >
                                {data?.incident?.policeInvolved
                                  ? intl.formatMessage({
                                      defaultMessage: 'Yes',
                                      id: 'a5msuh',
                                    })
                                  : intl.formatMessage({
                                      defaultMessage: 'No',
                                      id: 'oUWADl',
                                    })}
                              </Descriptions.Item>
                              <Descriptions.Item
                                className={classes.detail}
                                label={intl.formatMessage({
                                  defaultMessage: 'Crime Ref',
                                  id: '03pSDv',
                                })}
                              >
                                {data?.incident?.policeRef ||
                                  intl.formatMessage({
                                    defaultMessage: 'Not Provided',
                                    id: 'rVkCib',
                                  })}
                              </Descriptions.Item>
                              <Descriptions.Item
                                className={classes.detail}
                                label={
                                  <span>
                                    {intl.formatMessage({
                                      defaultMessage: 'Officer Collar Number',
                                      id: 'r4EMV1',
                                    })}
                                  </span>
                                }
                              >
                                {data?.incident?.policeNo ||
                                  intl.formatMessage({
                                    defaultMessage: 'Not Provided',
                                    id: 'rVkCib',
                                  })}
                              </Descriptions.Item>
                            </Descriptions>
                          </Card>
                        </Col>
                      </Row>

                      {data?.incident?.crimeTypes
                        .map((item) => item.crimeType)
                        .includes(CrimeType.TheftHandling) && (
                        <Card style={{ marginBottom: 20 }}>
                          <Title level={4}>
                            {intl.formatMessage({
                              defaultMessage: 'Items',
                              id: 'yNmV/R',
                            })}
                          </Title>
                          <Table
                            columns={[
                              {
                                title: intl.formatMessage({
                                  defaultMessage: 'Name',
                                  id: 'HAlOn1',
                                }),
                                dataIndex: 'name',
                                key: 'name',
                              },
                              {
                                title: intl.formatMessage({
                                  defaultMessage: 'Value',
                                  id: 'GufXy5',
                                }),
                                dataIndex: 'value',
                                key: 'value',
                                render: (value: number) =>
                                  `£${value.toFixed(2)}`,
                              },
                              {
                                title: intl.formatMessage({
                                  defaultMessage: 'Recovered Value',
                                  id: 'bGwFFv',
                                }),
                                dataIndex: 'recoveredValue',
                                key: 'recoveredValue',
                                render: (value: number) =>
                                  `£${value.toFixed(2)}`,
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
                            pagination={false}
                            // TODO
                            // eslint-disable-next-line react/no-unstable-nested-components
                            summary={(tableData) => {
                              const totalValue = tableData
                                .map((item) => item.value || 0)
                                .reduce((a, b) => a + b, 0);
                              const totalRecovered = tableData
                                .map((item) => item.recoveredValue || 0)
                                .reduce((a, b) => a + b, 0);

                              return (
                                <Table.Summary.Row>
                                  <Table.Summary.Cell index={0}>
                                    {intl.formatMessage({
                                      defaultMessage: 'Total: ',
                                      id: 'ILhZuX',
                                    })}
                                  </Table.Summary.Cell>
                                  {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                                  <Table.Summary.Cell index={1}>
                                    £{totalValue.toFixed(2)}
                                  </Table.Summary.Cell>
                                  {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                                  <Table.Summary.Cell index={1}>
                                    £{totalRecovered.toFixed(2)}
                                  </Table.Summary.Cell>
                                </Table.Summary.Row>
                              );
                            }}
                          />
                        </Card>
                      )}

                      <Card>
                        <Title level={4}>
                          {intl.formatMessage({
                            defaultMessage: 'Offenders',
                            id: 'xb54TN',
                          })}
                        </Title>
                        {data?.incident?.offenders.length && !loading ? (
                          <OffenderTable
                            offenders={data?.incident?.offenders}
                            hasNavigation
                          />
                        ) : (
                          <Empty
                            description={intl.formatMessage({
                              defaultMessage: 'No offenders for this incident',
                              id: '+qw0ns',
                            })}
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                          />
                        )}
                      </Card>

                      <Card style={{ marginTop: 20 }}>
                        <Title level={4}>
                          {intl.formatMessage({
                            defaultMessage: 'Vehicles',
                            id: 'r6wuJ3',
                          })}
                        </Title>
                        {data?.incident?.vehicles.length && !loading ? (
                          <VehicleTable
                            vehicles={data?.incident?.vehicles}
                            hasNavigation
                          />
                        ) : (
                          <Empty
                            description={intl.formatMessage({
                              defaultMessage: 'No vehicles for this incident',
                              id: 'EOkcI5',
                            })}
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                          />
                        )}
                      </Card>
                      {data?.incident?.scheme.mg11Available && (
                        <Card style={{ marginTop: 20 }}>
                          <Title level={4}>
                            {intl.formatMessage({
                              defaultMessage: 'Evidence',
                              id: '6g7+6N',
                            })}
                          </Title>
                          {data?.incident?.evidence.length && !loading ? (
                            <EvidenceTable
                              evidence={data?.incident?.evidence}
                            />
                          ) : (
                            <Empty
                              description={intl.formatMessage({
                                defaultMessage: 'No evidence for this incident',
                                id: 'GkZRlh',
                              })}
                              image={Empty.PRESENTED_IMAGE_SIMPLE}
                            />
                          )}
                        </Card>
                      )}
                    </div>
                  )}
                </div>
              </Col>
              <Col span={8}>
                <div className={classes.updatesContainer}>
                  <InfiniteScroll
                    // height="calc(100vh - 225px)"
                    height={
                      optionRowShow
                        ? 'calc(100vh - 279px)'
                        : 'calc(100vh - 169px)'
                    }
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
                        <div className="date">
                          {intl.formatMessage({
                            defaultMessage: 'Loading...',
                            id: 'gjBiyj',
                          })}
                        </div>
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
                                  {intl.formatMessage({
                                    defaultMessage: 'Edit Update',
                                    id: 'pCzvx3',
                                  })}
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
                                  {intl.formatMessage({
                                    defaultMessage: 'Delete Update',
                                    id: 'ef1dfd',
                                  })}
                                </Button>
                              </div>
                            }
                          >
                            <div>
                              <UpdateContent
                                userId={userId}
                                content={update.text}
                                createdAt={moment(update.createdAt)}
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
                            createdAt={moment(update.createdAt)}
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
                                      {intl.formatMessage({
                                        defaultMessage: 'Edit Update',
                                        id: 'pCzvx3',
                                      })}
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
                                      {intl.formatMessage({
                                        defaultMessage: 'Delete Update',
                                        id: 'ef1dfd',
                                      })}
                                    </Button>
                                  </div>
                                }
                              >
                                <div>
                                  <UpdateContent
                                    userId={userId}
                                    content={reply.text}
                                    createdAt={moment(reply.createdAt)}
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
                                createdAt={moment(reply.createdAt)}
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
                                    createdAt: update.createdAt.toString(),
                                    createdBy:
                                      userId === update.createdBy.id
                                        ? intl.formatMessage({
                                            defaultMessage: 'You',
                                            id: 'kJ5W29',
                                          })
                                        : `${update.createdBy.fullName} - ${update.createdBy.businesses[0]?.name}`,
                                    id: update.id,
                                    text: update.text || '',
                                  })
                                }
                              >
                                {intl.formatMessage({
                                  defaultMessage: 'Reply',
                                  id: '9HU8vw',
                                })}
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
                                {intl.formatMessage({
                                  defaultMessage: 'Add Image to Incident',
                                  id: 'VN9g7W',
                                })}
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
                    setOptionRowShow={setOptionRowShow}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Modal
        title={intl.formatMessage({
          defaultMessage: 'Select Images To Add',
          id: 'eSO3MA',
        })}
        open={addImages !== null}
        onOk={() => addUpdateImages(selectedImages.map((id) => ({ id })))}
        onCancel={closeAddImages}
        width={addImages ? addImages.length * 250 : 400}
        okText={intl.formatMessage({
          defaultMessage: 'Add Images',
          id: 'b4GGYZ',
        })}
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
        title={intl.formatMessage({
          defaultMessage: 'Edit Update Content',
          id: '8sZeJM',
        })}
        open={editUpdate !== null}
        onOk={handleEditUpdate}
        onCancel={() => setEditUpdate(null)}
        okText={intl.formatMessage({ defaultMessage: 'Save', id: 'jvo0vs' })}
      >
        <Input
          value={editUpdateInput}
          onChange={(e) => setEditUpdateInput(e.target.value)}
        />
      </Modal>

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Link Offenders',
          id: 'UhSUQG',
        })}
        open={linkOffender}
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
        render={{
          slide: (slide: WatermarkSlideType) => (
            <WatermarkSlide slide={slide} />
          ),
        }}
      />
    </div>
  );
};

export default ViewIncident;
