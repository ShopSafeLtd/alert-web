import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SectionLoading = () => (
  <LoadingOverlay>
    <CircularProgress />
  </LoadingOverlay>
);

export default SectionLoading;
