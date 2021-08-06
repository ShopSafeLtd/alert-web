import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { PreviousAddressSkeleton } from '../../../../global/skeletons';
import History from '../../../../../images/History';
import { EmptyText } from '../../../../global/typography';

const HeaderRow = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
`;
const Header = styled(Typography)`
  margin: 0;
  flex: 1;
`;
const PreviousLocations = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const PreviousItem = styled.div`
  width: 100%;
  display: flex;
  border-top: 1px solid #e0e0e0;
  padding: 10px 20px;
  background: ${({ selected }) => selected && 'rgba(255,235,238, 0.5)'};
`;
const PreviousText = styled(Typography)`
  margin: 0;
  flex: 1;
  display: flex;
  align-items: center;
`;
const Empty = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Previous = ({
  setLocationPristine,
  loadingAddresses,
  previousLocations,
  previousLocation,
  history,
  setPreviousLocation
}) => {
  return (
    <PreviousLocations>
      <HeaderRow>
        <Header>Select an location</Header>
        <Button color="primary" onClick={() => setLocationPristine(true)}>
          Back To Menu
        </Button>
      </HeaderRow>
      {loadingAddresses ? (
        <div>
          <PreviousAddressSkeleton />
          <PreviousAddressSkeleton />
          <PreviousAddressSkeleton />
        </div>
      ) : previousLocations.length === 0 ? (
        <Empty>
          <History width="80px" height="80px" />
          <EmptyText>You have no previous addresses</EmptyText>
        </Empty>
      ) : (
        <div>
          {previousLocations.map(
            ({
              id,
              premises,
              building,
              street,
              townCity,
              county,
              postcode
            }) => (
              <PreviousItem
                key={id}
                selected={previousLocation === id}
                onClick={() => {
                  setPreviousLocation(
                    id,
                    premises,
                    building,
                    street,
                    townCity,
                    county,
                    postcode
                  );
                  history.push('/incidents/add/offenders');
                }}
              >
                <PreviousText>
                  {`
                ${
                  premises !== null && premises !== undefined && premises !== ''
                    ? `${premises},`
                    : ``
                }
                ${
                  building !== null && building !== undefined && building !== ''
                    ? `${building},`
                    : ``
                }
                ${
                  street !== null && street !== undefined && street !== ''
                    ? `${street},`
                    : ``
                }
                ${
                  townCity !== null && townCity !== undefined && townCity !== ''
                    ? `${townCity},`
                    : ``
                }
                ${
                  county !== null && county !== undefined && county !== ''
                    ? `${county},`
                    : ``
                }
                ${
                  postcode !== null && postcode !== undefined && postcode !== ''
                    ? `${postcode}`
                    : ``
                }
              `}
                </PreviousText>
                <Button color="primary">Select</Button>
              </PreviousItem>
            )
          )}
        </div>
      )}
    </PreviousLocations>
  );
};

export default Previous;
