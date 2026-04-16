import type { UpdatesFragment } from '#/graphql/fragments/__generated__/updates.generated';

import { currentUserAtom } from '#/providers/UserProvider/UserProvider';
import { faPaperPlane, faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Avatar,
  Button,
  Col,
  Empty,
  Input,
  Popconfirm,
  Row,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { useIntl } from 'react-intl';

import useStockRemovalComments from './useStockRemovalComments';

type ReplyFragment = UpdatesFragment['replies'][number];

interface Props {
  requestId: string;
  updates: UpdatesFragment[] | undefined;
}

const CommentItem = ({
  currentUserId,
  onDelete,
  update,
}: {
  currentUserId: string;
  onDelete: (id: string) => void;
  update: ReplyFragment | UpdatesFragment;
}) => {
  const intl = useIntl();
  const isOwner = update.createdBy.id === currentUserId;

  return (
    <div style={{ marginBottom: 12, padding: '8px 0' }}>
      <Row align="top" gutter={8} wrap={false}>
        {isOwner && (
          <Col>
            <Popconfirm
              onConfirm={() => onDelete(update.id)}
              title={intl.formatMessage({
                defaultMessage: 'Delete this comment?',
              })}
            >
              <Button danger size="small" type="text">
                <FontAwesomeIcon icon={faTrash} size="sm" />
              </Button>
            </Popconfirm>
          </Col>
        )}
        <Col>
          <Avatar size="small">
            {update.createdBy.fullName?.charAt(0)?.toUpperCase()}
          </Avatar>
        </Col>
        <Col flex={1}>
          <Row align="middle" gutter={8}>
            <Col>
              <Typography.Text strong style={{ fontSize: 13 }}>
                {update.createdBy.fullName}
              </Typography.Text>
            </Col>
            <Col>
              <Typography.Text style={{ fontSize: 11 }} type="secondary">
                {dayjs(update.createdAt).format('DD/MM/YYYY HH:mm')}
              </Typography.Text>
            </Col>
          </Row>
          <Typography.Paragraph
            style={{ fontSize: 13, marginBottom: 0, marginTop: 2 }}
          >
            {update.text}
          </Typography.Paragraph>
        </Col>
      </Row>
    </div>
  );
};

const StockRemovalComments = ({ requestId, updates }: Props) => {
  const intl = useIntl();
  const currentUser = useAtomValue(currentUserAtom);

  const { commentText, onDelete, onSubmit, saving, setCommentText } =
    useStockRemovalComments({ requestId });

  return (
    <div>
      {/* Comment List */}
      <div style={{ marginBottom: 16, maxHeight: 400, overflowY: 'auto' }}>
        {(!updates || updates.length === 0) && (
          <Empty
            description={intl.formatMessage({
              defaultMessage: 'No comments yet.',
            })}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
        {updates?.map((update) => (
          <CommentItem
            currentUserId={currentUser?.id ?? ''}
            key={update.id}
            onDelete={onDelete}
            update={update}
          />
        ))}
      </div>

      {/* Comment Input */}
      <Row gutter={8} wrap={false}>
        <Col flex={1}>
          <Input.TextArea
            autoSize={{ maxRows: 4, minRows: 1 }}
            disabled={saving}
            onChange={(e) => setCommentText(e.target.value)}
            onPressEnter={(e) => {
              if (!e.shiftKey) {
                e.preventDefault();
                onSubmit();
              }
            }}
            placeholder={intl.formatMessage({
              defaultMessage: 'Add a comment...',
            })}
            value={commentText}
          />
        </Col>
        <Col>
          <Button
            disabled={saving || !commentText.trim()}
            loading={saving}
            onClick={onSubmit}
            type="primary"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default StockRemovalComments;
