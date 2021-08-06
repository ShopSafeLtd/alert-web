import React, { PureComponent } from 'react';
import styled from 'styled-components';

const Skeleton = styled.div`
  margin: 0;
  padding: 20px 13%;
  border-bottom: 1px solid #eeeeee;
  cursor: pointer;
`;
const SkeletonRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;
const SkeletonDate = styled.div`
  background-color: #bdbdbd
  height: 16px;
  width: 80%;
  border-radius: 2px;
`;
const SkeletonDay = styled.div`
  background-color: #bdbdbd
  height: 12px;
  width: 80%;
  margin-bottom: 4px;
  border-radius: 2px;
`;
const SkeletonHeader = styled.div`
  background-color: #bdbdbd
  height: 12px;
  width: 30%;
  margin-bottom: 4px;
  border-radius: 2px;
`;
const SkeletonDateContainer = styled.div`
  flex: 1;
`;
const DateArrow = styled.svg`
  height: 28px;
  width: 28px;
  flex: 1;
`;

class BanSkeleton extends PureComponent {
  render() {
    return (
      <Skeleton>
        <SkeletonRow>
          <SkeletonDateContainer>
            <SkeletonDay />
            <SkeletonDate />
          </SkeletonDateContainer>
          <DateArrow viewBox="0 0 24 24">
            <path
              fill="#EF5350"
              d="M11,16H3V8H11V2L21,12L11,22V16M13,7V10H5V14H13V17L18,12L13,7Z"
            />
          </DateArrow>
          <SkeletonDateContainer>
            <SkeletonDay />
            <SkeletonDate />
          </SkeletonDateContainer>
        </SkeletonRow>
        <SkeletonHeader />
        <SkeletonDate />
      </Skeleton>
    );
  }
}

export default BanSkeleton;
