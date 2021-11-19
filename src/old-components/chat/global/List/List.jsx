import styled from 'styled-components';

const List = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e0e0e0;
  @media (min-width: 1024px) {
    max-width: 400px;
    min-width: 400px;
    height: calc(100vh - 70px);
    overflow: scroll;
  }
`;

export default List;
