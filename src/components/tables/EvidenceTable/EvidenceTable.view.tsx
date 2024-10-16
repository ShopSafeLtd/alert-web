import type { MutationUpdaterFn } from '@apollo/client';
import type { DeleteDocumentMutation } from 'graphql/documents/mutations/__generated__/delete-document.generated';
import type { FileType } from 'graphql/types';
import type { ProfileUpdatedModel } from 'types/enums/profile-update-type';

import { faFileArrowDown, faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Col,
  Popconfirm,
  Row,
  Table,
  Tag,
  Tooltip,
  notification,
} from 'antd';
import { useDeleteDocumentMutation } from 'graphql/documents/mutations/__generated__/delete-document.generated';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import errorNotification from 'types/mutation_notifications/error_notification';

const useStyles = createUseStyles({
  row: {
    // cursor: 'pointer'
  },
});

interface Props {
  deleteRights: boolean;
  evidence:
    | {
        fileType?: FileType | null | undefined;
        id: string;
        name?: string;
        tags?:
          | {
              name: string;
            }[]
          | null;
        url?: string;
      }[]
    | undefined;
  saving?: boolean;
  title: ProfileUpdatedModel;
  update?: MutationUpdaterFn<DeleteDocumentMutation>;
}

const EvidenceTable = ({
  deleteRights,
  evidence,
  saving: inputSaving,
  title,
  update,
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
        description: intl.formatMessage(
          {
            defaultMessage: 'The document has been deleted from the {title}!',
          },
          { title }
        ),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Deleted!',
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
    void deleteDocument({
      variables: {
        id: value || '',
      },
    });
  };
  return (
    <Table
      columns={[
        {
          dataIndex: 'name',
          key: 'name',
          title: intl.formatMessage({
            defaultMessage: 'Name',
          }),
        },
        {
          dataIndex: 'tags',
          key: 'tags',
          render: (value: string[]) => {
            if (value.length > 2) {
              return (
                <>
                  {value?.slice(0, 2).map((el) => <Tag key={el}>{el}</Tag>)}
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

          title: intl.formatMessage({
            defaultMessage: 'Tags',
          }),
        },
        {
          dataIndex: 'fileUrl',
          key: 'fileUrl',
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
                    disabled={saving}
                    icon={<FontAwesomeIcon icon={faFileArrowDown} />}
                    onClick={() => {
                      window.open(record.fileUrl);
                    }}
                    size="small"
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
              )}
            </Row>
          ),
          title: '',
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
          width: 100,
        },
      ]}
      dataSource={
        evidence?.map((e) => ({
          fileUrl: e.url,
          key: e.id,
          name: e.name || 'File',
          tags: e.tags?.map((t) => t.name) || [],
        })) || []
      }
      pagination={{
        hideOnSinglePage: true,
        pageSize: 5,
      }}
      rowClassName={classes.row}
      size="small"
    />
  );
};
export default EvidenceTable;
