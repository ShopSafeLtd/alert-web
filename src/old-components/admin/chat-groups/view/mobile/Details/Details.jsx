import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { ItemHeader, ItemText } from '../../../../../global/typography';
import { SkeletonText } from '../../../../../global/skeletons';

const Page = styled.div`
  max-height: calc(100vh - 160px);
  overflow: auto;
  padding: 10px 20px;
`;
const Item = styled.div`
  flex: 1;
  margin: 10px 0;
`;

class Details extends PureComponent {
  render() {
    const { loading, chat } = this.props;
    return (
      <Page>
        <Item>
          <ItemHeader>Group Name</ItemHeader>
          {loading ? <SkeletonText /> : <ItemText>{chat.name}</ItemText>}
        </Item>
        <Item>
          <ItemHeader>Description</ItemHeader>
          {loading ? (
            <SkeletonText />
          ) : (
            <ItemText>
              {!!chat.description
                ? chat.description
                : 'No description for chat group.'}
            </ItemText>
          )}
        </Item>
      </Page>
    );
  }
}

export default Details;
