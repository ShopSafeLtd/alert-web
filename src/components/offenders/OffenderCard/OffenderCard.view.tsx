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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTags,
  faMoneyBill,
  faEdit,
  faEllipsisV,
  faExclamationCircle,
  faImage,
  faLocationDot,
  faShirt,
  faPeople,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import {
  faAngleLeft,
  faAngleRight,
  faArrowsMaximize,
} from '@fortawesome/pro-solid-svg-icons';
import { getLastOffence } from 'utils/offender/get-offender-desc';

import type { CarouselRef } from 'antd/lib/carousel';

import { Link } from 'react-router-dom';
import WatermarkImage from 'components/images/WatermarkImage.view';
import SkeletonImage from 'components/images/SkeletonImage.view';
import { useIntl } from 'react-intl';
import EditOffenderFeed from 'components/form-components/offender/EditOffenderFeed';
import FeedImageEditor from 'components/form-components/ImageEditor/FeedImageEditor.view';
import type { EditFeedImage } from 'types/DataType';
import AddInvestigation from 'components/form-components/Investigation/AddInvestigation';
import KnowOffender from 'components/form-components/offender/KnowOffender';
import useStyles from './OffenderCard.styles';

const { Title, Text, Paragraph } = Typography;
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
  compactView: boolean;
  knowOffender: boolean;
  toggleKnowOffender: () => void;
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
  compactView,
  toggleKnowOffender,
  knowOffender,
}: Props): JSX.Element => {
  const classes = useStyles();
  const imagesRef = useRef<CarouselRef>(null);
  const intl = useIntl();
  return (
    <div>
      {compactView ? (
        <Card
          key={offender.id || ''}
          style={{ marginBottom: 0 }}
          bodyStyle={{
            borderRadius: 10,
            padding: 0,
            overflow: 'hidden',
            height: 150,
          }}
        >
          {!offender?.approved && (
            <div className={classes.cardOverlay}>
              <Row justify="center">
                <Col>
                  <Title level={4} style={{ color: '#fff' }}>
                    {intl.formatMessage({
                      defaultMessage: 'This offender is awaiting approval',
                      id: 'Om/2W/',
                    })}
                  </Title>
                </Col>
              </Row>
              {approvalRights && (
                <Row justify="center">
                  <Col>
                    <Link to={`view/${offender?.id}`}>
                      <Button>
                        {intl.formatMessage({
                          defaultMessage: 'Review Offender',
                          id: 'i7Qzld',
                        })}
                      </Button>
                    </Link>
                  </Col>
                </Row>
              )}
            </div>
          )}

          <Row wrap={false}>
            {offender.totalImages && offender.totalImages > 0 ? (
              <Col>
                <div className={classes.imageContainer}>
                  <Carousel
                    ref={imagesRef}
                    afterChange={(currentSlide: number) => {
                      setEditImageId(offender.images[currentSlide].id);
                    }}
                  >
                    {offender?.images.map((image) => (
                      <div className={classes.image} key={image.id}>
                        <WatermarkImage
                          url={image.optimised}
                          rotation={image.rotation}
                          position={image.position}
                        />
                      </div>
                    ))}
                  </Carousel>

                  {offender.totalImages && offender.totalImages > 1 ? (
                    <Row className={classes.cardControls}>
                      <Col>
                        <FontAwesomeIcon
                          className={classes.cardControl}
                          icon={faAngleLeft}
                          onClick={() => imagesRef.current?.prev()}
                        />
                      </Col>
                      <Col flex={1} />
                      <Col>
                        <FontAwesomeIcon
                          className={classes.cardControl}
                          icon={faAngleRight}
                          onClick={() => imagesRef.current?.next()}
                        />
                      </Col>
                    </Row>
                  ) : null}
                  {offender.totalImages && offender.totalImages > 0 ? (
                    <FontAwesomeIcon
                      className={classes.imageExpand}
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
                </div>
              </Col>
            ) : (
              <div />
            )}

            <Col flex={1} className={classes.cardContent}>
              <Link to={`/app/offenders/view/${offender?.id}`}>
                <Row align="middle" wrap={false}>
                  <Col flex={1}>
                    <Title style={{ marginBottom: 0 }} level={4} ellipsis>
                      {offender?.name}
                    </Title>
                  </Col>
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
                              icon: (
                                <FontAwesomeIcon size="lg" icon={faPeople} />
                              ),
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
                              icon: (
                                <FontAwesomeIcon size="lg" icon={faTrash} />
                              ),
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
                      <Button className={classes.menuButton}>
                        <FontAwesomeIcon size="lg" icon={faEllipsisV} />
                      </Button>
                    </Dropdown>
                  )}
                </Row>
              </Link>
              <Link to={`/app/offenders/view/${offender?.id}`}>
                <Text type="secondary" className={classes.alertId}>
                  {intl.formatMessage(
                    { defaultMessage: 'Alert ID: {ref}', id: 'umL9sI' },
                    { ref: offender?.reference }
                  )}
                </Text>
              </Link>
              <div className={classes.bottomRow}>
                {/* <Row>
                  <Col>
                    <FontAwesomeIcon
                      size="sm"
                      className={classes.icon}
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
                </Row> */}
                <Row gutter={[16, 6]} className={classes.descriptionRow}>
                  <Col>
                    <Row gutter={6} wrap={false}>
                      <Col>
                        <FontAwesomeIcon
                          className={classes.cardIcon}
                          icon={faExclamationCircle}
                        />
                      </Col>
                      <Col>
                        <Text type="secondary">
                          {intl.formatMessage({
                            defaultMessage: 'Incidents:',
                            id: '+nRUf9',
                          })}
                        </Text>
                      </Col>
                      <Col>
                        <Text>{offender.totalIncidents}</Text>
                      </Col>
                    </Row>
                  </Col>
                  {offender.totalValue ? (
                    <Col>
                      <Row wrap={false} gutter={6}>
                        <Col>
                          <FontAwesomeIcon
                            className={classes.cardIcon}
                            icon={faMoneyBill}
                          />
                        </Col>
                        <Col>
                          <Text ellipsis type="secondary">
                            {intl.formatMessage({
                              defaultMessage: 'Total Loss:',
                              id: 'qc2QFx',
                            })}
                          </Text>
                        </Col>
                        <Col>
                          <Text>
                            {intl.formatMessage(
                              {
                                defaultMessage: '£{total}',
                                id: '5vPUPO',
                              },
                              {
                                total: offender.totalValue
                                  ? offender.totalValue.toFixed(0)
                                  : 0,
                              }
                            )}
                          </Text>
                        </Col>
                      </Row>
                    </Col>
                  ) : undefined}
                </Row>
                {offender.totalImages === 0 && offender.knownFor.length > 0 ? (
                  <Row
                    className={classes.descriptionRow}
                    gutter={6}
                    wrap={false}
                  >
                    <Col>
                      <FontAwesomeIcon
                        className={classes.cardIcon}
                        icon={faTags}
                      />
                    </Col>
                    <Col>
                      <Text ellipsis type="secondary">
                        {intl.formatMessage({
                          defaultMessage: 'Known for: ',
                          id: 'L+EzyI',
                        })}
                      </Text>
                    </Col>
                    <Col flex={1}>
                      <Text ellipsis>
                        {offender.knownFor.map(
                          (item, index) => `${index > 0 ? ', ' : ''}${item}`
                        )}
                      </Text>
                    </Col>
                  </Row>
                ) : (
                  <div />
                )}
                {offender.totalImages === 0 &&
                offender.targetedGoods.length > 0 ? (
                  <Row
                    className={classes.descriptionRow}
                    gutter={6}
                    wrap={false}
                  >
                    <Col>
                      <FontAwesomeIcon
                        className={classes.cardIcon}
                        icon={faShirt}
                      />
                    </Col>
                    <Col>
                      <Text ellipsis type="secondary">
                        {intl.formatMessage({
                          defaultMessage: 'Targeted: ',
                          id: 'bSKtXw',
                        })}
                      </Text>
                    </Col>
                    <Col flex={1}>
                      <Text ellipsis>{offender.targetedGoods.toString()}</Text>
                    </Col>
                  </Row>
                ) : (
                  <div />
                )}
                <Link
                  to={
                    offender?.latestIncident
                      ? // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                        `/app/incidents/view/${offender.latestIncident.id}`
                      : ''
                  }
                >
                  <Row gutter={6}>
                    <Col>
                      <FontAwesomeIcon
                        className={classes.icon}
                        icon={faLocationDot}
                      />
                    </Col>
                    <Col>
                      <Text type="secondary" ellipsis>
                        {intl.formatMessage({
                          defaultMessage: 'Last Incident: ',
                          id: 'wMliQr',
                        })}
                      </Text>
                    </Col>
                    <Col flex={1}>
                      <Text ellipsis>
                        {getLastOffence(
                          undefined,
                          true,
                          offender.latestIncident ?? undefined
                        ).message ||
                          intl.formatMessage({
                            defaultMessage: 'Unknown',
                            id: '5jeq8P',
                          })}
                      </Text>
                    </Col>
                  </Row>
                </Link>
              </div>
            </Col>
          </Row>
        </Card>
      ) : (
        <Card
          className="offender-card"
          key={offender.id || ''}
          style={{ overflow: 'hidden', marginBottom: 0 }}
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
                  title={offender?.tags
                    .map((item) => ` ${item.name}`)
                    .toString()}
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
          {/* {!menuRights && offender.name === 'Unidentified Offender' && ( */}
          {/*  <Tooltip */}
          {/*    title={intl.formatMessage({ */}
          {/*      defaultMessage: */}
          {/*        'Please click this button if you know the name of this offender', */}
          {/*      id: 'eejF52', */}
          {/*    })} */}
          {/*  > */}
          {/*    <Button */}
          {/*      className={classes.knowButtonLarge} */}
          {/*      onClick={toggleKnowOffender} */}
          {/*      type="primary" */}
          {/*    > */}
          {/*      {intl.formatMessage({ */}
          {/*        defaultMessage: 'Know this offender?', */}
          {/*        id: 'SvQc4C', */}
          {/*      })} */}
          {/*    </Button> */}
          {/*  </Tooltip> */}
          {/* )} */}
          <div className={classes.cardContent}>
            <Link
              to={
                isArticle
                  ? `/app/offenders/view/${offender?.id}`
                  : `view/${offender?.id}`
              }
            >
              <div style={{ marginBottom: 10 }}>
                <Title level={4} ellipsis style={{ marginBottom: 0 }}>
                  {offender?.name}
                </Title>
                <Text type="secondary">
                  {intl.formatMessage(
                    { defaultMessage: 'Alert ID: {ref}', id: 'umL9sI' },
                    { ref: offender?.reference }
                  )}
                </Text>
              </div>

              <Row gutter={16} className={classes.descriptionRow}>
                <Col span={12}>
                  <Row gutter={6} wrap={false}>
                    <Col>
                      <FontAwesomeIcon
                        className={classes.cardIcon}
                        icon={faExclamationCircle}
                      />
                    </Col>
                    <Col>
                      <Text type="secondary">
                        {intl.formatMessage({
                          defaultMessage: 'Incidents:',
                          id: '+nRUf9',
                        })}
                      </Text>
                    </Col>
                    <Col>
                      <Text>{offender.totalIncidents}</Text>
                    </Col>
                  </Row>
                </Col>
                {offender.totalValue ? (
                  <Col span={12}>
                    <Row wrap={false} gutter={6}>
                      <Col>
                        <FontAwesomeIcon
                          className={classes.cardIcon}
                          icon={faMoneyBill}
                        />
                      </Col>
                      <Col>
                        <Text type="secondary">
                          {intl.formatMessage({
                            defaultMessage: 'Total Loss:',
                            id: 'qc2QFx',
                          })}
                        </Text>
                      </Col>
                      <Col>
                        <Text>
                          {intl.formatMessage(
                            {
                              defaultMessage: '£{total}',
                              id: '5vPUPO',
                            },
                            {
                              total: offender.totalValue
                                ? offender.totalValue.toFixed(2)
                                : 0,
                            }
                          )}
                        </Text>
                      </Col>
                    </Row>
                  </Col>
                ) : undefined}
              </Row>
              {offender.knownFor.length > 0 ? (
                <Row className={classes.descriptionRow} gutter={6} wrap={false}>
                  <Col>
                    <FontAwesomeIcon
                      className={classes.cardIcon}
                      icon={faTags}
                    />
                  </Col>
                  <Col>
                    <Text ellipsis type="secondary">
                      {intl.formatMessage({
                        defaultMessage: 'Known for: ',
                        id: 'L+EzyI',
                      })}
                    </Text>
                  </Col>
                  <Col flex={1}>
                    <Text ellipsis>
                      {offender.knownFor.map(
                        (item, index) => `${index > 0 ? ', ' : ''}${item}`
                      )}
                    </Text>
                  </Col>
                </Row>
              ) : (
                <div />
              )}
              {offender.targetedGoods.length > 0 ? (
                <Row className={classes.descriptionRow} gutter={6} wrap={false}>
                  <Col>
                    <FontAwesomeIcon
                      className={classes.cardIcon}
                      icon={faShirt}
                    />
                  </Col>
                  <Col>
                    <Text ellipsis type="secondary">
                      {intl.formatMessage({
                        defaultMessage: 'Targeted: ',
                        id: 'bSKtXw',
                      })}
                    </Text>
                  </Col>
                  <Col flex={1}>
                    <Text ellipsis>{offender.targetedGoods.toString()}</Text>
                  </Col>
                </Row>
              ) : (
                <div />
              )}
              {offender.comment && offender.knownFor.length === 0 ? (
                <Row className={classes.descriptionRow} gutter={6} wrap={false}>
                  <Col flex={1}>
                    <Paragraph
                      style={{
                        maxHeight:
                          offender.targetedGoods.length === 0 ? 40 : 20,
                        marginBottom: 2,
                        overflow: 'hidden',
                      }}
                      ellipsis={{
                        rows: 2,
                      }}
                    >
                      {offender.comment}
                    </Paragraph>
                  </Col>
                </Row>
              ) : (
                <div />
              )}
            </Link>
            <Link
              to={
                offender?.latestIncident
                  ? // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    `/app/incidents/view/${offender.latestIncident.id}`
                  : ''
              }
            >
              <Row wrap={false} className={classes.descriptionRow} gutter={6}>
                <Col>
                  <FontAwesomeIcon
                    className={classes.cardIcon}
                    icon={faLocationDot}
                  />
                </Col>
                <Col>
                  <Text ellipsis type="secondary">
                    {intl.formatMessage({
                      defaultMessage: 'Last offence: ',
                      id: 'ncfw94',
                    })}
                  </Text>
                </Col>
                <Col flex={1}>
                  <Text ellipsis>
                    {getLastOffence(
                      undefined,
                      undefined,
                      offender.latestIncident ?? undefined
                    ).message ||
                      intl.formatMessage({
                        defaultMessage: 'Unknown',
                        id: '5jeq8P',
                      })}
                  </Text>
                </Col>
              </Row>
            </Link>

            {!offender.comment && offender.targetedGoods.length === 0 ? (
              <div
                style={{
                  height: 27,
                }}
              />
            ) : (
              <div />
            )}
            {offender.targetedGoods.length === 0 ? (
              <div
                style={{
                  height:
                    offender.comment && offender.knownFor.length === 0 ? 0 : 27,
                }}
              />
            ) : (
              <div />
            )}

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
        </Card>
      )}
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Edit Offender',
          id: '+OfJ4/',
        })}
        open={editOffenderFeed}
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
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Know This Offender',
          id: '1EqoEi',
        })}
        open={knowOffender}
        width="400"
        onClose={toggleKnowOffender}
      >
        {knowOffender ? (
          <KnowOffender
            onClose={toggleKnowOffender}
            offenderId={offender.id || ''}
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
        open={addInvestigation}
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
    </div>
  );
};
export default OffenderCard;
