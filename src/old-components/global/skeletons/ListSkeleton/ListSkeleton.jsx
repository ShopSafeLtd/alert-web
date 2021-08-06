import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

import SkeletonText from '../SkeletonText/SkeletonText';

const Group = styled(Typography)`
  padding: 15px 20px;
  border-bottom: 1px solid #e0e0e0;
`;

class ListSkeleton extends PureComponent {
  render() {
    return (
      <Group>
        <SkeletonText />
      </Group>
    );
  }
}

export default ListSkeleton;
