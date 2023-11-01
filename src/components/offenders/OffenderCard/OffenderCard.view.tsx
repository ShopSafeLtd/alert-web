import React, { useRef } from 'react';
import {
  Button,
  Card,
  Carousel,
  Col,
  Drawer,
  Dropdown,
  Menu,
  Modal,
  Row,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import type { OffenderCardFragment } from 'graphql/generated';
import { Role } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faEarth,
  faEdit,
  faEllipsisV,
  faExclamationCircle,
  faHeadSide,
  faImage,
  faLocationDot,
  faMarsAndVenus,
  faPeople,
  faPlus,
  faTrash,
  faUserClock,
  faUserTag,
} from '@fortawesome/pro-light-svg-icons';
import {
  faAngleLeft,
  faAngleRight,
  faArrowsMaximize,
} from '@fortawesome/pro-solid-svg-icons';
import {
  calcAge,
  getLastOffence,
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderHeight,
  getOffenderRace,
} from 'utils/offender/get-offender-desc';

import type { CarouselRef } from 'antd/lib/carousel';

import { Link } from 'react-router-dom';
import WatermarkImage from 'components/images/WatermarkImage.view';
import SkeletonImage from 'components/images/SkeletonImage.view';
import { useIntl } from 'react-intl';
import EditOffenderFeed from 'components/form-components/offender/EditOffenderFeed';
import FeedImageEditor from 'components/form-components/ImageEditor/FeedImageEditor.view';
import type { EditFeedImage } from 'types/DataType';
import { useStoreState } from 'state';
import AddInvestigation from 'components/form-components/Investigation/AddInvestigation';
import FormatCalendar from 'utils/format-calendar-24h';

const { Title, Text } = Typography;
const { confirm } = Modal;

interface Props {
  offender: OffenderCardFragment;
  approvalRights: boolean;
  deleteRights: boolean;
  menuRights: boolean;
  openLightbox: (elements: { src: string }[], index: number) => void;
  onDelete: (id: string) => void;
  isArticle?: boolean;
  editOffenderFeed: boolean;
  toggleEditOffenderFeed: () => void;
  editImage: boolean;
  toggleEditImage: () => void;
  editImageId: string;
  setEditImageId: (id: string) => void;
  onEditImage: (value: EditFeedImage) => void;
  onNavigate: (id?: string | undefined, url?: string | undefined) => void;
  toggleAddInvestigation: () => void;
  addInvestigation: boolean;
}

const OffenderCard = ({
  offender,
  approvalRights,
  deleteRights,
  menuRights,
  openLightbox,
  onNavigate,
  onDelete,
  isArticle,
  editOffenderFeed,
  toggleEditOffenderFeed,
  editImage,
  toggleEditImage,
  editImageId,
  setEditImageId,
  onEditImage,
  addInvestigation,
  toggleAddInvestigation,
}: Props): JSX.Element => {
  const role = useStoreState((state) => state.user.role);
  const publicOffenderDOB =
    useStoreState((state) => state.scheme.defaultPublicOffenderDOB) ||
    role !== Role.User;
  const imagesRef = useRef<CarouselRef>(null);
  const intl = useIntl();
  return (
    <Card
      className="offender-card"
      key={offender.id || ''}
      style={{ overflow: 'hidden', marginBottom: 0 }}
      // bodyStyle={{ height: '100%' }}
    >
      {!offender?.approved && (
        <div className="offender-card-overlay">
          <Title level={4} className="offender-card-approval-title">
            {intl.formatMessage({
              defaultMessage: 'This offender is awaiting approval',
              id: 'Om/2W/',
            })}
          </Title>
          {approvalRights && (
            <Link to={`view/${offender?.id}`}>
              <Button>
                {intl.formatMessage({
                  defaultMessage: 'Review Offender',
                  id: 'i7Qzld',
                })}
              </Button>
            </Link>
          )}
        </div>
      )}
      {menuRights && (
        <Dropdown
          trigger={['click']}
          overlay={
            <Menu
              items={[
                {
                  key: 0,
                  label: intl.formatMessage({
                    defaultMessage: 'Edit Offender',
                    id: '+OfJ4/',
                  }),
                  onClick: () => toggleEditOffenderFeed(),
                  icon: <FontAwesomeIcon icon={faEdit} />,
                },
                offender.totalImages && offender.totalImages > 0
                  ? {
                      key: 1,
                      label: intl.formatMessage({
                        defaultMessage: 'Edit Image',
                        id: '9UlLIw',
                      }),
                      onClick: () => toggleEditImage(),
                      icon: <FontAwesomeIcon icon={faImage} />,
                    }
                  : null,
                {
                  key: 2,
                  label: intl.formatMessage({
                    defaultMessage: 'Compare Offender',
                    id: 'Y64oGy',
                  }),
                  onClick: () =>
                    onNavigate(
                      undefined,
                      `/app/offenders/compare/${offender?.id}`
                    ),
                  icon: <FontAwesomeIcon size="lg" icon={faPeople} />,
                },
                {
                  key: 3,
                  label: intl.formatMessage({
                    defaultMessage: 'Delete Offender',
                    id: 'IyEJgq',
                  }),
                  onClick: () =>
                    confirm({
                      title: intl.formatMessage({
                        defaultMessage: 'Are you sure?',
                        id: '2oCaym',
                      }),
                      content: intl.formatMessage({
                        defaultMessage:
                          'Click delete if you wish to delete this offender. It will be removed from the feed and added to the recycle bin for 30 days before being permanently deleted.',
                        id: 'J35F/I',
                      }),
                      okText: intl.formatMessage({
                        defaultMessage: 'Delete',
                        id: 'K3r6DQ',
                      }),
                      onOk: () => onDelete(offender?.id || ''),
                    }),
                  icon: <FontAwesomeIcon size="lg" icon={faTrash} />,
                },
                {
                  key: 4,
                  label: intl.formatMessage({
                    defaultMessage: 'Add Investigation',
                    id: 'U5+v9Y',
                  }),
                  onClick: () => toggleAddInvestigation(),
                  icon: <FontAwesomeIcon icon={faPlus} />,
                },
              ].filter((item) => item?.key !== 3 || deleteRights)}
            />
          }
          placement="bottomRight"
          arrow={{ pointAtCenter: true }}
        >
          <Button className="offender-card-menu">
            <FontAwesomeIcon size="lg" icon={faEllipsisV} />
          </Button>
        </Dropdown>
      )}
      <div className="offender-card-tags">
        <Row gutter={8}>
          {offender?.tags.slice(0, 2).map((tag) => (
            <Col key={tag.id}>
              <Tag className="offender-card-tag" color="red">
                {tag.name}
              </Tag>
            </Col>
          ))}
          {offender?.tags.length > 2 && (
            <Tooltip
              title={offender?.tags.map((item) => ` ${item.name}`).toString()}
            >
              {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
              <Tag className="incident-card-tag" color="red">
                + {offender.tags.length - 1}
              </Tag>
            </Tooltip>
          )}
        </Row>
      </div>
      {offender.totalImages && offender.totalImages > 0 ? (
        <Carousel
          ref={imagesRef}
          afterChange={(currentSlide: number) => {
            setEditImageId(offender.images[currentSlide].id);
          }}
        >
          {offender?.images.map((image) => (
            <div key={image.id}>
              <div className="offender-card-image">
                <WatermarkImage
                  // ???
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  rotation={image.rotation}
                  position={image.position}
                  url={image.optimised}
                />
              </div>
            </div>
          ))}
        </Carousel>
      ) : (
        <SkeletonImage height={300} />
      )}
      {offender.totalImages && offender.totalImages > 1 ? (
        <Row className="offender-card-controls">
          <Col>
            <FontAwesomeIcon
              size="lg"
              className="offender-card-control"
              icon={faAngleLeft}
              onClick={() => imagesRef.current?.prev()}
            />
          </Col>
          <Col flex={1} />
          <Col>
            <FontAwesomeIcon
              size="lg"
              className="offender-card-control"
              icon={faAngleRight}
              onClick={() => imagesRef.current?.next()}
            />
          </Col>
        </Row>
      ) : null}
      {offender.totalImages && offender.totalImages > 0 ? (
        <FontAwesomeIcon
          size="lg"
          className="offender-card-expand"
          icon={faArrowsMaximize}
          onClick={() =>
            openLightbox(
              offender?.images.map((image) => ({
                src: image.optimised || '',
              })) || [],
              0
            )
          }
        />
      ) : null}
      <div className="offender-card-content">
        <Link
          to={
            isArticle
              ? `/app/offenders/view/${offender?.id}`
              : `view/${offender?.id}`
          }
        >
          <div style={{ marginBottom: 10 }}>
            <Row gutter={8}>
              <Col flex={1}>
                <Title level={4} ellipsis style={{ marginBottom: 0 }}>
                  {offender?.name}
                </Title>
              </Col>
              <Col>
                <FontAwesomeIcon
                  style={{ marginRight: 5, width: 20, fontSize: 18 }}
                  icon={faExclamationCircle}
                />
                <Text style={{ fontSize: 16 }} type="secondary">
                  {offender?.totalIncidents}
                </Text>
              </Col>
            </Row>
            <Text type="secondary">
              {intl.formatMessage(
                { defaultMessage: 'Alert ID: {ref}', id: 'umL9sI' },
                { ref: offender?.reference }
              )}
            </Text>
          </div>

          <Row gutter={16}>
            <Col span={12}>
              <FontAwesomeIcon
                size="sm"
                className="offender-card-icon"
                icon={faUserTag}
              />
              <Text type="secondary">
                {intl.formatMessage(
                  {
                    defaultMessage: 'Build: {build}',
                    id: 'B0zBf8',
                  },
                  {
                    build: getOffenderBuild(offender.build),
                  }
                )}
              </Text>
            </Col>
            <Col span={12}>
              <FontAwesomeIcon
                size="sm"
                className="offender-card-icon"
                icon={faHeadSide}
              />
              <Text type="secondary">
                {intl.formatMessage(
                  {
                    defaultMessage: 'Height: {height}',
                    id: 'f9Kbe7',
                  },
                  {
                    height: getOffenderHeight(offender.height),
                  }
                )}
              </Text>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <FontAwesomeIcon
                size="sm"
                className="offender-card-icon"
                icon={faMarsAndVenus}
              />
              <Text type="secondary">
                {intl.formatMessage(
                  {
                    defaultMessage: 'Sex: {gender}',
                    id: 'ulwh+J',
                  },
                  {
                    gender: getOffenderGender(offender.gender),
                  }
                )}
              </Text>
            </Col>
            {publicOffenderDOB && (
              <Col span={12}>
                <FontAwesomeIcon
                  size="sm"
                  className="offender-card-icon"
                  icon={faUserClock}
                />
                <Text type="secondary">
                  {intl.formatMessage(
                    {
                      defaultMessage: 'Age: {age}',
                      id: '9kQMmf',
                    },
                    {
                      age: offender.dateOfBirth
                        ? calcAge(offender.dateOfBirth)
                        : getOffenderAge(offender.age),
                    }
                  )}
                </Text>
              </Col>
            )}
          </Row>
          <Row>
            <Col>
              <FontAwesomeIcon
                size="sm"
                className="offender-card-icon"
                icon={faEarth}
              />
              <Text type="secondary">
                {intl.formatMessage(
                  {
                    defaultMessage: 'Ethnicity: {race}',
                    id: 'ht++Mj',
                  },
                  {
                    race: getOffenderRace(offender.race, false),
                  }
                )}
              </Text>
            </Col>
          </Row>
        </Link>
        <Row style={{ marginTop: 3 }}>
          <Col>
            <FontAwesomeIcon
              size="sm"
              className="offender-card-icon"
              icon={faClock}
            />
            <Text type="secondary">
              {intl.formatMessage(
                {
                  defaultMessage: 'Last updated: {updatedAt}',
                  id: 'SYtNVL',
                },
                {
                  updatedAt: FormatCalendar(offender?.updatedAt),
                }
              )}
            </Text>
          </Col>
        </Row>
        <Link
          to={
            offender?.latestIncident
              ? // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                `/app/incidents/view/${offender.latestIncident.id}`
              : ''
          }
        >
          <Row gutter={8}>
            <Col span={1}>
              <FontAwesomeIcon
                size="sm"
                className="offender-card-icon"
                icon={faLocationDot}
              />
            </Col>

            <Col span={23}>
              <Text
                style={{ width: '100%', marginBottom: 10 }}
                ellipsis
                type="secondary"
              >
                {intl.formatMessage(
                  {
                    defaultMessage: 'Last offence: {lastOffence}',
                    id: '9eFYpD',
                  },
                  {
                    lastOffence: getLastOffence(
                      undefined,
                      undefined,
                      offender.latestIncident ?? undefined
                    ).message,
                  }
                )}
              </Text>
            </Col>
          </Row>
        </Link>

        <Link
          to={
            isArticle
              ? `/app/offenders/view/${offender?.id}`
              : `view/${offender?.id}`
          }
        >
          {offender?.groups && offender.groups.length > 0 && (
            <Row wrap={false} style={{ overflowX: 'auto' }} align="middle">
              <Col style={{ minWidth: 60 }}>
                <Text type="secondary">
                  {intl.formatMessage({
                    defaultMessage: 'Groups:',
                    id: 'JcJ/mL',
                  })}
                </Text>
              </Col>
              {offender.groups.slice(0, 1).map((group) => (
                <Col key={group.id}>
                  <Tag>{group.name}</Tag>
                </Col>
              ))}
              {offender.groups.length > 1 && (
                <Col>
                  <Tooltip
                    title={offender.groups
                      .map((item) => ` ${item.name}`)
                      .toString()}
                  >
                    <Tag>
                      {intl.formatMessage(
                        {
                          defaultMessage: '+{count} more',
                          id: '/zFGgP',
                        },
                        {
                          count: offender.groups.length - 1,
                        }
                      )}
                    </Tag>
                  </Tooltip>
                </Col>
              )}
            </Row>
          )}
        </Link>

        <Row justify="center">
          <Col>
            <Link
              to={
                isArticle
                  ? `/app/offenders/view/${offender?.id}`
                  : `view/${offender?.id}`
              }
            >
              <Button size="small" type="text" style={{ marginTop: 10 }}>
                {intl.formatMessage({
                  defaultMessage: 'View Full Offender',
                  id: 'm94i2s',
                })}
              </Button>
            </Link>
          </Col>
        </Row>
      </div>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Edit Offender',
          id: '+OfJ4/',
        })}
        visible={editOffenderFeed}
        width="600"
        onClose={toggleEditOffenderFeed}
      >
        {editOffenderFeed ? (
          <EditOffenderFeed
            onClose={toggleEditOffenderFeed}
            offenderId={offender.id}
          />
        ) : (
          <div />
        )}
      </Drawer>
      {/* investigation */}
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add New Investigation',
          id: 'QaKS9A',
        })}
        visible={addInvestigation}
        width="500"
        onClose={toggleAddInvestigation}
      >
        {addInvestigation ? (
          <AddInvestigation
            offenderId={offender.id}
            onClose={toggleAddInvestigation}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <FeedImageEditor
        submitImage={onEditImage}
        onClose={toggleEditImage}
        open={editImage}
        image={offender.images.find((image) => editImageId === image.id)}
      />
    </Card>
  );
};

export default OffenderCard;
