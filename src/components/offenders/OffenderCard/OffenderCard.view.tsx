import type { CarouselRef } from 'antd/lib/carousel';
import type { OffenderCardFragment } from 'graphql/fragments/__generated__/offender-card.generated';
import type { EditFeedImage } from 'types/DataType';

import { currencyAtom } from '#/providers/SchemeProvider/SchemeProvider';
import hasRolePermission from '#/utils/has-role-permission';
import {
  faEdit,
  faEllipsisV,
  faExclamationCircle,
  faImage,
  faLocationDot,
  faMoneyBill,
  faPeople,
  faPlus,
  faShieldCheck,
  faShirt,
  faTags,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import {
  faAngleLeft,
  faAngleRight,
  faArrowsMaximize,
} from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import ImageEditor from 'components/form-components/ImageEditor/ImageEditor.view';
import AddInvestigation from 'components/form-components/Investigation/AddInvestigation';
import EditOffenderFeed from 'components/form-components/offender/EditOffenderFeed';
import KnowOffender from 'components/form-components/offender/KnowOffender';
import SkeletonImage from 'components/images/SkeletonImage.view';
import WatermarkImage from 'components/images/WatermarkImage.view';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import { useAtomValue } from 'jotai';
import React, { useRef } from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { getLastOffence } from 'utils/offender/get-offender-desc';

import useStyles from './OffenderCard.styles';

const { Paragraph, Text, Title } = Typography;
const { confirm } = Modal;

interface Props {
  addInvestigation: boolean;
  approvalRights: boolean;
  compactView: boolean;
  editImage: boolean;
  editImageId: string;
  editOffenderFeed: boolean;
  isArticle?: boolean;
  knowOffender: boolean;
  offender: OffenderCardFragment;
  onDelete: (id: string) => void;
  onEditImage: (value: EditFeedImage) => void;
  onNavigate: (id?: string | undefined, url?: string | undefined) => void;
  openLightbox: (elements: { src: string }[], index: number) => void;
  setEditImageId: (id: string) => void;
  toggleAddInvestigation: () => void;
  toggleEditImage: () => void;
  toggleEditOffenderFeed: () => void;
  toggleKnowOffender: () => void;
}

const OffenderCard = ({
  addInvestigation,
  approvalRights,
  compactView,
  editImage,
  editImageId,
  editOffenderFeed,
  isArticle,
  knowOffender,
  offender,
  onDelete,
  onEditImage,
  onNavigate,
  openLightbox,
  setEditImageId,
  toggleAddInvestigation,
  toggleEditImage,
  toggleEditOffenderFeed,
  toggleKnowOffender,
}: Props): JSX.Element => {
  const classes = useStyles();
  const imagesRef = useRef<CarouselRef>(null);
  const intl = useIntl();
  const currency = useAtomValue(currencyAtom);

  const menuItems = [
    {
      icon: <FontAwesomeIcon icon={faEdit} />,
      key: 0,
      label: intl.formatMessage({
        defaultMessage: 'Edit Offender',
      }),
      onClick: () => toggleEditOffenderFeed(),
      permission: {
        method: PermissionMethod.Edit,
        model: PermissionModel.Offenders,
      },
    },
    offender.totalImages && offender.totalImages > 0
      ? {
          icon: <FontAwesomeIcon icon={faImage} />,
          key: 1,
          label: intl.formatMessage({
            defaultMessage: 'Edit Image',
          }),
          onClick: () => toggleEditImage(),
          permission: {
            method: PermissionMethod.Edit,
            model: PermissionModel.Offenders,
          },
        }
      : null,
    {
      icon: <FontAwesomeIcon icon={faPeople} size="lg" />,
      key: 2,
      label: intl.formatMessage({
        defaultMessage: 'Compare Offender',
      }),
      onClick: () =>
        onNavigate(undefined, `/app/offenders/compare/${offender?.id}`),
      permission: {
        method: PermissionMethod.Edit,
        model: PermissionModel.Offenders,
      },
    },
    {
      icon: <FontAwesomeIcon icon={faTrash} size="lg" />,
      key: 3,
      label: intl.formatMessage({
        defaultMessage: 'Delete Offender',
      }),
      onClick: () =>
        confirm({
          content: intl.formatMessage({
            defaultMessage:
              'Click delete if you wish to delete this offender. It will be removed from the feed and added to the recycle bin for 30 days before being permanently deleted.',
          }),
          okText: intl.formatMessage({
            defaultMessage: 'Delete',
          }),
          onOk: () => onDelete(offender?.id || ''),
          title: intl.formatMessage({
            defaultMessage: 'Are you sure?',
          }),
        }),
      permission: {
        method: PermissionMethod.Delete,
        model: PermissionModel.Offenders,
      },
    },
    {
      icon: <FontAwesomeIcon icon={faPlus} />,
      key: 4,
      label: intl.formatMessage({
        defaultMessage: 'Add Investigation',
      }),
      onClick: () => toggleAddInvestigation(),
      permission: {
        method: PermissionMethod.Delete,
        model: PermissionModel.Investigations,
      },
    },
  ].filter(
    (item) =>
      item &&
      hasRolePermission({
        permission: item.permission,
      })
  );

  return (
    <div style={{ height: '100%' }}>
      {compactView ? (
        <Card
          bodyStyle={{
            borderRadius: 10,
            height: 150,
            overflow: 'hidden',
            padding: 0,
          }}
          key={offender.id || ''}
          style={{ marginBottom: 0 }}
        >
          {!offender?.approved && (
            <div className={classes.cardOverlay}>
              <Row justify="center">
                <Col>
                  <Title level={4} style={{ color: '#fff' }}>
                    {intl.formatMessage({
                      defaultMessage: 'This offender is awaiting approval',
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
                    afterChange={(currentSlide: number) => {
                      setEditImageId(offender.images[currentSlide].id);
                    }}
                    ref={imagesRef}
                  >
                    {offender?.images.map((image) => (
                      <div className={classes.image} key={image.id}>
                        <WatermarkImage
                          position={image.position}
                          positionX={image.positionX}
                          positionY={image.positionY}
                          rotation={image.rotation}
                          url={image.optimised}
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

            <Col className={classes.cardContent} flex={1}>
              <Link to={`/app/offenders/view/${offender?.id}`}>
                <Row align="middle" wrap={false}>
                  <Col flex={1}>
                    <Title ellipsis level={4} style={{ marginBottom: 0 }}>
                      {offender?.name ||
                        intl.formatMessage({
                          defaultMessage: 'Offender',
                        })}
                    </Title>
                  </Col>
                  {menuItems.length > 0 && (
                    <Dropdown
                      arrow={{ pointAtCenter: true }}
                      overlay={<Menu items={menuItems} />}
                      placement="bottomRight"
                      trigger={['click']}
                    >
                      <Button className={classes.menuButton}>
                        <FontAwesomeIcon icon={faEllipsisV} size="lg" />
                      </Button>
                    </Dropdown>
                  )}
                </Row>
              </Link>
              <Link to={`/app/offenders/view/${offender?.id}`}>
                <Text className={classes.alertId} type="secondary">
                  {intl.formatMessage(
                    { defaultMessage: 'Alert ID: {ref}' },
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
                <Row className={classes.descriptionRow} gutter={[16, 6]}>
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
                      <Row gutter={6} wrap={false}>
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
                            })}
                          </Text>
                        </Col>
                        <Col>
                          <Text>
                            {intl.formatNumber(offender.totalValue ?? 0, {
                              currency,
                              style: 'currency',
                            })}
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
                      <Text ellipsis type="secondary">
                        {intl.formatMessage({
                          defaultMessage: 'Last Incident: ',
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
          bodyStyle={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
          className="offender-card"
          key={offender.id || ''}
          style={{ marginBottom: 0, overflow: 'hidden' }}
        >
          {!offender?.approved && (
            <div className="offender-card-overlay">
              <Title className="offender-card-approval-title" level={4}>
                {intl.formatMessage({
                  defaultMessage: 'This offender is awaiting approval',
                })}
              </Title>
              {approvalRights && (
                <Link to={`view/${offender?.id}`}>
                  <Button>
                    {intl.formatMessage({
                      defaultMessage: 'Review Offender',
                    })}
                  </Button>
                </Link>
              )}
            </div>
          )}
          {menuItems.length > 0 && (
            <Dropdown
              arrow={{ pointAtCenter: true }}
              overlay={<Menu items={menuItems} />}
              placement="bottomRight"
              trigger={['click']}
            >
              <Button className="offender-card-menu">
                <FontAwesomeIcon icon={faEllipsisV} size="lg" />
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
              afterChange={(currentSlide: number) => {
                setEditImageId(offender.images[currentSlide].id);
              }}
              ref={imagesRef}
            >
              {offender?.images.map((image) => (
                <div key={image.id}>
                  <div className="offender-card-image">
                    <WatermarkImage
                      // ???
                      position={image.position}
                      positionX={image.positionX}
                      positionY={image.positionY}
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                      rotation={image.rotation}
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
                  className="offender-card-control"
                  icon={faAngleLeft}
                  onClick={() => imagesRef.current?.prev()}
                  size="lg"
                />
              </Col>
              <Col flex={1} />
              <Col>
                <FontAwesomeIcon
                  className="offender-card-control"
                  icon={faAngleRight}
                  onClick={() => imagesRef.current?.next()}
                  size="lg"
                />
              </Col>
            </Row>
          ) : null}
          {offender.totalImages && offender.totalImages > 0 ? (
            <FontAwesomeIcon
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
              size="lg"
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
            <div style={{ flex: 1 }}>
              <Link
                to={
                  isArticle
                    ? `/app/offenders/view/${offender?.id}`
                    : `view/${offender?.id}`
                }
              >
                <div style={{ marginBottom: 10 }}>
                  <Row align="middle" gutter={8} wrap={false}>
                    <Col>
                      <Title ellipsis level={4} style={{ marginBottom: 0 }}>
                        {offender?.name ||
                          intl.formatMessage({
                            defaultMessage: 'Offender',
                          })}
                      </Title>
                    </Col>
                    {offender?.idVerified && (
                      <Col>
                        <Tooltip
                          title={intl.formatMessage({
                            defaultMessage: 'Verified ID',
                          })}
                        >
                          <FontAwesomeIcon icon={faShieldCheck} size="xl" />
                        </Tooltip>
                      </Col>
                    )}
                    <Col flex={1} />
                    {offender?.wanted && (
                      <Col>
                        <Tag color={'green'}>
                          {intl.formatMessage({
                            defaultMessage: 'Wanted',
                          })}
                        </Tag>
                      </Col>
                    )}
                  </Row>

                  <Text type="secondary">
                    {intl.formatMessage(
                      { defaultMessage: 'Alert ID: {ref}' },
                      { ref: offender?.reference }
                    )}
                  </Text>
                </div>

                <Row className={classes.descriptionRow} gutter={16}>
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
                      <Row gutter={6} wrap={false}>
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
                            })}
                          </Text>
                        </Col>
                        <Col>
                          <Text>
                            {intl.formatNumber(offender.totalValue ?? 0, {
                              currency,
                              style: 'currency',
                            })}
                          </Text>
                        </Col>
                      </Row>
                    </Col>
                  ) : undefined}
                </Row>
                {offender.knownFor.length > 0 ? (
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
                  <Row
                    className={classes.descriptionRow}
                    gutter={6}
                    wrap={false}
                  >
                    <Col flex={1}>
                      <Paragraph
                        ellipsis={{
                          rows: 2,
                        }}
                        style={{
                          marginBottom: 2,
                          maxHeight:
                            offender.targetedGoods.length === 0 ? 40 : 20,
                          overflow: 'hidden',
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
                <Row className={classes.descriptionRow} gutter={6} wrap={false}>
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
                        })}
                    </Text>
                  </Col>
                </Row>
              </Link>
            </div>

            <Row justify="center">
              <Col>
                <Link
                  to={
                    isArticle
                      ? `/app/offenders/view/${offender?.id}`
                      : `view/${offender?.id}`
                  }
                >
                  <Button size="small" style={{ marginTop: 10 }} type="text">
                    {intl.formatMessage({
                      defaultMessage: 'View Full Offender',
                    })}
                  </Button>
                </Link>
              </Col>
            </Row>
          </div>
        </Card>
      )}
      <Drawer
        onClose={toggleEditOffenderFeed}
        open={editOffenderFeed}
        title={intl.formatMessage({
          defaultMessage: 'Edit Offender',
        })}
        width="600"
      >
        {editOffenderFeed ? (
          <EditOffenderFeed
            offenderId={offender.id}
            onClose={toggleEditOffenderFeed}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={toggleKnowOffender}
        open={knowOffender}
        title={intl.formatMessage({
          defaultMessage: 'Know This Offender',
        })}
        width="400"
      >
        {knowOffender ? (
          <KnowOffender
            offenderId={offender.id || ''}
            onClose={toggleKnowOffender}
          />
        ) : (
          <div />
        )}
      </Drawer>
      {/* investigation */}
      <Drawer
        onClose={toggleAddInvestigation}
        open={addInvestigation}
        title={intl.formatMessage({
          defaultMessage: 'Add New Investigation',
        })}
        width="500"
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
      <ImageEditor
        image={offender.images.find((image) => editImageId === image.id)}
        onClose={toggleEditImage}
        open={editImage}
        submitImage={onEditImage}
      />
    </div>
  );
};
export default OffenderCard;
