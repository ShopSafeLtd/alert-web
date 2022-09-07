/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
// import { MessagesQuery } from 'graphql/generated';
import {
  Typography,
  Row,
  Col,
  Avatar,
  // Card,
  Input,
  Button,
  Form,
  FormInstance,
  Progress,
} from 'antd';
import { Moment } from 'moment';
import { MessageType } from 'types';

const { Text } = Typography;
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
  newMessages: string;
}
interface Props {
  onSubmit: (value: FormData) => void;
  form: FormInstance<FormData>;
  // data: MessagesQuery | undefined;
  loading: boolean;
  saving: boolean;
  scrolledToTop: () => void;
  datedMessages: DatedMessages[];
  userId: string | undefined;
  loadMore: boolean;
  // ref: React.MutableRefObject<HTMLDivElement | null>;
}

const ViewMessges = ({
  onSubmit,
  form,
  // data,
  loading,
  saving,
  scrolledToTop,
  datedMessages,
  userId,
  loadMore,
}: // ref,
Props): JSX.Element => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    }
  }, [datedMessages]);
  return (
    <div className="messages-container">
      {/* <Card style={{ minHeight: '100vh' }}> */}
      <InfiniteScroll
        className="message-view"
        initialScrollY={0}
        dataLength={datedMessages.length || 0}
        next={scrolledToTop}
        hasMore={loadMore}
        loader={
          loading && (
            <div className="message-date-container">
              <div className="date-line" />
              <div className="date">Loading...</div>
              <div className="date-line" />
            </div>
          )
        }
        height={500}
      >
        {datedMessages.map(
          ({ type, date, id, content, sameUser, from, sent }) => (
            <div key={id}>
              {type === MessageType.date && (
                <div className="message-date-container">
                  <div className="date-line" />
                  <div className="date">{date}</div>
                  <div className="date-line" />
                </div>
              )}
              {type === MessageType.message && !sent && (
                <Progress
                  type="circle"
                  percent={50}
                  strokeColor={{
                    '0%': '#f56a00',
                    '100%': '#f5222d',
                  }}
                  format={() => 'Sending'}
                  // style={{ fontSize: 10, weight: '10px' }}
                />
              )}
              <div className="message-content-container">
                {type === MessageType.message && !sameUser && (
                  <Row
                    justify={from?.id === userId ? 'end' : 'start'}
                    style={{ marginTop: 30 }}
                  >
                    <Col>
                      <Avatar
                        style={{
                          color: '#f56a00',
                          backgroundColor: '#fde3cf',
                          marginRight: 5,
                        }}
                      >
                        {from?.fullName[0]}
                      </Avatar>
                    </Col>
                    <Col>{from?.id === userId ? 'You' : from?.fullName}</Col>
                  </Row>
                )}
                {type === MessageType.message && (
                  <Row key={id} justify={from?.id === userId ? 'end' : 'start'}>
                    <div className="message-content">
                      <Col>
                        <Text>{content}</Text>
                      </Col>
                    </div>
                  </Row>
                )}
              </div>
            </div>
          )
        )}
        <div ref={ref}> s </div>
      </InfiniteScroll>

      <Row align="bottom" gutter={20}>
        <Col flex={1}>
          <Form
            form={form}
            onFinish={onSubmit}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                form.submit();
              }
            }}
          >
            <Row>
              <Col flex={1}>
                <Form.Item
                  name="newMessages"
                  label=""
                  rules={[
                    {
                      required: true,
                      message: 'The message cannot be empty!',
                    },
                  ]}
                >
                  <Input
                    // style={{ marginLeft: '-20' }}
                    disabled={saving}
                    placeholder="Type a message"
                  />
                </Form.Item>
              </Col>
              <Col>
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
        </Col>
      </Row>
      {/* </Card> */}
    </div>
  );
};

export default ViewMessges;
