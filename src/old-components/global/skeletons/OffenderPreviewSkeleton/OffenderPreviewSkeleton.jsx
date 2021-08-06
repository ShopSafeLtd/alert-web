import React, { PureComponent } from 'react';
import styled from 'styled-components';

const PreviewSkeleton = styled.div``;
const Center = styled.div`
  display: flex;
  justify-content: center;
`;
const ImageSkeleton = styled.div`
  height: 200px;
  width: 200px;
  background-color: #f5f5f5;
  margin: 20px;
`;
const TitleSkeleton = styled.div`
  height: 32px;
  width: 250px;
  background-color: #f5f5f5;
  margin: 20px;
`;
const Row = styled.div`
  display flex;
`;
const SkeletonColumn = styled.div`
  flex: 1;
  margin: 20px;
`;
const SkeletonHeader = styled.div`
  height: 21px;
  width: 100px;
  background-color: #f5f5f5;
  margin-bottom: 10px;
`;
const SkeleteonField = styled.div`
  height: 18px;
  width: 100%;
  background-color: #f5f5f5;
`;

class OffenderPreviewSkeleton extends PureComponent {
  render() {
    return (
      <PreviewSkeleton>
        <Center>
          <ImageSkeleton />
        </Center>
        <TitleSkeleton />
        <Row>
          <SkeletonColumn>
            <SkeletonHeader />
            <SkeleteonField />
          </SkeletonColumn>
          <SkeletonColumn>
            <SkeletonHeader />
            <SkeleteonField />
          </SkeletonColumn>
          <SkeletonColumn>
            <SkeletonHeader />
            <SkeleteonField />
          </SkeletonColumn>
        </Row>
        <Row>
          <SkeletonColumn>
            <SkeletonHeader />
            <SkeleteonField />
          </SkeletonColumn>
          <SkeletonColumn>
            <SkeletonHeader />
            <SkeleteonField />
          </SkeletonColumn>
        </Row>
        <Row>
          <SkeletonColumn>
            <SkeletonHeader />
            <SkeleteonField />
          </SkeletonColumn>
        </Row>
      </PreviewSkeleton>
    );
  }
}

export default OffenderPreviewSkeleton;
