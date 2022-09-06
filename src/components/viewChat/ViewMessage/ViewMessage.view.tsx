/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
// import { MessagesQuery } from 'graphql/generated';
import {
  Typography,
  Row,
  Col,
  Avatar,
  Card,
  Input,
  Button,
  Form,
  FormInstance,
  // Progress,
} from 'antd';
import { Moment } from 'moment';

const { Title, Text } = Typography;
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
  // data: MessagesQuery | undefined;
  loading: boolean;
  saving: boolean;
  scrolledToTop: () => void;
  datedMessages: DatedMessages[];
  userId: string | undefined;
  loadMore: boolean;
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
}: Props): JSX.Element => (
  <Card style={{ minHeight: '100vh' }}>
    <Row align="top">
      <Col flex={1}>
        {' '}
        <InfiniteScroll
          dataLength={datedMessages.length || 0}
          next={scrolledToTop}
          hasMore={loadMore}
          loader={loading && <h4>Loading...</h4>}
          height={400}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>No more messages</b>
            </p>
          }
        >
          {datedMessages.map(({ type, date, id, content, sameUser, from }) => (
            <>
              {/* {!sent && (
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
                )} */}
              {type === 'DATE' && <Title>{date}</Title>}
              {/* {type === 'Message' && <></>} */}
              {type === 'MESSAGE' && !sameUser && (
                <Row key={id} justify={from?.id === userId ? 'end' : 'start'}>
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
              {type === 'MESSAGE' && (
                <Row key={id} justify={from?.id === userId ? 'end' : 'start'}>
                  <Col>
                    <Text>{content}</Text>
                  </Col>
                </Row>
              )}
            </>
          ))}
        </InfiniteScroll>
      </Col>
    </Row>
    <Row align="bottom">
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
  </Card>
);

export default ViewMessges;
