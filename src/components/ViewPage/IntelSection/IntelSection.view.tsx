import React from 'react';
import { Button, Col, Dropdown, Menu, Popover, Row } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/pro-light-svg-icons';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import type { Theme } from 'configs/ThemeConfig';
import type { ViewIncidentQuery } from 'graphql/generated';
import { UpdateType } from 'graphql/generated';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroll-component';
// import type { UpdateData } from 'types/DataType';
import UpdateContent from './Update.view';

const useStyles = createUseStyles((theme: Theme) => ({
  container: {
    padding: 5,
    justifyContent: 'end',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  reply: {
    marginLeft: 30,
  },
  wrapper: {
    marginBottom: 10,
  },
  image: {
    height: 160,
    width: 150,
    backgroundColor: theme.imageBackgroundColor,
    cursor: 'pointer',
    borderRadius: 10,
    border: `2px solid ${theme.borderColor}`,
    overflow: 'hidden',
    transition: 'all 0.3s ease-in-out',
    '@media only screen and (min-height: 800px)': {
      height: 230,
      width: 170,
    },
  },
  icon: { marginRight: 5 },
}));

interface Props {
  // updates: UpdateData[] | undefined;
  updates:
    | Exclude<ViewIncidentQuery['incident'], undefined | null>['updates']
    | null
    | undefined;
  scrolledToTop: () => void;
  loadMore: boolean;
  saving: boolean;
  editRights: boolean;
  userId: string;
  confirmDeleteUpdate: (updateId: string) => void;
  setEditUpdate: (value: { id: string; text: string } | null) => void;
  setReplyTo: (
    value: {
      id: string;
      text: string;
      createdAt: string;
      createdBy: string;
    } | null
  ) => void;
  onAddToIncident?: (images: { id: string; url: string }[]) => void;
  onAddToOffender?: (images: { id: string; url: string }[]) => void;
  optionRowShow: boolean;
  // incidentId?: string;
  // offenderId?: string;
  // investigationId?: string;
  // vehicleId?: string;
  // crimeGroupId?: string;
}

const IntelSection = ({
  updates,
  scrolledToTop,
  loadMore,
  saving,
  editRights,
  userId,
  confirmDeleteUpdate,
  setEditUpdate,
  setReplyTo,
  onAddToIncident,
  onAddToOffender,
  optionRowShow,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <InfiniteScroll
      className={classes.container}
      // height="calc(100vh - 80px)"
      height={optionRowShow ? 'calc(100vh - 140px)' : 'calc(100vh - 80px)'}
      initialScrollY={0}
      dataLength={updates?.length || 0}
      next={scrolledToTop}
      hasMore={loadMore}
      inverse
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
      {updates &&
        updates.length > 0 &&
        updates.map((update) => (
          <div key={update.id} className={classes.wrapper}>
            {editRights && update.type !== UpdateType.System ? (
              <Popover
                trigger="click"
                placement={update.createdBy.id === userId ? 'left' : 'right'}
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
                    articles={update.linkedArticles}
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
                articles={update.linkedArticles}
                showDate
                showUser
              />
            )}
            {update.replies.map((reply) => (
              <div className={classes.reply}>
                {editRights ? (
                  <Popover
                    trigger="click"
                    placement={reply.createdBy.id === userId ? 'left' : 'right'}
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
                        vehicles={update.linkedVehicles}
                        crimeGroups={update.linkedCrimeGroups}
                        articles={update.linkedArticles}
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
                    vehicles={update.linkedVehicles}
                    crimeGroups={update.linkedCrimeGroups}
                    articles={update.linkedArticles}
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
                      overlay={
                        <Menu
                          items={[
                            {
                              key: 0,
                              label: intl.formatMessage({
                                defaultMessage: 'Add Image to Incident',
                                id: 'VN9g7W',
                              }),
                              disabled: !onAddToIncident,
                              onClick: () => {
                                if (
                                  onAddToIncident &&
                                  update?.images &&
                                  update?.images.length > 0
                                )
                                  onAddToIncident(
                                    update.images.map(({ id, optimised }) => ({
                                      id,
                                      url: optimised || '',
                                    }))
                                  );
                              },
                              icon: <FontAwesomeIcon icon={faEdit} />,
                            },
                            {
                              key: 1,
                              label: intl.formatMessage({
                                defaultMessage: 'Add Image to Offender',
                                id: 'dy/65U',
                              }),
                              disabled: !onAddToOffender,
                              onClick: () => {
                                if (
                                  onAddToOffender &&
                                  update?.images &&
                                  update?.images.length > 0
                                )
                                  onAddToOffender(
                                    update.images.map(({ id, optimised }) => ({
                                      id,
                                      url: optimised || '',
                                    }))
                                  );
                              },
                              icon: <FontAwesomeIcon icon={faEdit} />,
                            },
                          ]}
                        />
                      }
                      placement="bottomRight"
                      arrow={{ pointAtCenter: true }}
                    >
                      <Button
                        style={{
                          marginLeft: update.replies.length > 0 ? 48 : 0,
                        }}
                        type="text"
                        danger
                        size="small"
                      >
                        {intl.formatMessage({
                          defaultMessage: 'Add Image',
                          id: 'u1ETNe',
                        })}
                      </Button>
                    </Dropdown>
                  </Col>
                )}
            </Row>
          </div>
        ))}
    </InfiniteScroll>
  );
};

export default IntelSection;
