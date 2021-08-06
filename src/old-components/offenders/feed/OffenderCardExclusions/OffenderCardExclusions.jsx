import React from 'react';
import styled from 'styled-components';

import { TabEmptyState } from '../../../global/emptyStates';
import OffenderCardExclusion from '../OffenderCardExclusion/OffenderCardExclusion';

const Exclusions = styled.div`
  height: 187px;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;
const EmptyState = styled.div`
  height: 187px;
  display: flex;
`;
const Image = styled.svg`
  width: 48px;
  height: 48px;
`;

class OffenderCardExclusions extends React.Component {
  render() {
    const {
      exclusions,
      openExclusion,
      openEditExclusion,
      openDeleteExclusion,
      offenderId
    } = this.props;
    return !!exclusions && exclusions.length > 0 ? (
      <Exclusions>
        {exclusions.map(exclusion => {
          return (
            <OffenderCardExclusion
              key={exclusion.id}
              exclusion={exclusion}
              openExclusion={() => openExclusion(exclusion.id, offenderId)}
              openEditExclusion={() => openEditExclusion(exclusion)}
              openDeleteExclusion={() => openDeleteExclusion(exclusion)}
            />
          );
        })}
      </Exclusions>
    ) : (
      <EmptyState>
        <TabEmptyState
          text="There are no bans for this offender"
          image={
            <Image viewBox="0 0 24 24">
              <path
                fill="#EF9A9A"
                d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12C4,13.85 4.63,15.55 5.68,16.91L16.91,5.68C15.55,4.63 13.85,4 12,4M12,20A8,8 0 0,0 20,12C20,10.15 19.37,8.45 18.32,7.09L7.09,18.32C8.45,19.37 10.15,20 12,20Z"
              />
            </Image>
          }
          width={50}
        />
      </EmptyState>
    );
  }
}

export default OffenderCardExclusions;
