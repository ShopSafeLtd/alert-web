/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import {
  ViewIncidentQuery,
  Age,
  Gender,
  Race,
  Build,
  UpdateType,
} from 'graphql/generated';
import {
  Typography,
  Row,
  Col,
  Descriptions,
  Tag,
  Divider,
  Skeleton,
  Button,
  Drawer,
  Tooltip,
  Modal,
  Image,
  Checkbox,
  Popover,
  Input,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
  faClock,
  faUser,
  faPlus,
  faMoneyBill1Wave,
  faBell,
  faBellSlash,
  faTrash,
  faEdit,
} from '@fortawesome/pro-light-svg-icons';
import {
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderRace,
  calcAge,
} from 'utils/offender/get-offender-desc';
import IncidentSideList from 'components/incidents/IncidentSideList';
import { Link } from 'react-router-dom';
import UpdateBar from 'components/form-components/update-bar';
import LinkOffender from 'components/form-components/incident/offender/AddExisitingOffender';
import InfiniteScroll from 'react-infinite-scroll-component';
import UpdateContent from './Update.view';

const { Title, Text, Paragraph } = Typography;
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
  addOffenderRights: boolean;
  incidentId: string;
  editRights: boolean;
  deleteRights: boolean;
  onDelete: (id: string) => void;
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
}

const ViewIncident = ({
  data,
  loading,
  saving,
  openLightbox,
  addOffenderRights,
  incidentId,
  deleteRights,
  editRights,
  onDelete,
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
}: Props): JSX.Element => (
  <div className="page-container">
    <Row>
      <Col span={6}>
        <IncidentSideList current={incidentId} />
      </Col>

      <Col span={18}>
        <div className="view-incident">
          {loading ? (
            <Skeleton />
          ) : (
            <Row
              gutter={8}
              justify="start"
              align="middle"
              wrap={false}
              className="incident-images"
            >
              {data?.incident?.images.map((image, i) => (
                <Col key={image.id}>
                  <div
                    onClick={() => openLightbox(i)}
                    className="incident-image"
                    style={{ backgroundImage: `url(${image.optimised})` }}
                  />
                </Col>
              ))}
            </Row>
          )}
          <div className="incident-content">
            <div className="incident-header-bar">
              <Row>
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
                    >
                      <FontAwesomeIcon
                        size="1x"
                        style={{ marginRight: 8 }}
                        icon={data?.incident?.subscribed ? faBellSlash : faBell}
                      />
                      {data?.incident?.subscribed
                        ? 'Un-follow Updates'
                        : 'Follow Updates'}
                    </Button>
                  </Tooltip>
                </Col>
                {editRights && (
                  <Col>
                    <Link to={`/app/incidents/edit/${incidentId}`}>
                      <Button disabled={saving} loading={saving} type="text">
                        Edit Incident
                      </Button>
                    </Link>
                  </Col>
                )}
                {deleteRights && (
                  <Col>
                    <Button
                      onClick={() => {
                        onDelete(incidentId);
                      }}
                      disabled={saving}
                      loading={saving}
                      type="text"
                    >
                      Delete Incident
                    </Button>
                  </Col>
                )}
              </Row>
            </div>
            {loading ? (
              <Skeleton />
            ) : (
              <Row className="incident-tab-content">
                <Col span={13} className="incident-details-main">
                  <Title level={4}>{data?.incident?.subject}</Title>
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
                  <Descriptions column={1} className="incident-descriptions">
                    <Descriptions.Item
                      label={
                        <span>
                          <FontAwesomeIcon
                            className="incident-description-icon"
                            icon={faClock}
                          />
                          Created At
                        </span>
                      }
                    >
                      {data?.incident?.dayTime}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={
                        <span>
                          <FontAwesomeIcon
                            className="incident-description-icon"
                            icon={faUser}
                          />
                          Created By
                        </span>
                      }
                    >
                      {`${data?.incident?.createdBy.fullName} -
                              ${data?.incident?.createdBy.organisation}`}
                    </Descriptions.Item>
                    {data?.incident?.value && (
                      <Descriptions.Item
                        label={
                          <span>
                            <FontAwesomeIcon
                              className="incident-description-icon"
                              icon={faMoneyBill1Wave}
                            />
                            Value
                          </span>
                        }
                      >
                        £{data?.incident?.value}
                      </Descriptions.Item>
                    )}
                    {data?.incident?.recoveredValue && (
                      <Descriptions.Item
                        label={
                          <span>
                            <FontAwesomeIcon
                              className="incident-description-icon"
                              icon={faMoneyBill1Wave}
                            />
                            Recovered Value
                          </span>
                        }
                      >
                        £{data?.incident?.recoveredValue}
                      </Descriptions.Item>
                    )}
                    <Descriptions.Item
                      label={
                        <span>
                          <FontAwesomeIcon
                            className="incident-description-icon"
                            icon={faLocationDot}
                          />
                          Location
                        </span>
                      }
                    >
                      {data?.incident?.location?.full}
                    </Descriptions.Item>
                  </Descriptions>
                  <div className="incident-offender-container">
                    <Title level={4}>Offenders</Title>
                    {data?.incident && data?.incident?.offenders.length > 0 ? (
                      <div className="incident-offenders">
                        {data?.incident?.offenders.map((offender) => (
                          <Link to={`/app/offenders/view/${offender.id}`}>
                            <div className="incident-offender">
                              <Row wrap={false}>
                                <Col>
                                  {offender.images.length > 0 ? (
                                    <div
                                      className="offender-image"
                                      style={{
                                        backgroundImage: `url(${offender.images[0].optimised})`,
                                      }}
                                    />
                                  ) : (
                                    <Skeleton.Image className="offender-image-skeleton" />
                                  )}
                                </Col>
                                <Col
                                  flex={1}
                                  className="incident-offender-content"
                                >
                                  <Text
                                    className="incident-offender-name"
                                    strong
                                  >
                                    {offender.name}
                                  </Text>
                                  <Descriptions size="small" column={2}>
                                    <Descriptions.Item label="Gender">
                                      {getOffenderGender(offender.gender)}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Ethnicity">
                                      {getOffenderRace(offender.race, true)}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Age">
                                      {offender.dateOfBirth
                                        ? calcAge(offender.dateOfBirth)
                                        : getOffenderAge(offender.age)}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Build">
                                      {getOffenderBuild(offender.build)}
                                    </Descriptions.Item>
                                  </Descriptions>
                                </Col>
                              </Row>
                              <Divider />
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="incident-offenders-empty">
                        <Paragraph>
                          There are no offenders on this incident.
                        </Paragraph>
                        {addOffenderRights && (
                          <div>
                            <Button
                              onClick={toggleLinkOffender}
                              disabled={saving}
                              loading={saving}
                              style={{ color: 'red' }}
                              icon={
                                <FontAwesomeIcon
                                  className="button-icon"
                                  icon={faPlus}
                                />
                              }
                            >
                              Link Offender
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </Col>
                <Col span={11}>
                  <div className="incident-updates">
                    <InfiniteScroll
                      height="calc(100vh - 476px)"
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
                      <Title level={4}>Updates</Title>
                      {data?.incident?.updates.map((update) => (
                        <div key={update.id} className="update-wrapper">
                          {editRights && update.type !== UpdateType.System ? (
                            <Popover
                              trigger="click"
                              placement={
                                update.createdBy.id === userId
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
                                          : `${update.createdBy.fullName} - ${update.createdBy.organisation}`,
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
                                      update.images.map(
                                        ({ id, optimised }) => ({
                                          id,
                                          url: optimised || '',
                                        })
                                      )
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
            )}
          </div>
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
  </div>
);

export default ViewIncident;
