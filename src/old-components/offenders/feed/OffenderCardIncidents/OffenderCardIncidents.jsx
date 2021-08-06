import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';

import { ListItem, Grow } from '../../../global/layout';
import { TabEmptyState } from '../../../global/emptyStates';

const Incidents = styled.div`
  height: 187px;
  display: flex;
  flex-direction: column;
`;
const EmptyState = styled.div`
  height: 187px;
  display: flex;
`;
const Svg = styled.svg`
  width: 24px;
  height: 24px;
`;
const Subject = styled(Typography)`
  margin-bottom: 8px;
`;
const Details = styled(Typography)`
  margin-bottom: 8px;
`;
const Image = styled.svg`
  width: 48px;
  height: 48px;
`;

class OffenderCardIncidents extends React.Component {
  render() {
    const { incidents, toggleOpen } = this.props;
    return incidents.length > 0 ? (
      <Incidents>
        <div>
          {incidents.map(incident => {
            return (
              <ListItem
                onClick={() => toggleOpen(incident.id)}
                key={incident.id}
              >
                <Grow>
                  <div>
                    <Subject variant="subtitle2">{incident.subject}</Subject>
                    <Details>{`${incident.createdBy.fullName} - ${
                      incident.createdBy.organisation
                    } - ${moment(incident.date).format('DD/MM/YY')}`}</Details>
                  </div>
                </Grow>
                <Svg>
                  <path
                    fill="#E57373"
                    d="M17,12L12,17V14H8V10H12V7L17,12M2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12M4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12Z"
                  />
                </Svg>
              </ListItem>
            );
          })}
        </div>
      </Incidents>
    ) : (
      <EmptyState>
        <TabEmptyState
          text="There are no alerts for this offender"
          image={
            <Image viewBox="0 0 24 24">
              <path
                fill="#EF9A9A"
                d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z"
              />
            </Image>
          }
          width={50}
        />
      </EmptyState>
    );
  }
}

export default OffenderCardIncidents;
