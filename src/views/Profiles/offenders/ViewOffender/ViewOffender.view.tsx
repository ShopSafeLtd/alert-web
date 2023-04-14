/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import type { ViewOffenderQuery } from 'graphql/generated';
import { UpdateType } from 'graphql/generated';
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
import type { ItemType } from 'antd/lib/menu/hooks/useItems';
import { calcExpired } from 'utils/offender/get-offender-exclusion';
import OffenderSideList from 'components/offenders/OffenderSideList';
import moment from 'moment';
import LinkIncident from 'components/form-components/linkOptions/LinkIncident';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import InfiniteScroll from 'react-infinite-scroll-component';
import UpdateContent from 'views/incidents/ViewIncident/Update.view';
import UpdateBar from 'components/MessageInput/UpdateBar';
import type { WatermarkSlideType } from 'components/images/WatermartkSlide.view';
import WatermarkSlide from 'components/images/WatermartkSlide.view';
import WatermarkImage from 'components/images/WatermarkImage.view';
import IncidentTable from 'components/tables/IncidentTable';
import VehicleTable from 'components/tables/VehicleTable';
import CrimeGroupTable from 'components/tables/CrimeGroupTable';
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
  optionRowShow: boolean;
  setOptionRowShow: (value: boolean) => void;
  publicOffenderDOB: boolean;
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
  optionRowShow,
  setOptionRowShow,
  publicOffenderDOB,
}: Props): JSX.Element => {
  const classes = useStyles();
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
                    <div>
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
                          <Row>
                            {data?.offender?.crimeGroups &&
                            data?.offender?.crimeGroups.length > 0
                              ? data?.offender?.crimeGroups.map((group) => (
                                  <Tag key={group.id}>CG-{group.reference}</Tag>
                                ))
                              : 'None'}
                          </Row>
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
                          <Row>
                            {data?.offender?.groups?.map((group) => (
                              <Tag key={group.id}>{group.name}</Tag>
                            ))}
                          </Row>
                        </Descriptions.Item>
                      </Descriptions>
                      <Title level={4} style={{ marginTop: 30 }}>
                        Exclusions
                      </Title>
                      {data?.offender?.bans.length && !loading ? (
                        <Table
                          size="small"
                          loading={loading}
                          pagination={
                            data.offender.bans && data?.offender.bans.length > 5
                              ? {
                                  pageSize: 5,
                                }
                              : false
                          }
                          className={classes.exclusions}
                          columns={[
                            {
                              key: 'duration',
                              title: 'Duration',
                              dataIndex: 'duration',
                              render: (value) => <Text>{value}</Text>,
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
                          description="No exclusions for this offender"
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                        />
                      )}
                      {editRights && (
                        <>
                          <Title level={4} style={{ marginTop: 30 }}>
                            Addresses
                          </Title>
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
                        </>
                      )}

                      <Title level={4} style={{ marginTop: 30 }}>
                        Incidents
                      </Title>
                      {data?.offender?.incidents.length && !loading ? (
                        <IncidentTable
                          incidents={data?.offender?.incidents}
                          hasNavigation
                        />
                      ) : (
                        <Empty
                          description="No incidents for this offender"
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                        />
                      )}

                      <Title level={4} style={{ marginTop: 30 }}>
                        Vehicles
                      </Title>
                      {data?.offender?.vehicles.length && !loading ? (
                        <VehicleTable
                          vehicles={data?.offender?.vehicles}
                          hasNavigation
                        />
                      ) : (
                        <Empty
                          description="No vehicles for this offender"
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                        />
                      )}

                      <Title level={4} style={{ marginTop: 30 }}>
                        Crime Groups
                      </Title>
                      {data?.offender?.crimeGroups.length && !loading ? (
                        <CrimeGroupTable
                          crimeGroups={data?.offender?.crimeGroups}
                          hasNavigation
                        />
                      ) : (
                        <Empty
                          description="No crime groups for this offender"
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                        />
                      )}
                    </div>
                  )}
                </div>
              </Col>
              <Col span={12}>
                <div className={classes.updatesContainer}>
                  <InfiniteScroll
                    height={
                      optionRowShow
                        ? 'calc(100vh - 279px)'
                        : 'calc(100vh - 169px)'
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
                    setOptionRowShow={setOptionRowShow}
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
