import styled from 'styled-components';

const Page = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 56px);
  overflow-x: hidden;
  overflow-y: auto;
  padding-bottom: 56px;
  background: #fff;
  @media (min-width: 1024px) {
    padding: 40px 60px;
    background: #fafafa;
  }
`;

export default Page;
