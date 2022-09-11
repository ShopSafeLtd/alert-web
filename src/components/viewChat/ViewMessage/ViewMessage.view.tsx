/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import {
  Row,
  Col,
  Avatar,
  Input,
  Button,
  Form,
  FormInstance,
  Popover,
} from 'antd';
import { Moment } from 'moment';
import { MessageType } from 'types';
import { DeleteOutlined } from '@ant-design/icons';

interface DatedMessages {
  type: string;
  date?: string;
  id?: string;
  sameUser?: boolean | null;
  sent?: boolean | null;
  content?: string;
  createdAt?: Moment;
  from?: { id: string; fullName: string; organisation: string };
  chat?: { id: string; name: string };
}
interface FormData {
  newMessage: string;
}
interface Props {
  onSubmit: (value: FormData) => void;
  form: FormInstance<FormData>;
  saving: boolean;
  scrolledToTop: () => void;
  datedMessages: DatedMessages[];
  userId: string | undefined;
  loadMore: boolean;
  deleteConfirm: (value: string) => void;
  deleteRights: boolean;
  // ref: React.MutableRefObject<HTMLDivElement | null>;
}

const ViewMessges = ({
  onSubmit,
  form,
  saving,
  scrolledToTop,
  datedMessages,
  userId,
  loadMore,
  deleteConfirm,
  deleteRights,
}: // ref,
Props): JSX.Element => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (ref.current && ref.current.scrollIntoView) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    }
  }, [datedMessages]);
  return (
    <div className="view-message">
      <InfiniteScroll
        className="message-container"
        initialScrollY={0}
        dataLength={datedMessages.length || 0}
        next={scrolledToTop}
        hasMore={loadMore}
        inverse
        loader={
          <div className="message-date">
            <div className="date-line" />
            <div className="date">Loading...</div>
            <div className="date-line" />
          </div>
        }
        height="calc(100vh - 140px)"
      >
        {datedMessages.map(({ type, date, id, content, sameUser, from }) => (
          <div key={id}>
            {type === MessageType.date && (
              <div className="message-date">
                <div className="date-line" />
                <div className="date">{date}</div>
                <div className="date-line" />
              </div>
            )}

            <div className="message-content" key={id}>
              {type === MessageType.message && !sameUser && (
                <Row
                  justify={from?.id === userId ? 'end' : 'start'}
                  className="message-avatar-row"
                >
                  <Col>
                    <Avatar
                      style={{
                        marginRight: 5,
                      }}
                      className={
                        from?.id === userId ? 'current' : 'message-avatar'
                      }
                    >
                      {from?.fullName[0]}
                    </Avatar>
                  </Col>
                  <Col>{from?.fullName}</Col>
                </Row>
              )}
              {type === MessageType.message && (
                <Row key={id} justify={from?.id === userId ? 'end' : 'start'}>
                  <div
                    className={
                      from?.id === userId
                        ? 'message-content-bubble current'
                        : 'message-content-bubble'
                    }
                  >
                    <Col>
                      {deleteRights ? (
                        <Popover
                          // placement="topLeft"
                          title="Options"
                          content={
                            deleteRights && (
                              <Button
                                type="primary"
                                icon={<DeleteOutlined />}
                                onClick={() => {
                                  deleteConfirm(id || '');
                                }}
                              />
                            )
                          }
                        >
                          {content}
                        </Popover>
                      ) : (
                        content
                      )}
                    </Col>
                  </div>
                </Row>
              )}
            </div>
          </div>
        ))}
        <div ref={ref} />
      </InfiniteScroll>

      <Form
        form={form}
        onFinish={onSubmit}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            form.submit();
          }
        }}
      >
        <Row gutter={10} style={{ height: '45px', margin: '0 10px' }}>
          <Col flex={1} style={{ height: '40px' }}>
            <Form.Item
              name="newMessage"
              label=""
              rules={[
                {
                  required: true,
                  message: 'The message cannot be empty!',
                },
              ]}
            >
              <Input disabled={saving} placeholder="Type a message" />
            </Form.Item>
          </Col>
          <Col style={{ height: '40px' }}>
            <Form.Item>
              <Button
                disabled={saving}
                loading={saving}
                type="primary"
                htmlType="submit"
              >
                Send
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ViewMessges;
