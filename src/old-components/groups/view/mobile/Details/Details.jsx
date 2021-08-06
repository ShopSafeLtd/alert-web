import React, { PureComponent } from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

import { ItemHeader, ItemText } from '../../../../global/typography';

const Page = styled.div`
  height: calc(100vh - 160px);
  max-height: calc(100vh - 160px);
  overflow: auto;
  display: flex;
  padding: 10px 20px;
`;
const Loading = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Item = styled.div`
  flex: 1;
  margin: 10px 0;
`;

class Details extends PureComponent {
  render() {
    const { loading, group } = this.props;
    return (
      <Page>
        {loading ? (
          <Loading>
            <CircularProgress />
          </Loading>
        ) : (
          <div>
            <Item>
              <ItemHeader>Group Name</ItemHeader>
              <ItemText>{group.name}</ItemText>
            </Item>
            <Item>
              <ItemHeader>Description</ItemHeader>
              <ItemText>
                {!!group.description
                  ? group.description
                  : 'No description for group.'}
              </ItemText>
            </Item>
          </div>
        )}
      </Page>
    );
  }
}

export default Details;
