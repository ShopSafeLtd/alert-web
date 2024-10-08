/* eslint-disable no-confusing-arrow */
import type { ListDemBusinessEvidenceQuery } from '#/views/settings/businesses/ViewBusiness/graphql/queries/__generated__/list-business-dem-evidence.generated';
import type { MutationUpdaterFn } from '@apollo/client';

import LinkInvestigation from '#/components/form-components/Investigation/LinkInvestigation';
import LinkCrimeGroup from '#/components/form-components/linkOptions/LinkCrimeGroup';
import LinkIncident from '#/components/form-components/linkOptions/LinkIncident';
import LinkOffender from '#/components/form-components/offender/AddExistingOffender';
import Loading from '#/components/shared-components/AntD/Loading';
import { useRecycleDemEvidenceMutation } from '#/views/evidence/EvidenceList/graphql/__generated__/restore-dem-evidence.generated';
import {
  faClipboard,
  faExclamationCircle,
  faEye,
  faFileArrowDown,
  faFileAudio,
  faPeopleGroup,
  faShare,
  faTrash,
  faUsers,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Col,
  Drawer,
  Dropdown,
  Image,
  Menu,
  Popconfirm,
  Row,
  Table,
  Tooltip,
  notification,
} from 'antd';
import { ActionType } from 'graphql/types';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import errorNotification from 'types/mutation_notifications/error_notification';

import type { RestoreDemEvidenceMutation } from './graphql/__generated__/recycle-dem-evidence.generated';

import ViewEvidenceModal from '../../../views/evidence/EvidenceList/ViewEvidenceModal';
import { useCopyEvidenceToAlertMutation } from './graphql/__generated__/copy-evidence-to-alert.generated';
import { useCreateActionEvidenceMutation } from './graphql/__generated__/create-action-evidence.generated';
const useStyles = createUseStyles({
  row: {
    // cursor: 'pointer'
  },
});
interface AssignEvidenceType {
  crimeGroupId?: null | string;
  incidentId?: null | string;
  investigationId?: null | string;
  offenderId?: null | string;
  thumbnailUrl?: null | string;
  url: string;
}
interface ActionEvidenceType {
  evidenceName?: null | string;
  id: string;
  type: ActionType;
}
export type EvidenceData = {
  duration: null | string | undefined;
  id: string;
  importance: null | string | undefined;
  name: string;
  playbackUrl?: string;
  recordedAt: Date | null | undefined;
  thumbnail?: string;
  type: string;
};

type EvidenceType = {
  date: Date | null | undefined;
  duration: null | string | undefined;
  importance: null | string | undefined;
  key: string;
  name: string;
  playbackUrl: string;
  thumbnail: {
    id: string;
    url: string;
  };
  type: string;
};
// interface TableItem {
//   date: Date | null | undefined;
//   duration: null | string | undefined;
//   id: string;
//   item: EvidenceType;
//   thumbnail: {
//     id: string;
//     url: string;
//   };
// }
interface Props {
  demEvidence: ListDemBusinessEvidenceQuery | undefined;
  saving?: boolean;
  update: MutationUpdaterFn<RestoreDemEvidenceMutation>;
}

const DemEvidenceTable = ({
  demEvidence,
  saving: inputSaving,
  update,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();
  const [selectedAssignedItem, setSelectedAssignedItem] = useState<
    { thumbnailUrl?: null | string; url: string } | undefined
  >(undefined);
  const [saving, setSaving] = useState(inputSaving);
  const [selectedData, setSelectedData] = useState<EvidenceType | undefined>(
    undefined
  );
  const [linkIncident, setLinkIncident] = useState(false);
  const [linkOffender, setLinkOffender] = useState(false);
  const [linkInvestigation, setLinkInvestigation] = useState(false);
  const [linkCrimeGroup, setLinkCrimeGroup] = useState(false);
  useEffect(() => {
    if (inputSaving) setSaving(inputSaving);
  }, [inputSaving]);
  const assignTextMap = (values: AssignEvidenceType) => {
    if (values.crimeGroupId)
      return intl.formatMessage({
        defaultMessage: 'crime group',
      });
    if (values.incidentId)
      return intl.formatMessage({
        defaultMessage: 'incident',
      });
    if (values.investigationId)
      return intl.formatMessage({
        defaultMessage: 'investigation',
      });
    if (values.offenderId)
      return intl.formatMessage({
        defaultMessage: 'offender',
      });
  };

  const [copyEvidenceToAlert] = useCopyEvidenceToAlertMutation({
    onError: (err) => {
      errorNotification();
      console.log('onAssign2', err);
    },
  });
  const onAssign = (values: AssignEvidenceType) => {
    setSaving(true);
    console.log('onAssign', values);

    void copyEvidenceToAlert({
      onCompleted: () => {
        console.log('onAssign1');
        notification.success({
          description: intl.formatMessage(
            {
              defaultMessage: 'The evidence has been assigned to the {value}!',
            },
            { value: assignTextMap(values) }
          ),
          message: intl.formatMessage({
            defaultMessage: 'Successfully Assigned!',
          }),
          placement: 'bottomRight',
        });
      },
      variables: {
        data: {
          crimeGroupId: values.crimeGroupId || null,
          incidentId: values.incidentId || null,
          investigationId: values.investigationId || null,
          offenderId: values.offenderId || null,
          thumbnailUrl: values.thumbnailUrl || '',
          url: values.url,
        },
      },
    }).finally(() => {
      setSelectedAssignedItem(undefined);
      setSaving(false);
    });
  };
  const [deleteDemEvidence] = useRecycleDemEvidenceMutation({
    onCompleted: () => {
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The evidence has been Removed from DEM!',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Removed!',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      errorNotification();
    },
    update,
  });
  const onDelete = (value: string) => {
    setSaving(true);
    void deleteDemEvidence({
      variables: {
        id: value || '',
      },
    }).finally(() => setSaving(false));
  };
  const [createActionEvidence] = useCreateActionEvidenceMutation({
    onCompleted: () => {
      console.log('createActionEvidence3');
    },
    onError: (err) => {
      errorNotification();
      console.log('createActionEvidence2', err);
    },
  });
  const onCreateActionEvidence = (values: ActionEvidenceType) => {
    setSaving(true);
    console.log('createActionEvidence1', values);

    void createActionEvidence({
      variables: {
        data: {
          id: values.id,
          type: values.type,
        },
      },
    }).finally(() => setSaving(false));
  };

  const toggleLinkInvestigation = () => {
    setLinkInvestigation(!linkInvestigation);
  };
  const toggleLinkCrimeGroup = () => {
    setLinkCrimeGroup(!linkCrimeGroup);
  };
  const toggleLinkIncident = () => {
    setLinkIncident(!linkIncident);
  };
  const toggleLinkOffender = () => {
    setLinkOffender(!linkOffender);
  };
  return (
    <div>
      <Table<EvidenceType>
        columns={[
          {
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            render: (
              thumbnail: {
                id: string;
                url: string;
              },
              record: EvidenceType
            ) =>
              record.type === 'AUDIO' ? (
                <FontAwesomeIcon
                  icon={faFileAudio}
                  onClick={() => {
                    setSelectedData(record);
                  }}
                  style={{
                    height: '80px',
                    width: '80px',
                  }}
                />
              ) : (
                <Image
                  fallback="/img/placeholder-image.png"
                  onClick={() => {
                    setSelectedData(record);
                  }}
                  placeholder={<Loading />}
                  preview={false}
                  src={thumbnail.url}
                  style={{ height: '80px' }}
                  width={100}
                />
              ),
            title: '',
            width: '20%',
          },

          {
            dataIndex: 'duration',
            key: 'duration',
            title: intl.formatMessage({
              defaultMessage: 'Duration',
            }),
            width: '15%',
          },
          {
            dataIndex: 'date',
            key: 'date',
            render: (date: Date) =>
              new Date(date)
                .toLocaleString('en-GB', {
                  timeZone: 'UTC',
                })
                .split(',')
                .reverse()
                .join(' - ') || 'No date',
            title: intl.formatMessage({
              defaultMessage: 'Recorded At',
            }),
            width: '25%',
          },
          {
            dataIndex: 'fileUrl',
            key: 'fileUrl',
            render: (_, record) => (
              <Row gutter={8}>
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'View Evidence',
                    })}
                  >
                    <Button
                      disabled={saving}
                      icon={<FontAwesomeIcon icon={faEye} />}
                      onClick={() => {
                        onCreateActionEvidence({
                          id: record.key,
                          type: ActionType.View,
                        });
                        setSelectedData(record);
                      }}
                      size="small"
                    />
                  </Tooltip>
                </Col>
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'Download Evidence',
                    })}
                  >
                    <Button
                      disabled={saving}
                      icon={<FontAwesomeIcon icon={faFileArrowDown} />}
                      onClick={() => {
                        onCreateActionEvidence({
                          id: record.key,
                          type: ActionType.Download,
                        });
                        window.open(record.playbackUrl);
                      }}
                      size="small"
                    />
                  </Tooltip>
                </Col>

                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'Assign Evidence',
                    })}
                  >
                    <Dropdown
                      overlay={
                        <Menu
                          items={[
                            {
                              icon: (
                                <FontAwesomeIcon
                                  icon={faExclamationCircle}
                                  style={{ marginRight: 5 }}
                                />
                              ),
                              key: '0',
                              label: intl.formatMessage({
                                defaultMessage: 'Assign evidence to incident',
                              }),
                              onClick: () => {
                                setSelectedAssignedItem({
                                  thumbnailUrl: record.thumbnail.url,
                                  url: record.playbackUrl,
                                });
                                toggleLinkIncident();
                              },
                            },
                            {
                              icon: (
                                <FontAwesomeIcon
                                  icon={faUsers}
                                  style={{ marginRight: 5 }}
                                />
                              ),
                              key: '1',
                              label: intl.formatMessage({
                                defaultMessage: 'Assign evidence to offender',
                              }),
                              onClick: () => {
                                setSelectedAssignedItem({
                                  thumbnailUrl: record.thumbnail.url,
                                  url: record.playbackUrl,
                                });
                                toggleLinkOffender();
                              },
                            },
                            {
                              icon: (
                                <FontAwesomeIcon
                                  icon={faClipboard}
                                  style={{ marginRight: 5 }}
                                />
                              ),
                              key: '2',
                              label: intl.formatMessage({
                                defaultMessage:
                                  'Assign evidence to investigation',
                              }),
                              onClick: () => {
                                setSelectedAssignedItem({
                                  thumbnailUrl: record.thumbnail.url,
                                  url: record.playbackUrl,
                                });
                                toggleLinkInvestigation();
                              },
                            },
                            {
                              icon: (
                                <FontAwesomeIcon
                                  icon={faPeopleGroup}
                                  style={{ marginRight: 5 }}
                                />
                              ),
                              key: '3',
                              label: intl.formatMessage({
                                defaultMessage:
                                  'Assign evidence to crime group',
                              }),
                              onClick: () => {
                                setSelectedAssignedItem({
                                  thumbnailUrl: record.thumbnail.url,
                                  url: record.playbackUrl,
                                });
                                toggleLinkCrimeGroup();
                              },
                            },
                          ]}
                        />
                      }
                    >
                      <Button
                        icon={
                          <FontAwesomeIcon
                            icon={faShare}
                            style={{ marginRight: 5 }}
                          />
                        }
                        size="small"
                      />
                    </Dropdown>
                  </Tooltip>
                </Col>

                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'Remove Evidence',
                    })}
                  >
                    <Popconfirm
                      cancelText={intl.formatMessage({
                        defaultMessage: 'No',
                      })}
                      okText={intl.formatMessage({
                        defaultMessage: 'Yes',
                      })}
                      onConfirm={() => {
                        onDelete(record.key);
                      }}
                      overlayInnerStyle={{ padding: 10 }}
                      placement="topLeft"
                      title={intl.formatMessage({
                        defaultMessage: 'Remove the evidence?',
                      })}
                    >
                      <Button
                        disabled={saving}
                        icon={<FontAwesomeIcon icon={faTrash} />}
                        size="small"
                      />
                    </Popconfirm>
                  </Tooltip>
                </Col>
              </Row>
            ),

            title: '',
            width: '25%',
          },
        ]}
        dataSource={
          demEvidence && demEvidence?.listDemBusinessEvidence.totalCount > 0
            ? demEvidence.listDemBusinessEvidence.edges.map(
                ({ node: evidenceList }) =>
                  evidenceList
                    ? {
                        date: evidenceList.recordedAt,
                        duration:
                          evidenceList.type === 'VIDEO'
                            ? evidenceList.duration
                            : (evidenceList.type || '')
                                .toLowerCase()
                                .split(' ')
                                .map(
                                  (word) =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                )
                                .join(' '),
                        importance: evidenceList.importance,
                        key: evidenceList.id || '',
                        name:
                          evidenceList.officerName ??
                          intl.formatMessage({
                            defaultMessage: 'No name provided',
                          }),
                        playbackUrl:
                          evidenceList.playbackUrl ?? 'No playbackUrl provided',
                        thumbnail: {
                          id: evidenceList.id || '',
                          url: evidenceList.thumbnailUrl || '',
                        },
                        type: evidenceList.type || '',
                      }
                    : {
                        date: new Date(),
                        duration: '',
                        importance: '',
                        key: '',
                        name: 'No name provided',
                        playbackUrl: 'No playbackUrl provided',
                        thumbnail: {
                          id: '',
                          url: '',
                        },
                        type: 'OTHER',
                      }
              )
            : []
        }
        pagination={{
          hideOnSinglePage: true,
          pageSize: 5,
        }}
        rowClassName={classes.row}
        size="small"
      />
      <ViewEvidenceModal
        onDelete={onDelete}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
      />
      <Drawer
        onClose={toggleLinkOffender}
        open={linkOffender}
        title={intl.formatMessage({
          defaultMessage: 'Assign evidence to offender',
        })}
        width="800"
      >
        {linkOffender ? (
          <LinkOffender
            offenderIds={[]}
            onClose={toggleLinkOffender}
            update={(value) => {
              if (selectedAssignedItem)
                // onAssign({
                //   offenderId: value.id,
                //   thumbnailUrl:
                //     'https://smartdem.blob.core.windows.net/thumbnail/group1/M00/2B/A7/CgAABWb7zdiEQkEWAAAAAH3dEm8530.jpg',
                //   url: 'https://smartdem.blob.core.windows.net/evidence/group1/M00/2B/A6/CgAABWb7zEeETEVPAAAAAAXCtdQ218.mp4',
                // });
                onAssign({
                  offenderId: value.id,
                  thumbnailUrl: selectedAssignedItem.thumbnailUrl,
                  url: selectedAssignedItem.url,
                });
            }}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={toggleLinkIncident}
        open={linkIncident}
        title={intl.formatMessage({
          defaultMessage: 'Assign evidence to incident',
        })}
        width="800"
      >
        {linkIncident ? (
          <LinkIncident
            incidentIds={[]}
            onClose={toggleLinkIncident}
            update={(value) => {
              if (selectedAssignedItem)
                onAssign({
                  incidentId: value.id,
                  thumbnailUrl: selectedAssignedItem.thumbnailUrl,
                  url: selectedAssignedItem.url,
                });
            }}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={toggleLinkCrimeGroup}
        open={linkCrimeGroup}
        title={intl.formatMessage({
          defaultMessage: 'Assign evidence to crime group',
        })}
        width="800"
      >
        {linkCrimeGroup ? (
          <LinkCrimeGroup
            crimeGroupIds={[]}
            onClose={toggleLinkCrimeGroup}
            update={(value) => {
              if (selectedAssignedItem)
                // onAssign({
                //   crimeGroupId: value.id,
                //   thumbnailUrl: selectedAssignedItem.thumbnailUrl,
                //   url: selectedAssignedItem.url,
                // });
                onAssign({
                  crimeGroupId: value.id,
                  thumbnailUrl:
                    'https://smartdem.blob.core.windows.net/thumbnail/group1/M00/2B/A7/CgAABWb7zdiEQkEWAAAAAH3dEm8530.jpg',
                  url: 'https://smartdem.blob.core.windows.net/evidence/group1/M00/2B/A6/CgAABWb7zEeETEVPAAAAAAXCtdQ218.mp4',
                });
            }}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={toggleLinkInvestigation}
        open={linkInvestigation}
        title={intl.formatMessage({
          defaultMessage: 'Assign evidence to investigation',
        })}
        width="800"
      >
        {linkInvestigation ? (
          <LinkInvestigation
            onClose={toggleLinkInvestigation}
            update={(value) => {
              if (selectedAssignedItem)
                onAssign({
                  investigationId: value,
                  thumbnailUrl: selectedAssignedItem.thumbnailUrl,
                  url: selectedAssignedItem.url,
                });
            }}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};
export default DemEvidenceTable;
