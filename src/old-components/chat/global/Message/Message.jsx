import React from 'react';
import styled from 'styled-components';
import MediaQuery from 'react-responsive';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStoreState } from '../../../../state';
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 0 0 0 35px;
`;
const MessageContainer = styled.div`
  padding: 5px 0px 0;
  position: relative;
  text-align: right;
  @media (min-width: 1024px) {
    flex: 1;
    padding: 2px 20px;
    text-align: ${({ current }) => (current ? 'right' : 'left')};
  }
`;

const Row = styled.div`
  display: flex;
  margin: 12px 0;
  align-items: center;
  justify-content: flex-end;
  @media (min-width: 1024px) {
    padding: 5px 20px;
    justify-content: ${({ current }) => (current ? 'flex-end' : 'flex-start')};
  }
`;

const Text = styled(Typography)`
  max-width: 100%;
  word-break: break-word;
  margin: 0 0 0 10px;
  background: #ebebeb;
  padding: 6px 14px;
  border-radius: 8px;
  border: 1px solid #f5f5f5;
  display: inline-block;  
  font-size:14px;
  color:#585858
  ${({ current }) =>
    current &&
    `
    float: right;
    background: #FF5252;
    color: #fff;
  `} 
  }
`;

const User = styled(Typography)`
  height: 15px;
  font-size: 14px;
  align-items: center;
  @media (min-width: 1024px) {
    display: flex;

    margin-left: 0px;
    height: 30px;
  }
`;

const Avatar = styled(Typography)`
  background: #ebebeb;
  border-radius: 100%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 400;
  margin-right: 10px;
  margin-bottom: 0;
  ${({ current }) =>
    current &&
    `
    background: #FF5252;
    color: #fff;
  `}
`;

const Message = ({ content, sameUser, user, initials, fromId, sent, id }) => {
  const currentUser = useStoreState((state) => state.user.id);
  console.log(sameUser, currentUser === fromId);
  return (
    <MediaQuery minDeviceWidth={1024}>
      {(matches) => (
        <Container>
          {!sent && <CircularProgress size={20} />}
          <MessageContainer current={currentUser === fromId} id={id}>
            {!sameUser && (
              <Row current={currentUser === fromId}>
                {currentUser !== fromId || matches ? (
                  <Avatar current={currentUser === fromId} component="div">
                    {initials}
                  </Avatar>
                ) : null}
                <User variant="caption">
                  {currentUser === fromId && !matches ? 'You' : user}
                </User>
              </Row>
            )}
            <Text current={currentUser === fromId}>{content}</Text>
          </MessageContainer>
        </Container>
      )}
    </MediaQuery>
  );
};

export default Message;
