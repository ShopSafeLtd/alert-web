import { ActionType } from '#/graphql/types';
import { Button, Col, Descriptions, Image, Modal, Row } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import ReactPlayer from 'react-player';

import type { EvidenceType } from './EvidenceList.view';
interface Props {
  loading?: boolean;
  onCreateActionEvidence?: (value: { id: string; type: ActionType }) => void;
  onDelete?: (value: string) => void;
  onRestore?: (value: string) => void;
  selectedData: EvidenceType | undefined;
  setSelectedData: React.Dispatch<
    React.SetStateAction<EvidenceType | undefined>
  >;
}
const { confirm } = Modal;

const ViewEvidenceModal: React.FC<Props> = ({
  loading,
  onCreateActionEvidence,
  onDelete,
  onRestore,
  selectedData,
  setSelectedData,
}): JSX.Element => {
  const intl = useIntl();

  return (
    <Modal
      footer={[
        <Button
          key="submit"
          loading={loading}
          onClick={() => setSelectedData(undefined)}
          type="ghost"
        >
          {intl.formatMessage({
            defaultMessage: 'Close',
          })}
        </Button>,

        <Button
          key="download"
          loading={loading}
          onClick={() => {
            if (onCreateActionEvidence)
              onCreateActionEvidence({
                id: selectedData?.key || '',
                type: ActionType.View,
              });
          }}
          type="dashed"
        >
          <a download href={selectedData?.playbackUrl}>
            {intl.formatMessage({
              defaultMessage: 'Download',
            })}
          </a>
        </Button>,

        onDelete && (
          <Button
            key="delete"
            loading={loading}
            onClick={() => {
              confirm({
                content: intl.formatMessage({
                  defaultMessage:
                    'The evidence will be removed from the Dem and added to the recycle bin.',
                }),
                onOk() {
                  if (onDelete) {
                    onDelete(selectedData?.key || '');
                    if (onCreateActionEvidence)
                      onCreateActionEvidence({
                        id: selectedData?.key || '',
                        type: ActionType.Delete,
                      });
                  }
                },
                title: intl.formatMessage({
                  defaultMessage: 'Do you want to delete the evidence?',
                }),
              });
            }}
            type="primary"
          >
            {intl.formatMessage({
              defaultMessage: 'Delete',
            })}
          </Button>
        ),
        onRestore && (
          <Button
            key="restore"
            loading={loading}
            onClick={() => {
              confirm({
                content: intl.formatMessage({
                  defaultMessage:
                    'The evidence will be moved back to the Dem evidence list.',
                }),
                onOk() {
                  if (onRestore) {
                    onRestore(selectedData?.key || '');
                  }
                },
                title: intl.formatMessage({
                  defaultMessage: 'Do you want to restore the evidence?',
                }),
              });
            }}
            type="primary"
          >
            {intl.formatMessage({
              defaultMessage: 'Restore',
            })}
          </Button>
        ),
      ]}
      // ].filter((el) => onDelete || el.key !== 'delete')}
      onCancel={() => setSelectedData(undefined)}
      open={!!selectedData}
      title={intl.formatMessage({
        defaultMessage: 'View Evidence',
      })}
      width="80%"
    >
      <div>
        <Row gutter={16}>
          <Col span={10}>
            <Descriptions bordered column={1}>
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Officer',
                })}
              >
                {selectedData?.name}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Duration',
                })}
              >
                {selectedData?.duration}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Importance',
                })}
              >
                {selectedData?.importance}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Type',
                })}
              >
                {selectedData?.type}
              </Descriptions.Item>
            </Descriptions>
          </Col>

          <Col>
            {selectedData && selectedData.type === 'IMAGE' ? (
              <Image
                alt={intl.formatMessage({
                  defaultMessage: 'evidence',
                })}
                height="100%"
                src={selectedData?.playbackUrl || ' '}
                width="100%"
              />
            ) : (
              <div>
                {selectedData?.type === 'AUDIO' ? (
                  <ReactPlayer
                    config={{
                      file: {
                        forceVideo: true,
                      },
                    }}
                    controls
                    url={selectedData?.playbackUrl || ' '}
                  />
                ) : (
                  <ReactPlayer
                    config={{
                      file: {
                        forceVideo: true,
                      },
                    }}
                    controls
                    url={selectedData?.playbackUrl || ' '}
                    width="100%"
                  />
                )}
              </div>
            )}
          </Col>
        </Row>
      </div>
    </Modal>
  );
};
export default ViewEvidenceModal;
