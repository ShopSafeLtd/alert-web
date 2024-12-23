import type { WatermarkSlideType } from '#/components/images/WatermartkSlide.view';
import type { ViewIncidentQuery } from '#/views/incidents/ViewIncident/__generated__/view-incident.generated';
import type { Theme } from 'configs/ThemeConfig';

import WatermarkSlide from '#/components/images/WatermartkSlide.view';
import {
  faEdit,
  faFolderPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Dropdown, Menu, Popover, Row } from 'antd';
import { UpdateType } from 'graphql/types';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

// import type { UpdateData } from 'types/DataType';
import UpdateContent from './Update.view';

const useStyles = createUseStyles((theme: Theme) => ({
  container: {
    flexDirection: 'column',
    justifyContent: 'end',
    overflow: 'hidden',
    padding: 5,
  },
  icon: { marginRight: 5 },
  image: {
    '@media only screen and (min-height: 800px)': {
      height: 230,
      width: 170,
    },
    backgroundColor: theme.imageBackgroundColor,
    border: `2px solid ${theme.borderColor}`,
    borderRadius: 10,
    cursor: 'pointer',
    height: 160,
    overflow: 'hidden',
    transition: 'all 0.3s ease-in-out',
    width: 150,
  },
  reply: {
    marginLeft: 30,
  },
  wrapper: {
    marginBottom: 10,
  },
}));

interface Props {
  confirmDeleteUpdate: (updateId: string) => void;
  editRights: boolean;
  // crimeGroupId?: string;
  heightOffset?: number;
  loadMore: boolean;
  onAddToIncident?: (images: { id: string; url: string }[]) => void;
  onAddToOffender?: (images: { id: string; url: string }[]) => void;
  optionRowShow: boolean;
  saving: boolean;
  scrolledToTop: () => void;
  setEditUpdate: (value: { id: string; text: string } | null) => void;
  setReplyTo: (
    value: {
      createdAt: string;
      createdBy: string;
      id: string;
      text: string;
    } | null
  ) => void;
  // updates: UpdateData[] | undefined;
  updates:
    | Exclude<ViewIncidentQuery['incident'], null | undefined>['updates']
    | null
    | undefined;
  // incidentId?: string;
  // offenderId?: string;
  // investigationId?: string;
  // vehicleId?: string;
  userId: string;
}

const IntelSection = ({
  confirmDeleteUpdate,
  editRights,
  heightOffset = 0,
  loadMore,
  onAddToIncident,
  onAddToOffender,
  optionRowShow,
  saving,
  scrolledToTop,
  setEditUpdate,
  setReplyTo,
  updates,
  userId,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();
  const ref = useRef<HTMLDivElement | null>(null);
  const [lightboxElements, setLightboxElements] = useState<
    {
      src: string;
    }[]
  >([]);
  const [lightboxOpen, setLightboxOpen] = useState<{
    index: number;
    open: boolean;
  }>({
    index: 0,
    open: false,
  });

  const onOpenLightbox = (
    elements: {
      src: string;
    }[],
    index?: number
  ) => {
    setLightboxOpen({
      index: index ?? 0,
      open: true,
    });
    setLightboxElements(elements);
  };
  const closeLightbox = () => {
    setLightboxElements([]);
    setLightboxOpen({
      index: 0,
      open: false,
    });
  };

  useEffect(() => {
    ref.current?.scrollIntoView();
  }, [updates]);

  return (
    <>
      <InfiniteScroll
        className={classes.container}
        dataLength={updates?.length || 0}
        hasMore={loadMore}
        // height="calc(100vh - 80px)"
        height={
          optionRowShow
            ? `calc(100vh - 140px - ${heightOffset}px)`
            : `calc(100vh - 80px - ${heightOffset}px)`
        }
        initialScrollY={100}
        inverse
        loader={
          <div className="message-date">
            <div className="date-line" />
            <div className="date">
              {intl.formatMessage({
                defaultMessage: 'Loading...',
              })}
            </div>
            <div className="date-line" />
          </div>
        }
        next={scrolledToTop}
      >
        {updates &&
          updates.length > 0 &&
          [...updates].reverse().map((update) => (
            <div className={classes.wrapper} key={update.id}>
              {editRights && update.type !== UpdateType.System ? (
                <Popover
                  content={
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <Button
                        disabled={saving}
                        icon={
                          <FontAwesomeIcon
                            icon={faEdit}
                            size="lg"
                            style={{ marginRight: 5 }}
                          />
                        }
                        onClick={() => {
                          setEditUpdate({
                            id: update.id,
                            text: update.text || '',
                          });
                        }}
                        size="small"
                        type="text"
                      >
                        {intl.formatMessage({
                          defaultMessage: 'Edit Update',
                        })}
                      </Button>
                      <Button
                        disabled={saving}
                        icon={
                          <FontAwesomeIcon
                            icon={faTrash}
                            size="lg"
                            style={{ marginRight: 5 }}
                          />
                        }
                        onClick={() => {
                          confirmDeleteUpdate(update.id);
                        }}
                        size="small"
                        type="text"
                      >
                        {intl.formatMessage({
                          defaultMessage: 'Delete Update',
                        })}
                      </Button>
                    </div>
                  }
                  overlayClassName="message-popover"
                  placement={update.createdBy.id === userId ? 'left' : 'right'}
                  trigger={['contextMenu']}
                >
                  <div>
                    <UpdateContent
                      articles={update.linkedArticles}
                      content={update.text}
                      createdAt={moment(update.createdAt)}
                      crimeGroups={update.linkedCrimeGroups}
                      from={update.createdBy}
                      id={update.id}
                      images={update.images}
                      incidents={update.linkedIncidents}
                      offenders={update.linkedOffenders}
                      onOpenLightbox={onOpenLightbox}
                      showDate
                      showUser
                      userId={userId}
                      vehicles={update.linkedVehicles}
                    />
                  </div>
                </Popover>
              ) : (
                <UpdateContent
                  articles={update.linkedArticles}
                  content={update.text}
                  createdAt={moment(update.createdAt)}
                  crimeGroups={update.linkedCrimeGroups}
                  from={update.createdBy}
                  id={update.id}
                  images={update.images}
                  incidents={update.linkedIncidents}
                  offenders={update.linkedOffenders}
                  onOpenLightbox={onOpenLightbox}
                  showDate
                  showUser
                  userId={userId}
                  vehicles={update.linkedVehicles}
                />
              )}
              {update.replies.map((reply) => (
                <div className={classes.reply} key={reply.id}>
                  {editRights ? (
                    <Popover
                      content={
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                          }}
                        >
                          <Button
                            disabled={saving}
                            icon={
                              <FontAwesomeIcon
                                icon={faEdit}
                                size="lg"
                                style={{ marginRight: 5 }}
                              />
                            }
                            onClick={() => {
                              setEditUpdate({
                                id: reply.id,
                                text: reply.text || '',
                              });
                            }}
                            size="small"
                            type="text"
                          >
                            {intl.formatMessage({
                              defaultMessage: 'Edit Update',
                            })}
                          </Button>
                          <Button
                            disabled={saving}
                            icon={
                              <FontAwesomeIcon
                                icon={faTrash}
                                size="lg"
                                style={{ marginRight: 5 }}
                              />
                            }
                            onClick={() => {
                              confirmDeleteUpdate(reply.id);
                            }}
                            size="small"
                            type="text"
                          >
                            {intl.formatMessage({
                              defaultMessage: 'Delete Update',
                            })}
                          </Button>
                        </div>
                      }
                      overlayClassName="message-popover"
                      placement={
                        reply.createdBy.id === userId ? 'left' : 'right'
                      }
                      trigger="click"
                    >
                      <div>
                        <UpdateContent
                          articles={update.linkedArticles}
                          content={reply.text}
                          createdAt={moment(reply.createdAt)}
                          crimeGroups={update.linkedCrimeGroups}
                          from={reply.createdBy}
                          id={reply.id}
                          images={reply.images}
                          incidents={reply.linkedIncidents}
                          offenders={reply.linkedOffenders}
                          onOpenLightbox={onOpenLightbox}
                          showDate
                          showUser
                          userId={userId}
                          vehicles={update.linkedVehicles}
                        />
                      </div>
                    </Popover>
                  ) : (
                    <UpdateContent
                      articles={update.linkedArticles}
                      content={reply.text}
                      createdAt={moment(reply.createdAt)}
                      crimeGroups={update.linkedCrimeGroups}
                      from={reply.createdBy}
                      id={reply.id}
                      images={reply.images}
                      incidents={reply.linkedIncidents}
                      offenders={reply.linkedOffenders}
                      onOpenLightbox={onOpenLightbox}
                      showDate
                      showUser
                      userId={userId}
                      vehicles={update.linkedVehicles}
                    />
                  )}
                </div>
              ))}
              <Row>
                {update.type !== UpdateType.System && (
                  <Col>
                    <Button
                      danger
                      onClick={() =>
                        setReplyTo({
                          createdAt: update.createdAt.toString(),
                          createdBy:
                            userId === update.createdBy.id
                              ? intl.formatMessage({
                                  defaultMessage: 'You',
                                })
                              : `${update.createdBy.fullName} - ${update.createdBy.businesses[0]?.name}`,
                          id: update.id,
                          text: update.text || '',
                        })
                      }
                      size="small"
                      style={{
                        marginLeft: update.replies.length > 0 ? 48 : 0,
                      }}
                      type="text"
                    >
                      {intl.formatMessage({
                        defaultMessage: 'Reply',
                      })}
                    </Button>
                  </Col>
                )}
                {/* {update.type === UpdateType.Image && editRights && (
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
                    {intl.formatMessage({
                      defaultMessage: 'Add Image to Incident',
                      id: 'VN9g7W',
                    })}
                  </Button>
                </Col>
              )} */}
                {update.type === UpdateType.Image &&
                  editRights &&
                  (onAddToIncident || onAddToOffender) && (
                    <Col>
                      <Dropdown
                        arrow={{ pointAtCenter: true }}
                        overlay={
                          <Menu
                            items={[
                              {
                                icon: <FontAwesomeIcon icon={faFolderPlus} />,
                                key: 0,
                                label: intl.formatMessage({
                                  defaultMessage: 'Add Image to Incident',
                                }),
                                onClick: () => {
                                  if (onAddToIncident)
                                    onAddToIncident(
                                      update.images.map(
                                        ({ id, optimised }) => ({
                                          id,
                                          url: optimised || '',
                                        })
                                      )
                                    );
                                },
                              },
                              {
                                icon: <FontAwesomeIcon icon={faFolderPlus} />,
                                key: 1,
                                label: intl.formatMessage({
                                  defaultMessage: 'Add Image to Offender',
                                }),
                                onClick: () => {
                                  if (onAddToOffender)
                                    onAddToOffender(
                                      update.images.map(
                                        ({ id, optimised }) => ({
                                          id,
                                          url: optimised || '',
                                        })
                                      )
                                    );
                                },
                              },
                            ].filter(
                              (item) =>
                                (item.key !== 0 || onAddToIncident) &&
                                (item.key !== 1 || onAddToOffender)
                            )}
                          />
                        }
                        placement="bottomRight"
                      >
                        <Button
                          danger
                          size="small"
                          style={{
                            marginLeft: update.replies.length > 0 ? 48 : 0,
                          }}
                          type="text"
                        >
                          {intl.formatMessage({
                            defaultMessage: 'Add Image',
                          })}
                        </Button>
                      </Dropdown>
                    </Col>
                  )}
              </Row>
            </div>
          ))}
        <div ref={ref} />
      </InfiniteScroll>
      <Lightbox
        close={closeLightbox}
        controller={{
          closeOnBackdropClick: true,
        }}
        index={lightboxOpen.index}
        open={lightboxOpen.open}
        plugins={[Zoom]}
        render={{
          slide: (slide: WatermarkSlideType) => (
            <WatermarkSlide slide={slide} />
          ),
        }}
        slides={lightboxElements}
      />
    </>
  );
};

export default IntelSection;
