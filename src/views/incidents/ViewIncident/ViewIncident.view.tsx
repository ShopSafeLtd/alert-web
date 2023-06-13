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
  faEdit,
  faPage,
  faTrash,
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
                          ? 'Stop getting notified about updates.'
                          : 'Get notified about updates.'
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
                        {data?.incident?.subscribed ? 'Un-follow' : 'Follow'}
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
                          Edit
                        </Button>
                      </Link>
                    </Col>
                  )}
                  {editRights && (
                    <Col>
                      <Link to={`/app/mg11/create/${incidentId}`}>
                        <Button type="ghost">
                          <FontAwesomeIcon
                            size="1x"
                            style={{ marginRight: 8 }}
                            icon={faPage}
                          />
                          Create MG11
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
                        Delete
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
                        <Text>Alert ID: {data?.incident?.reference}</Text>
                        <Paragraph type="secondary" style={{ marginTop: 10 }}>
                          {data?.incident?.description}
                        </Paragraph>

                        <Descriptions column={1} className={classes.desc}>
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
                            label={<span>Date &amp; Time</span>}
                          >
                            {data?.incident?.dayTime}
                          </Descriptions.Item>
                        </Descriptions>
                        <Descriptions
                          column={1}
                          className={classes.desc}
                          style={{ marginTop: 5 }}
                        >
                          <Descriptions.Item
                            className={classes.detail}
                            label={<span>Groups</span>}
                          >
                            {data?.incident?.groups.map((group) => (
                              <Tag key={group.id}>{group.name}</Tag>
                            ))}
                          </Descriptions.Item>
                        </Descriptions>
                        <Descriptions column={1} className={classes.desc}>
                          <Descriptions.Item
                            className={classes.detail}
                            label={<span>Crime Types</span>}
                          >
                            {data?.incident?.crimeTypes.map((tag) => (
                              <Tag color="red" key={tag.id}>
                                {tag.name}
                              </Tag>
                            ))}
                          </Descriptions.Item>
                          <Descriptions.Item
                            className={classes.detail}
                            label={<span>Involved Tags</span>}
                          >
                            {data?.incident?.involvedTags.map((tag) => (
                              <Tag color="red" key={tag.id}>
                                {tag.name}
                              </Tag>
                            )) || 'None'}
                          </Descriptions.Item>
                          <Descriptions.Item
                            className={classes.detail}
                            label={<span>Impact Tags</span>}
                          >
                            {data?.incident?.impactTags.map((tag) => (
                              <Tag color="red" key={tag.id}>
                                {tag.name}
                              </Tag>
                            )) || 'None'}
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
                            <Title level={4}>Police Information</Title>
                            <Descriptions
                              column={1}
                              style={{ marginTop: 10 }}
                              className={classes.desc}
                            >
                              <Descriptions.Item
                                className={classes.detail}
                                label={<span>Report To Police</span>}
                              >
                                {data?.incident?.policeReported ? 'Yes' : 'No'}
                              </Descriptions.Item>
                              <Descriptions.Item
                                className={classes.detail}
                                label={<span>Police Attended</span>}
                              >
                                {data?.incident?.policeInvolved ? 'Yes' : 'No'}
                              </Descriptions.Item>
                              <Descriptions.Item
                                className={classes.detail}
                                label="Crime Ref"
                              >
                                {data?.incident?.policeRef || 'Not Provided'}
                              </Descriptions.Item>
                              <Descriptions.Item
                                className={classes.detail}
                                label={<span>Officer Collar Number</span>}
                              >
                                {data?.incident?.policeNo || 'Not Provided'}
                              </Descriptions.Item>
                            </Descriptions>
                          </Card>
                        </Col>
                      </Row>

                      {data?.incident?.crimeTypes
                        .map((item) => item.crimeType)
                        .includes(CrimeType.TheftHandling) && (
                        <Card style={{ marginBottom: 20 }}>
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
                                    Total:
                                  </Table.Summary.Cell>
                                  <Table.Summary.Cell index={1}>
                                    £{totalValue.toFixed(2)}
                                  </Table.Summary.Cell>
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
                        <Title level={4}>Offenders</Title>
                        {data?.incident?.offenders.length && !loading ? (
                          <OffenderTable
                            offenders={data?.incident?.offenders}
                            hasNavigation
                          />
                        ) : (
                          <Empty
                            description="No offenders for this incident"
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                          />
                        )}
                      </Card>

                      <Card style={{ marginTop: 20 }}>
                        <Title level={4}>Vehicles</Title>
                        {data?.incident?.vehicles.length && !loading ? (
                          <VehicleTable
                            vehicles={data?.incident?.vehicles}
                            hasNavigation
                          />
                        ) : (
                          <Empty
                            description="No vehicles for this incident"
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                          />
                        )}
                      </Card>
                      {data?.incident?.scheme.mg11Available && (
                        <Card style={{ marginTop: 20 }}>
                          <Title level={4}>Evidence</Title>
                          {data?.incident?.evidence.length && !loading ? (
                            <EvidenceTable
                              evidence={data?.incident?.evidence}
                            />
                          ) : (
                            <Empty
                              description="No evidence for this incident"
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
                    setOptionRowShow={setOptionRowShow}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

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

      <Drawer
        title="Link Offenders"
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
