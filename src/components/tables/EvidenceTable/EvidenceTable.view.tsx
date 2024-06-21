import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  notification,
  Popconfirm,
  Row,
  Table,
  Tag,
  Tooltip,
} from 'antd';
import { createUseStyles } from 'react-jss';

import { useIntl } from 'react-intl';
import { faFileArrowDown, faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import errorNotification from 'types/mutation_notifications/error_notification';
import type { ProfileUpdatedModel } from 'types/enums/profile-update-type';
import type { MutationUpdaterFn } from '@apollo/client';
import type { FileType } from 'graphql/types';
import type { DeleteDocumentMutation } from 'graphql/documents/mutations/delete-document.generated';
import { useDeleteDocumentMutation } from 'graphql/documents/mutations/delete-document.generated';

const useStyles = createUseStyles({
  row: {
    // cursor: 'pointer'
  },
});

interface Props {
  evidence:
    | {
        id: string;
        name?: string;
        url?: string;
        fileType?: FileType | null | undefined;
        tags?:
          | {
              name: string;
            }[]
          | null;
      }[]
    | undefined;
  saving?: boolean;
  title: ProfileUpdatedModel;
  deleteRights: boolean;
  update: MutationUpdaterFn<DeleteDocumentMutation>;
}

const EvidenceTable = ({
  evidence,
  saving: inputSaving,
  title,
  update,
  deleteRights,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();
  const [saving, setSaving] = useState(inputSaving);
  useEffect(() => {
    if (inputSaving) setSaving(inputSaving);
  }, [inputSaving]);

  const [deleteDocument] = useDeleteDocumentMutation({
    onCompleted: () => {
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Deleted!',
        }),
        description: intl.formatMessage(
          {
            defaultMessage: 'The document has been deleted from the {title}!',
          },
          { title }
        ),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      errorNotification();
    },
    update,
  });
  const onDelete = (value: string) => {
    void deleteDocument({
      variables: {
        id: value || '',
      },
    });
  };
  return (
    <Table
      size="small"
      pagination={{
        hideOnSinglePage: true,
        pageSize: 5,
      }}
      rowClassName={classes.row}
      columns={[
        {
          key: 'name',
          dataIndex: 'name',
          title: intl.formatMessage({
            defaultMessage: 'Name',
          }),
          // width: '80%',
        },
        {
          key: 'tags',
          dataIndex: 'tags',
          title: intl.formatMessage({
            defaultMessage: 'Tags',
          }),

          render: (value: string[]) => {
            if (value.length > 2) {
              return (
                <>
                  {value?.slice(0, 2).map((el) => (
                    <Tag key={el}>{el}</Tag>
                  ))}
                  <Tooltip title={value.slice(2).join(', ')}>
                    <Tag>
                      {intl.formatMessage(
                        {
                          defaultMessage: '+ {num} more',
                        },
                        {
                          num: value.length - 2,
                        }
                      )}
                    </Tag>
                  </Tooltip>
                </>
              );
            }
            return value?.map((el) => <Tag key={el}>{el}</Tag>);
          },
        },
        {
          title: '',
          dataIndex: 'fileUrl',
          key: 'fileUrl',
          width: 100,
          // render: (fileUrl: string) => (
          //   <Button
          //     type="link"
          //     onClick={() => {
          //       window.open(fileUrl);
          //     }}
          //   >
          //     {intl.formatMessage({
          //       id: '5q3qC0',
          //       defaultMessage: 'Download',
          //     })}
          //   </Button>
          // ),
          render: (_, record) => (
            <Row gutter={8}>
              <Col>
                <Tooltip
                  title={intl.formatMessage({
                    defaultMessage: 'Download',
                  })}
                >
                  <Button
                    size="small"
                    disabled={saving}
                    onClick={() => {
                      window.open(record.fileUrl);
                    }}
                    icon={<FontAwesomeIcon icon={faFileArrowDown} />}
                  />
                </Tooltip>
              </Col>
              {deleteRights && (
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'Remove Evidence',
                    })}
                  >
                    <Popconfirm
                      placement="topLeft"
                      title={intl.formatMessage({
                        defaultMessage: 'Remove the evidence?',
                      })}
                      onConfirm={() => {
                        onDelete(record.key);
                      }}
                      okText={intl.formatMessage({
                        defaultMessage: 'Yes',
                      })}
                      cancelText={intl.formatMessage({
                        defaultMessage: 'No',
                      })}
                      overlayInnerStyle={{ padding: 10 }}
                    >
                      <Button
                        size="small"
                        disabled={saving}
                        icon={<FontAwesomeIcon icon={faTrash} />}
                      />
                    </Popconfirm>
                  </Tooltip>
                </Col>
              )}
            </Row>
          ),
        },
      ]}
      dataSource={
        evidence?.map((e) => ({
          key: e.id,
          fileUrl: e.url,
          name: e.name || 'File',
          tags: e.tags?.map((t) => t.name) || [],
        })) || []
      }
    />
  );
};
export default EvidenceTable;
