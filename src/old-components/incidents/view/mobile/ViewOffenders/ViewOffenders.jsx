import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

import { TabEmptyState } from '../../../../global/emptyStates';

const OffenderImage = styled.div`
  width: 60px;
  height: 60px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  ${({ url }) => `background-image: url(${url});`};
`;
const AlertOffenders = styled.div`
  height: calc(100vh - 381px);
  padding: 0;
`;
const Svg = styled.svg`
  width: 26px;
  height: 26px;
`;
const Offender = styled.div`
  display: flex;
  align-items: center;
  padding-right: 10px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;
const OffenderText = styled(Typography)`
  padding: 0 20px;
  margin: 0;
  flex: 1;
  display: flex;
  align-items: center;
`;
const OffenderAvatar = styled.div`
  background: #f5f5f5;
`;
const OffenderIcon = styled.svg`
  width: 60px;
  height: 60px;
`;
const List = styled.div`
  padding-top: 10px;
  height: 100%;
  overflow: auto;
`;
const Image = styled.svg`
  width: 48px;
  height: 48px;
`;

class AlertCardOffenders extends React.PureComponent {
  render() {
    const { offenders, toggleOffenderPopOver } = this.props;

    return (
      <AlertOffenders>
        {offenders.length > 0 ? (
          <List>
            {offenders.map(offender => (
              <Offender
                button
                key={offender.id}
                onClick={() => toggleOffenderPopOver(offender)}
              >
                {offender.images.length > 0 ? (
                  <OffenderImage url={offender.images[0].url} />
                ) : (
                  <OffenderAvatar>
                    <OffenderIcon viewBox="0 0 24 24">
                      <path
                        fill="#E0E0E0"
                        d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
                      />
                    </OffenderIcon>
                  </OffenderAvatar>
                )}
                <OffenderText>{offender.name}</OffenderText>
                <Svg viewBox="0 0 24 24">
                  <path
                    fill="#EF9A9A"
                    d="M17,12L12,17V14H8V10H12V7L17,12M2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12M4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12Z"
                  />
                </Svg>
              </Offender>
            ))}
          </List>
        ) : (
          <TabEmptyState
            image={
              <Image viewBox="0 0 24 24">
                <path
                  fill="#EF9A9A"
                  d="M16,13C15.71,13 15.38,13 15.03,13.05C16.19,13.89 17,15 17,16.5V19H23V16.5C23,14.17 18.33,13 16,13M8,13C5.67,13 1,14.17 1,16.5V19H15V16.5C15,14.17 10.33,13 8,13M8,11A3,3 0 0,0 11,8A3,3 0 0,0 8,5A3,3 0 0,0 5,8A3,3 0 0,0 8,11M16,11A3,3 0 0,0 19,8A3,3 0 0,0 16,5A3,3 0 0,0 13,8A3,3 0 0,0 16,11Z"
                />
              </Image>
            }
            text="No offenders on this alert"
            width={70}
          />
        )}
      </AlertOffenders>
    );
  }
}

export default AlertCardOffenders;
