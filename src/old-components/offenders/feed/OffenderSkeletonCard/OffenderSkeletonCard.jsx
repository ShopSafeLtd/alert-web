import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

const Card = styled.div`
  width: 100%;
  height: 500px;
  background: #fff;
`;
const Image = styled.div`
  width: 100%;
  height: 265px;
  background-color: #ffebee;
`;
const Title = styled.div`
  height: 28px;
  width: 150px;
  border-radius: 3px;
  backgroundcolor: #ffebee;
  marginbottom: 14px;
`;
const Text1 = styled.div`
  height: 18px;
  width: 90%;
  border-radius: 3px;
  background-color: #FFEBEE
  margin-bottom: 6px;
`;
const CardTabs = styled.div`
  display: flex;
  background-color: #fff;
  height: 48px;
  border-bottom: 1px solid #e0e0e0;
`;
const CardTab = styled.div`
  max-width: calc(100vw - 56px);
  min-width: 72px;
  color: inherit;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
  height: 48px;
  justify-content: flex-end;
  overflow: hidden;
  padding-left: 12px;
  padding-right: 12px;
  position: relative;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CardTabText = styled(Typography)`
  color: rgba(0, 0, 0, 0.87);
`;
const CardText = styled.div`
  padding: 0.5rem 1rem;
`;

class OffenderSkeletonCard extends React.Component {
  render() {
    return (
      <Card>
        <Image />
        <CardTabs>
          <CardTab>
            <CardTabText component="span">Details</CardTabText>
          </CardTab>
          <CardTab>
            <CardTabText component="span">Incidents</CardTabText>
          </CardTab>
          <CardTab>
            <CardTabText component="span">Exclusions</CardTabText>
          </CardTab>
        </CardTabs>
        <CardText>
          <Title />
          <Text1 />
          <Text1 />
        </CardText>
      </Card>
    );
  }
}

export default OffenderSkeletonCard;
