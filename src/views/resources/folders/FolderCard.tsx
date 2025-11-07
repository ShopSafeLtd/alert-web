import {
  faFile,
  faFolderTree,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Modal, Row, Tooltip, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import useStyles from './FolderCard.styles';

const { Paragraph, Title } = Typography;
const { confirm } = Modal;

interface Props {
  data: {
    description?: null | string;
    id: string;
    name: string;
    totalChildFolders: number;
    totalDocuments: number;
  };
  onDelete: (value: string) => void;
  showDeleteBtn: boolean;
}

const FolderCard = ({ data, onDelete, showDeleteBtn }: Props) => {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Card>
      <div style={{ height: 140, margin: 10 }}>
        {showDeleteBtn && (
          <Tooltip
            placement="top"
            title={intl.formatMessage({
              defaultMessage: 'Delete the folder',
            })}
          >
            <Button
              className={classes.menuButton}
              disabled={data.totalChildFolders > 0 || data.totalDocuments > 0}
              icon={
                <FontAwesomeIcon
                  icon={faTrash}
                  size="lg"
                  style={{ color: 'red' }}
                />
              }
              onClick={() => {
                confirm({
                  content: intl.formatMessage({
                    defaultMessage: 'This action cannot be undone.',
                  }),
                  onOk() {
                    console.log('0k');

                    onDelete(data.id || '');
                  },
                  title: intl.formatMessage({
                    defaultMessage: 'Do you want to delete this folder?',
                  }),
                });
              }}
              type="text"
            />
          </Tooltip>
        )}

        <Title level={4}>{data?.name}</Title>
        <Paragraph ellipsis={{ rows: 3 }}>{data?.description}</Paragraph>
        <Row gutter={16}>
          <Col>
            <FontAwesomeIcon icon={faFolderTree} style={{ marginRight: 8 }} />
            {intl.formatMessage(
              {
                defaultMessage: 'Child Folder:  {value}',
              },
              { value: data?.totalChildFolders || 0 }
            )}
          </Col>
          <Col>
            <FontAwesomeIcon icon={faFile} style={{ marginRight: 8 }} />
            {intl.formatMessage(
              {
                defaultMessage: 'Documents:  {value}',
              },
              { value: data?.totalDocuments || 0 }
            )}
          </Col>
        </Row>

        {/* <Descriptions column={2}>
          <Descriptions.Item
            label={
              <span>
                <FontAwesomeIcon
                  icon={faFolderTree}
                  style={{ marginRight: 8 }}
                />
                {intl.formatMessage({
                  defaultMessage: 'Child Folder',
                })}
              </span>
            }
            style={{ marginBottom: -10 }}
          >
            {data?.childFolders.length}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <span>
                <FontAwesomeIcon icon={faFile} style={{ marginRight: 8 }} />
                {intl.formatMessage({
                  defaultMessage: 'Documents',
                })}
              </span>
            }
          >
            {data?.documents.length}
          </Descriptions.Item>
        </Descriptions> */}
      </div>

      <Row
        justify="center"
        style={{ alignContent: 'flex-end', flexGrow: 1, paddingBottom: 5 }}
      >
        <Col>
          <Link to={`/app/resources/folders/view/${data?.id}`}>
            <Button size="small" type="default">
              {intl.formatMessage({
                defaultMessage: 'View Folder',
              })}
            </Button>
          </Link>
        </Col>
      </Row>
    </Card>
  );
};

export default FolderCard;
