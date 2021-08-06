import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

const Card = styled.div`
  max-width: 100%;
  min-width: 100%;
  overflow: hidden;
`;
const Image = styled.div`
  height: 220px;
  background-color: #ffebee;
`;
const AlertTitle = styled.div`
  height: 28px;
  width: 150px;
  border-radius: 3px;
  background-color: #ffebee;
  margin-bottom: 14px;
`;
const AlertText1 = styled.div`
  height: 18px;
  width: 250px;
  border-radius: 3px;
  background-color: #ffebee;
  margin-bottom: 6px;
`;
const AlertText2 = styled.div`
  height: 18px;
  width: 180px;
  border-radius: 3px;
  background-color: #ffebee;
  margin-bottom: 6px;
`;
const AlertText3 = styled.div`
  height: 18px;
  width: 220px;
  border-radius: 3px;
  background-color: #ffebee;
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
const CardTabText = styled(Typography)``;
const CardText = styled.div`
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: column;
`;

class SkeletonAlertCard extends React.Component {
  render() {
    return (
      <Card>
        <Image />
        <CardTabs>
          <CardTab>
            <CardTabText>Description</CardTabText>
          </CardTab>
          <CardTab>
            <CardTabText>Location</CardTabText>
          </CardTab>
          <CardTab>
            <CardTabText>Offenders</CardTabText>
          </CardTab>
        </CardTabs>
        <CardText>
          <AlertTitle />
          <AlertText1 />
          <AlertText2 />
          <AlertText3 />
          <AlertText2 />
        </CardText>
      </Card>
    );
  }
}

export default SkeletonAlertCard;
