import styled from 'styled-components';

const ChatText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  font-weight: ${({ newMessages }) => (newMessages ? '700' : 'normal')};
`;

export default ChatText;
