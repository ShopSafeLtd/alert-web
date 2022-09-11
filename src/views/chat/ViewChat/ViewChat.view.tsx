/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Row, Col, Typography, List, Avatar, Divider } from 'antd';
import { UserChatsQuery } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentPlus } from '@fortawesome/pro-light-svg-icons';
import { Link } from 'react-router-dom';
import ViewMessage from 'components/viewChat/ViewMessage';

const { Title, Paragraph } = Typography;
interface Props {
  data: UserChatsQuery | undefined;
  loading: boolean;
  saving: boolean;
  handleMarkAsRead: (value: string | undefined) => void;
  chatId: string;
}

const ViewOffender = ({
  data,
  loading,
  saving,
  handleMarkAsRead,
  chatId,
}: Props): JSX.Element => (
  <div className="page-container">
    <Row>
      <Col span={7}>
        <div className="chats-side-list">
          {/* {data?.user?.chats && data.user.chats.length > 0 ? ( */}
          <List
            header={
              <Title level={2} style={{ marginLeft: 30, marginTop: 20 }}>
                Chat Groups
              </Title>
            }
            itemLayout="horizontal"
            loading={loading}
            split
            dataSource={data?.user?.chats}
            renderItem={({
              id: userChatId,
              newMessages,
              chat: { id, name, firstLetter, messages },
            }) => (
              <Link to={`/app/chat/${id}`} key={id}>
                <List.Item
                  onClick={() => !saving && handleMarkAsRead(userChatId)}
                  key={id}
                  className={chatId === id ? 'chat-item current' : 'chat-item'}
                >
                  <Row
                    wrap={false}
                    gutter={10}
                    style={{
                      marginLeft: 15,
                      marginTop: 10,
                    }}
                  >
                    <Col>
                      <Avatar
                        style={{
                          color: '#f56a00',
                          backgroundColor: '#fde3cf',
                          marginRight: 5,
                        }}
                      >
                        {firstLetter}
                      </Avatar>
                    </Col>
                    <Col flex={1}>
                      <Title level={4}>
                        {name}
                        {newMessages && (
                          <FontAwesomeIcon
                            size="lg"
                            // icon="fa-solid fa-comment-plus"
                            icon={faCommentPlus}
                            style={{
                              marginLeft: 10,
                              color: 'rgb(222, 68, 54)',
                            }}
                          />
                        )}
                      </Title>

                      <Paragraph ellipsis>
                        {messages && messages.length > 0
                          ? `${messages[0].from.fullName} : ${messages[0].content}`
                          : 'No Messages'}
                      </Paragraph>
                    </Col>
                  </Row>
                </List.Item>
              </Link>
            )}
          />
          {/* ) : (
            <div>
              <Title level={2} style={{ marginLeft: 30, marginTop: 20 }}>
                Chat Groups
              </Title>
              <Paragraph>You are not a member of any chat groups</Paragraph>
            </div>
          )} */}

          <Divider className="chat-item-divider" />
        </div>
      </Col>
      <Col span={17}>
        <ViewMessage chatId={chatId} />
      </Col>
    </Row>
  </div>
);

export default ViewOffender;
