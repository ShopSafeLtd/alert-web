/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
// import { UserChatsQuery, ViewOffenderQuery } from 'graphql/generated';
import { Row, Col, Card } from 'antd';

import ChatSideList from 'components/viewChat/ChatSideList';

interface Props {
  // data: UserChatsQuery | undefined;
  // loading: boolean;
  // saving: boolean;
  currentId: string;
  onChangeId: (id: string) => void;
  // subscribeToNewMessage: () => void;
}

const ViewOffender = ({
  // data,
  // loading,
  // saving,
  currentId,
  onChangeId,
}: // handleMarkAsRead,
// subscribeToNewMessage,
Props): JSX.Element => (
  <div className="page-container">
    <Card>
      <Row>
        <Col span={8}>
          <ChatSideList onChangeId={onChangeId} currentId={currentId} />
        </Col>
        <Col span={16}>
          <div>ViewMessage</div>
          {/* <ViewMessage
          currentId={currentId}
          // subscribeToNewMessage={() => subscribeToNewMessage()}
        /> */}
        </Col>
      </Row>
    </Card>
  </div>
);

export default ViewOffender;
