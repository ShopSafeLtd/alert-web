import type { OffenderData } from '#/types/DataType';
import type {
  ViewIncidentQuery,
  ViewIncidentQueryVariables,
} from '#/views/incidents/ViewIncident/__generated__/view-incident.generated';

import UpdateBar from '#/components/MessageInput/UpdateBar';
import IntelSection from '#/components/ViewPage/IntelSection';
import OffenderTile from '#/components/form-components/offender/OffenderTile';
import WatermarkImage from '#/components/images/WatermarkImage.view';
import errorNotification from '#/types/mutation_notifications/error_notification';
import { ViewIncidentDocument } from '#/views/incidents/ViewIncident/__generated__/view-incident.generated';
import useStyles from '#/views/incidents/ViewIncident/ViewIncident.styles';
import { Checkbox, Col, Drawer, Input, Modal, Row, notification } from 'antd';
import AddExistingOffender from 'components/form-components/offender/AddExistingOffender';
import { useAddImagesToIncidentMutation } from 'graphql/incidents/mutations/__generated__/add-images-to-incident.generated';
import { useUpdateIncidentMutation } from 'graphql/incidents/mutations/__generated__/update-incident.generated';
import { useDeleteUpdateMutation } from 'graphql/mutations/__generated__/delete-update.generated';
import { useUpdateUpdateMutation } from 'graphql/mutations/__generated__/update-update.generated';
import { useAddImagesToOffenderMutation } from 'graphql/offenders/mutations/__generated__/add-images-to-offender.generated';
import update from 'immutability-helper';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

const { confirm } = Modal;

interface Props {
  data: ViewIncidentQuery | undefined;
  editRights: boolean;
  incidentId: string;
  saving: boolean;
  setSaving: (value: boolean) => void;
  userId: string;
}

const Intel = ({
  data,
  editRights,
  incidentId,
  saving,
  setSaving,
  userId,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();
  const [selectedOffenderId, setSelectedOffenderId] = useState<string>('');
  const [showOffenderOptions, setShowOffenderOptions] = useState(false);
  const [addImages, setAddImages] = useState<
    | {
        id: string;
        url: string;
      }[]
    | null
  >(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [addImageToOffenders, setAddImageToOffenders] = useState(false);
  const [linkOffender, setLinkOffender] = useState(false);
  const [replyTo, setReplyTo] = useState<{
    createdAt: string;
    createdBy: string;
    id: string;
    text: string;
  } | null>(null);
  const [editUpdate, setEditUpdate] = useState<{
    id: string;
    text: string;
  } | null>(null);
  const [editUpdateInput, setEditUpdateInput] = useState('');
  const [optionRowShow, setOptionRowShow] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    if (editUpdate) setEditUpdateInput(editUpdate.text);
  }, [editUpdate]);

  const [deleteUpdate] = useDeleteUpdateMutation();
  const [updateUpdate] = useUpdateUpdateMutation();
  const [addImagesToOffender] = useAddImagesToOffenderMutation({
    onCompleted: () => {
      setShowOffenderOptions(false);
      setSelectedImages([]);
      setSelectedOffenderId('');
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The images have been added to the offender!',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Added!',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      errorNotification();
    },
  });
  const [addImagesToIncident] = useAddImagesToIncidentMutation({
    onCompleted: () => {
      setSelectedImages([]);
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The images have been added to this incident!',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Added!',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      errorNotification();
    },
  });
  const [updateIncident] = useUpdateIncidentMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The offenders have been Linked to this incidents!',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Linked!',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      errorNotification();
    },
  });

  const scrolledToTop = () => {
    setLoadMore(true);
  };
  const toggleShowOffenderOptions = () => {
    setShowOffenderOptions(!showOffenderOptions);
  };
  const toggleLinkOffender = () => {
    setLinkOffender(!linkOffender);
  };
  const closeAddImages = () => {
    setAddImages(null);
    setSelectedImages([]);
  };

  const toggleSelectImages = (id: string) => {
    if (selectedImages.includes(id)) {
      setSelectedImages(selectedImages.filter((item) => item !== id));
    } else {
      setSelectedImages([...selectedImages, id]);
    }
  };
  const onAddUpdateImagesToIncident = (images: { id: string }[]) => {
    void addImagesToIncident({
      variables: {
        images,
        incident: {
          id: incidentId,
        },
      },
    });
  };
  const onAddUpdateImagesToOffender = (offenderId: string) => {
    void addImagesToOffender({
      variables: {
        images: selectedImages.map((id) => ({ id })),
        offender: {
          id: offenderId,
        },
      },
    });
  };
  const onSelectUpdateImages = () => {
    if (selectedImages) {
      if (!addImageToOffenders) {
        onAddUpdateImagesToIncident(selectedImages.map((id) => ({ id })));
      }
      if (addImageToOffenders && data?.incident.offenders) {
        if (data?.incident.offenders.length > 1) {
          setShowOffenderOptions(true);
        } else {
          onAddUpdateImagesToOffender(data?.incident.offenders[0].id);
        }
      }
      setAddImages(null);
    }
  };
  const updateOffendersList = (selectedOffender: OffenderData) => {
    setSaving(true);
    if (incidentId && selectedOffender) {
      void updateIncident({
        variables: {
          data: {
            offenders: {
              connect: [{ id: selectedOffender.id }],
            },
          },
          where: {
            id: incidentId,
          },
        },
      });
    }
    setSaving(false);
  };
  const onAddUpdateImages = (
    images: { id: string; url: string }[],
    addToOffender?: boolean
  ) => {
    setAddImageToOffenders(!!addToOffender);

    if (images.length > 1) {
      setAddImages(images);
    }
    if (images.length === 1) {
      if (addToOffender && data?.incident.offenders) {
        setSelectedImages([images[0].id]);
        if (data?.incident.offenders.length > 1) {
          setShowOffenderOptions(true);
        } else {
          confirm({
            content: intl.formatMessage({
              defaultMessage:
                'Adding this image will notify any other users following the incident.',
            }),
            okText: intl.formatMessage({
              defaultMessage: 'Add Images',
            }),
            onOk() {
              onAddUpdateImagesToOffender(data?.incident.offenders[0].id);
            },
            title: intl.formatMessage({
              defaultMessage: 'Are you sure?',
            }),
          });
        }
      } else {
        confirm({
          content: intl.formatMessage({
            defaultMessage:
              'Adding this image will notify any other users following the offender.',
          }),
          okText: intl.formatMessage({
            defaultMessage: 'Add Images',
          }),
          onOk() {
            onAddUpdateImagesToIncident(images.map(({ id }) => ({ id })));
          },
          title: intl.formatMessage({
            defaultMessage: 'Are you sure?',
          }),
        });
      }
    }
  };
  const handleEditUpdate = () => {
    if (editUpdate !== null)
      void updateUpdate({
        optimisticResponse: {
          __typename: 'Mutation',
          updateUpdate: {
            __typename: 'Update',
            id: editUpdate.id || '',
            text: editUpdateInput,
          },
        },
        variables: {
          data: {
            text: editUpdateInput,
          },
          where: {
            id: editUpdate.id,
          },
        },
      });
    setEditUpdate(null);
    setEditUpdateInput('');
  };
  const handleDeleteUpdate = (updateId: string) => {
    void deleteUpdate({
      optimisticResponse: {
        __typename: 'Mutation',
        deleteUpdate: {
          __typename: 'Update',
          id: updateId,
          replyToId: '',
        },
      },
      update: (store, result) => {
        if (result.data?.deleteUpdate) {
          const oldData = store.readQuery<
            ViewIncidentQuery,
            ViewIncidentQueryVariables
          >({
            query: ViewIncidentDocument,
            variables: {
              where: {
                id: incidentId,
              },
            },
          });

          if (oldData?.incident)
            if (result.data.deleteUpdate.replyToId) {
              const updateItem = oldData.incident.updates.find(
                (item) => item.id === result.data?.deleteUpdate?.replyToId
              );
              if (updateItem) {
                store.writeQuery<ViewIncidentQuery, ViewIncidentQueryVariables>(
                  {
                    data: {
                      incident: {
                        ...oldData.incident,
                        updates: update(oldData.incident.updates, {
                          [oldData.incident.updates
                            .map((item) => item.id)
                            .indexOf(result.data.deleteUpdate.replyToId)]: {
                            replies: {
                              $set: updateItem.replies.filter(
                                (item) =>
                                  item.id !== result.data?.deleteUpdate?.id
                              ),
                            },
                          },
                        }),
                      },
                    },
                    query: ViewIncidentDocument,
                    variables: {
                      where: {
                        id: incidentId,
                      },
                    },
                  }
                );
              }
            } else {
              store.writeQuery<ViewIncidentQuery, ViewIncidentQueryVariables>({
                data: {
                  incident: {
                    ...oldData.incident,
                    updates: oldData.incident.updates.filter(
                      (item) => item.id !== result.data?.deleteUpdate?.id
                    ),
                  },
                },
                query: ViewIncidentDocument,
                variables: {
                  where: {
                    id: incidentId,
                  },
                },
              });
            }
        }
      },
      variables: {
        where: {
          id: updateId,
        },
      },
    });
  };
  const confirmDeleteUpdate = (updateId: string) => {
    confirm({
      content: intl.formatMessage({
        defaultMessage: 'The update will be permanently deleted.',
      }),
      okText: intl.formatMessage({ defaultMessage: 'Delete' }),
      onOk() {
        handleDeleteUpdate(updateId);
      },
      title: intl.formatMessage({
        defaultMessage: 'Are you sure?',
      }),
    });
  };

  return (
    <div className={classes.updatesContainer}>
      <IntelSection
        confirmDeleteUpdate={confirmDeleteUpdate}
        editRights={editRights}
        loadMore={loadMore}
        onAddToIncident={(value) => onAddUpdateImages(value)}
        onAddToOffender={
          data?.incident.offenders && data?.incident.offenders.length > 0
            ? (value) => onAddUpdateImages(value, true)
            : undefined
        }
        optionRowShow={optionRowShow}
        saving={saving}
        scrolledToTop={scrolledToTop}
        setEditUpdate={setEditUpdate}
        setReplyTo={setReplyTo}
        updates={data?.incident?.updates}
        userId={userId}
      />

      <UpdateBar
        incidentId={incidentId}
        replyTo={replyTo}
        setOptionRowShow={setOptionRowShow}
        setReplyTo={setReplyTo}
        subscribed={data?.incident?.subscribed || false}
      />

      <Modal
        okText={intl.formatMessage({
          defaultMessage: 'Add Offender',
        })}
        onCancel={() => {
          toggleShowOffenderOptions();
          closeAddImages();
          setSelectedOffenderId('');
        }}
        onOk={() => {
          if (selectedOffenderId)
            onAddUpdateImagesToOffender(selectedOffenderId);
        }}
        open={showOffenderOptions}
        title={intl.formatMessage({
          defaultMessage: 'Select an offender to add the update images',
        })}
        width={700}
      >
        <Row gutter={8}>
          {data?.incident.offenders?.map((offender) => (
            <Col
              className={classes.selectCard}
              key={offender.id}
              span={offender.images && offender.images.length > 0 ? 12 : 6}
            >
              <Checkbox
                checked={offender.id === selectedOffenderId}
                className={classes.checkBox}
                onChange={() => setSelectedOffenderId(offender.id)}
                value={offender.id}
              />

              <OffenderTile
                offender={offender}
                onClick={() => setSelectedOffenderId(offender.id)}
              />
            </Col>
          ))}
        </Row>
      </Modal>
      <Modal
        okText={intl.formatMessage({ defaultMessage: 'Save' })}
        onCancel={() => setEditUpdate(null)}
        onOk={handleEditUpdate}
        open={editUpdate !== null}
        title={intl.formatMessage({
          defaultMessage: 'Edit Update Content',
        })}
      >
        <Input
          onChange={(e) => setEditUpdateInput(e.target.value)}
          value={editUpdateInput}
        />
      </Modal>
      <Modal
        okText={intl.formatMessage({
          defaultMessage: 'Add Images',
        })}
        onCancel={closeAddImages}
        onOk={() => {
          if (selectedImages && selectedImages.length > 0)
            onSelectUpdateImages();
        }}
        open={addImages !== null}
        title={intl.formatMessage({
          defaultMessage: 'Select Images To Add',
        })}
        width={addImages ? addImages.length * 250 : 400}
      >
        <Row gutter={8} justify="center">
          {addImages?.map((image) => (
            <Col className={classes.selectCard} key={image.id}>
              <Checkbox
                checked={selectedImages.includes(image.id)}
                className={classes.checkBox}
                onChange={() => toggleSelectImages(image.id)}
              />
              <div style={{ height: 200, marginBottom: 10, width: 200 }}>
                <WatermarkImage url={image.url} />
              </div>
            </Col>
          ))}
        </Row>
      </Modal>
      <Drawer
        onClose={toggleLinkOffender}
        open={linkOffender}
        title={intl.formatMessage({
          defaultMessage: 'Link Offenders',
        })}
        width="1000"
      >
        {linkOffender ? (
          <AddExistingOffender
            offenderIds={data?.incident?.offenders.map(({ id }) => id)}
            onClose={toggleLinkOffender}
            update={updateOffendersList}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default Intel;
