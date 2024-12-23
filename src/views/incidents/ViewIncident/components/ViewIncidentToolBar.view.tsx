import type { LocationData } from '#/types/DataType';
import type { ViewIncidentQuery } from '#/views/incidents/ViewIncident/__generated__/view-incident.generated';
import type { ListIncidentsAllSchemesQuery } from 'graphql/incidents/queries/__generated__/list-incidents-all-schemes.generated';

import ShareData from '#/components/form-components/ShareData/ShareData';
import AddLocation from '#/components/form-components/addresses/AddLocation';
import EditIncidentFeed from '#/components/form-components/incident/EditIncidentFeed';
import { IncidentSort, useStoreState } from '#/state';
import errorNotification from '#/types/mutation_notifications/error_notification';
import {
  faBell,
  faBellSlash,
  faEdit,
  faFileDownload,
  faImage,
  faLocationDot,
  faShareNodes,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Col,
  Drawer,
  Dropdown,
  Menu,
  Modal,
  Row,
  Tooltip,
  notification,
} from 'antd';
import { useRecycleIncidentMutation } from 'graphql/incidents/mutations/__generated__/recycle-incident.generated';
import { useSubscribeToIncidentMutation } from 'graphql/incidents/mutations/__generated__/subscribe-to-incident.generated';
import { useUnsubscribeFromIncidentMutation } from 'graphql/incidents/mutations/__generated__/unsubscribe-from-incident.generated';
import { ListIncidentsAllSchemesDocument } from 'graphql/incidents/queries/__generated__/list-incidents-all-schemes.generated';
import { QueryMode, Role, SortOrder } from 'graphql/types';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import useStyles from '../ViewIncident.styles';

const { confirm } = Modal;

interface Props {
  data: ViewIncidentQuery | undefined;
  deleteRights: boolean;
  editAddress: boolean;
  editRights: boolean;
  handlePrint: () => void;
  incidentId: string;
  isPrinting: boolean;
  onEditAddress: (value: LocationData) => void;
  saving: boolean;
  toggleEditAddress: () => void;
  toggleEditImages: () => void;
}

const ViewIncidentToolBar = ({
  data,
  deleteRights,
  editAddress,
  editRights,
  handlePrint,
  incidentId,
  isPrinting,
  onEditAddress,
  saving,
  toggleEditAddress,
  toggleEditImages,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();

  const { id: userId } = useStoreState((state) => state.user);
  const role = useStoreState((state) => state.user.role);
  const schemeId = useStoreState((state) => state.scheme.id);
  const hasConnectedSchemes = useStoreState(
    (state) => state.scheme.hasConnectedSchemes
  );
  const filterVariables = useStoreState(
    (state) => state.data.incidents.variables
  );
  const order = useStoreState((state) => state.data.incidents.order);

  const [shareOpen, setShareOpen] = useState(false);
  const [editIncident, setEditIncident] = useState(false);

  const {
    businesses,
    createdAt,
    crimeTypes,
    gallery,
    goods,
    groups,
    incidentDate,
    peculiarities,
    search,
  } = filterVariables;
  const sideListVars = {
    order: {
      date:
        order === IncidentSort.createdAtDesc ? SortOrder.Desc : SortOrder.Asc,
    },
    skip: 0,
    take: 12,
    where: {
      AND: [
        {
          OR: [
            {
              subject: {
                contains: search,
                mode: QueryMode.Insensitive,
              },
            },
            {
              referenceStr: {
                contains: search,
              },
            },
            {
              createdBy: {
                OR: [
                  {
                    fullName: {
                      contains: search,
                      mode: QueryMode.Insensitive,
                    },
                  },

                  {
                    businesses: {
                      some: {
                        name: {
                          contains: search,
                          mode: QueryMode.Insensitive,
                        },
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
        {
          createdBy: gallery.includes('MYDATA')
            ? {
                id: {
                  equals: userId,
                },
              }
            : undefined,
        },
      ],
      approved:
        role === Role.User
          ? {
              equals: true,
            }
          : gallery.includes('NOT APPROVED')
            ? {
                equals: false,
              }
            : undefined,
      business:
        businesses.length > 0
          ? {
              id: {
                in: businesses,
              },
            }
          : undefined,
      createdAt: createdAt
        ? {
            gte: createdAt.startDate,
            lte: createdAt.endDate,
          }
        : undefined,
      crimeTypes:
        crimeTypes.length > 0
          ? {
              some: {
                id: {
                  in: crimeTypes,
                },
              },
            }
          : undefined,
      date: incidentDate
        ? {
            gte: incidentDate.startDate,
            lte: incidentDate.endDate,
          }
        : undefined,
      description: peculiarities
        ? {
            contains: peculiarities,
            mode: QueryMode.Insensitive,
          }
        : undefined,
      groups:
        groups.length > 0
          ? {
              some: {
                id: {
                  in: groups,
                },
              },
            }
          : undefined,
      incidentItems:
        goods.length > 0
          ? {
              some: {
                goodsType: {
                  id: {
                    in: goods,
                  },
                },
              },
            }
          : undefined,

      policeInvolved: gallery.includes('POLICEINVOLVED')
        ? {
            equals: true,
          }
        : undefined,
      policeReported: gallery.includes('POLICEREPORTED')
        ? {
            equals: true,
          }
        : undefined,
      schemeId: {
        equals: schemeId,
      },

      subscribedUsers: gallery.includes('FOLLOWING')
        ? {
            some: {
              id: {
                equals: userId,
              },
            },
          }
        : undefined,
    },
  };

  const [subscribeToIncident] = useSubscribeToIncidentMutation();
  const [unsubscribeFromIncident] = useUnsubscribeFromIncidentMutation();

  const toggleEditIncident = () => {
    setEditIncident(!editIncident);
  };
  const toggleSubscribe = () => {
    console.log(data?.incident);
    if (data?.incident?.subscribed) {
      void unsubscribeFromIncident({
        optimisticResponse: {
          __typename: 'Mutation',
          unsubscribeFromIncident: {
            __typename: 'Incident',
            id: incidentId,
            subscribed: false,
          },
        },
        variables: {
          where: { id: incidentId },
        },
      });
    } else {
      void subscribeToIncident({
        optimisticResponse: {
          __typename: 'Mutation',
          subscribeToIncident: {
            __typename: 'Incident',
            id: incidentId,
            subscribed: true,
          },
        },
        variables: {
          where: { id: incidentId },
        },
      });
    }
  };
  const toggleShareOpen = () => {
    setShareOpen(!shareOpen);
  };
  const [recycleIncident] = useRecycleIncidentMutation({
    onCompleted: () => {
      window.history.back();
      notification.success({
        description: intl.formatMessage({
          defaultMessage:
            'The incident has been updated from the feed and moved to the recycle bin.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      errorNotification();
    },
    update: (store, { data: res }) => {
      if (res?.recycleIncident === null || res?.recycleIncident === undefined)
        return;
      const existingData = store.readQuery<ListIncidentsAllSchemesQuery>({
        query: ListIncidentsAllSchemesDocument,
        variables: sideListVars,
      });

      if (!existingData?.listIncidentsAllSchemes?.incidents) return;

      store.writeQuery<ListIncidentsAllSchemesQuery>({
        data: {
          __typename: 'Query',
          listIncidentsAllSchemes: {
            ...existingData.listIncidentsAllSchemes,
            incidents: existingData.listIncidentsAllSchemes.incidents.filter(
              ({ id }) => id !== incidentId
            ),
          },
        },
        query: ListIncidentsAllSchemesDocument,
        variables: sideListVars,
      });
    },
  });
  const onDelete = (id: string) => {
    confirm({
      content: intl.formatMessage({
        defaultMessage:
          'Click delete if you wish to delete this incident. It will be removed from the feed and added to the recycle bin for 30 days before being permanently deleted.',
      }),
      okText: intl.formatMessage({ defaultMessage: 'Delete' }),
      onOk() {
        void recycleIncident({
          variables: {
            where: { id },
          },
        });
      },
      title: intl.formatMessage({
        defaultMessage: 'Are you sure?',
      }),
    });
  };

  return (
    <>
      <Row className={classes.headerBar} gutter={8} justify="end">
        <Col>
          <Tooltip
            title={
              data?.incident?.subscribed
                ? intl.formatMessage({
                    defaultMessage: 'Stop getting notified about updates.',
                  })
                : intl.formatMessage({
                    defaultMessage: 'Get notified about updates.',
                  })
            }
          >
            <Button
              color={data?.incident?.subscribed ? undefined : 'danger'}
              disabled={saving}
              loading={saving}
              onClick={toggleSubscribe}
              type="ghost"
            >
              <FontAwesomeIcon
                icon={data?.incident?.subscribed ? faBellSlash : faBell}
                size="1x"
                style={{ marginRight: 8 }}
              />
              {data?.incident?.subscribed
                ? intl.formatMessage({
                    defaultMessage: 'Un-follow',
                  })
                : intl.formatMessage({
                    defaultMessage: 'Follow',
                  })}
            </Button>
          </Tooltip>
        </Col>
        {editRights && hasConnectedSchemes && (
          <Col>
            <Button onClick={toggleShareOpen}>
              <FontAwesomeIcon
                icon={faShareNodes}
                size="1x"
                style={{ marginRight: 8 }}
              />
              <FormattedMessage defaultMessage="Share" />
            </Button>
          </Col>
        )}
        {editRights && (
          <Col>
            <Dropdown
              arrow={{ pointAtCenter: true }}
              overlay={
                <Menu
                  items={[
                    {
                      icon: <FontAwesomeIcon icon={faEdit} />,
                      key: 0,
                      label: intl.formatMessage({
                        defaultMessage: 'Edit Details',
                      }),
                      onClick: () => toggleEditIncident(),
                    },
                    {
                      icon: <FontAwesomeIcon icon={faImage} />,
                      key: 1,
                      label:
                        data?.incident?.totalImages &&
                        data?.incident.totalImages > 0
                          ? intl.formatMessage({
                              defaultMessage: 'Edit Images',
                            })
                          : intl.formatMessage({
                              defaultMessage: 'Add Images',
                            }),
                      onClick: () => toggleEditImages(),
                    },
                    {
                      icon: <FontAwesomeIcon icon={faLocationDot} />,
                      key: 2,
                      label: intl.formatMessage({
                        defaultMessage: 'Edit Address',
                      }),
                      onClick: () => toggleEditAddress(),
                    },
                  ]}
                />
              }
              placement="bottomRight"
            >
              <Button type="ghost">
                <FontAwesomeIcon
                  icon={faEdit}
                  size="1x"
                  style={{ marginRight: 8 }}
                />
                {intl.formatMessage({
                  defaultMessage: 'Edit',
                })}
              </Button>
            </Dropdown>
          </Col>
        )}
        {editRights && (
          <Col>
            <Tooltip
              title={intl.formatMessage({
                defaultMessage: 'Download incident as PDF',
              })}
            >
              <Button loading={isPrinting} onClick={handlePrint}>
                <FontAwesomeIcon
                  icon={faFileDownload}
                  size="1x"
                  style={{ marginRight: 8 }}
                />
                <FormattedMessage defaultMessage="Download" />
              </Button>
            </Tooltip>
          </Col>
        )}
        {deleteRights && (
          <Col>
            <Button onClick={() => onDelete(incidentId)} type="ghost">
              <FontAwesomeIcon
                icon={faTrash}
                size="1x"
                style={{ marginRight: 8 }}
              />
              {intl.formatMessage({
                defaultMessage: 'Delete',
              })}
            </Button>
          </Col>
        )}
      </Row>
      <Drawer
        onClose={toggleEditAddress}
        open={editAddress}
        title={intl.formatMessage({
          defaultMessage: 'Edit Incident Address',
        })}
        width="600"
        zIndex={999}
      >
        {editAddress ? (
          <AddLocation
            locationData={data?.incident?.location ?? undefined}
            onClose={toggleEditAddress}
            update={onEditAddress}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={toggleEditIncident}
        open={editIncident}
        title={intl.formatMessage({
          defaultMessage: 'Edit Incident Details',
        })}
        width="600"
      >
        {editIncident ? (
          <EditIncidentFeed
            incidentId={data?.incident?.id || ''}
            onClose={toggleEditIncident}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        bodyStyle={{ padding: 0 }}
        onClose={toggleShareOpen}
        title={intl.formatMessage({
          defaultMessage: 'Share Incident',
        })}
        visible={shareOpen}
        width={700}
      >
        {shareOpen && (
          <ShareData incidentId={incidentId} onClose={toggleShareOpen} />
        )}
      </Drawer>
    </>
  );
};

export default ViewIncidentToolBar;
