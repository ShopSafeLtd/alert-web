import {
  faFile,
  faFolder,
  faFolderTree,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Divider, Modal, Row, Tooltip, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';

import useStyles from './FolderCard.styles';

const { Paragraph } = Typography;
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
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/app/resources/folders/view/${data?.id}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCardClick();
    }
  };

  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    confirm({
      content: intl.formatMessage({
        defaultMessage: 'This action cannot be undone.',
      }),
      okText: intl.formatMessage({
        defaultMessage: 'Delete',
      }),
      onOk() {
        onDelete(data.id || '');
      },
      title: intl.formatMessage({
        defaultMessage: 'Do you want to delete this folder?',
      }),
    });
  };

  return (
    <div
      aria-label={intl.formatMessage(
        { defaultMessage: '{name} folder' },
        { name: data?.name }
      )}
      className={classes.card}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div
        aria-label={intl.formatMessage({ defaultMessage: 'Folder icon' })}
        className={classes.iconContainer}
      >
        <FontAwesomeIcon
          className={classes.folderIcon}
          icon={faFolder}
          size="4x"
        />
      </div>

      {/* Content area */}
      <div className={classes.content}>
        <Paragraph className={classes.title} ellipsis={{ rows: 2 }}>
          {data?.name}
        </Paragraph>
      </div>

      {/* Stats row */}
      <Row className={classes.statsRow} justify="space-evenly">
        <Col>
          <div className={classes.statItem}>
            <FontAwesomeIcon className={classes.statIcon} icon={faFolderTree} />
            <div className={classes.statValue}>
              {data?.totalChildFolders || 0}
            </div>
          </div>
        </Col>
        <Divider style={{ height: 50, margin: 0 }} type="vertical" />
        <Col>
          <div className={classes.statItem}>
            <FontAwesomeIcon className={classes.statIcon} icon={faFile} />
            <div className={classes.statValue}>{data?.totalDocuments || 0}</div>
          </div>
        </Col>
        {showDeleteBtn && (
          <>
            <Divider style={{ height: 50, margin: 0 }} type="vertical" />
            <Col>
              <Tooltip
                placement="top"
                title={
                  data.totalChildFolders > 0 || data.totalDocuments > 0
                    ? intl.formatMessage({
                        defaultMessage:
                          'Folder must be empty to delete (remove all folders and documents first)',
                      })
                    : intl.formatMessage({
                        defaultMessage: 'Delete Folder',
                      })
                }
              >
                <Button
                  className={classes.deleteButton}
                  disabled={
                    data.totalChildFolders > 0 || data.totalDocuments > 0
                  }
                  onClick={handleDelete}
                  type="text"
                >
                  <FontAwesomeIcon icon={faTrash} size="lg" />
                </Button>
              </Tooltip>
            </Col>
          </>
        )}
      </Row>
    </div>
  );
};

export default FolderCard;
