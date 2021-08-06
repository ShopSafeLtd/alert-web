import styled from 'styled-components';

const ListItem = styled.div`
  display: flex;
  flex-direction: ${({ column }) => (column ? 'column' : 'row')};
  width: 100%;
  justify-content: center;
  align-items: ${({ column }) => (column ? 'flex-start' : 'center')};
  padding: 10px 20px;
  font-size: 1.1rem;
  min-height: 70px;
  position: relative;
  border-bottom: 1px solid #e0e0e0;
  ${({ noHover }) =>
    !noHover &&
    `
    &:hover {
      background: #eeeeee;
    }
  `};
`;

export default ListItem;
