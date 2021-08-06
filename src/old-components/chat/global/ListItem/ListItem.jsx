import styled from 'styled-components';

const ListItem = styled.div`
  padding: 15px 20px;
  border-bottom: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
  ${({ active }) =>
    active === true &&
    `
    @media (min-width: 1024px) {
      background: rgba(0,0,0,.05)
    }
  `};
`;

export default ListItem;
