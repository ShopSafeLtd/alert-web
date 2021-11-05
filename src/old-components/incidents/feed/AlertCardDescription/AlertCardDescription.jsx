import React from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';
import Typography from '@material-ui/core/Typography';

const AlertDescription = styled.div`
  height: 231px;
  padding: 0.5rem 1rem;
  position: relative;
`;
const Subject = styled(Typography)`
  margin: 0;
`;
const Date = styled(Typography)`
  color: rgba(0, 0, 0, 0.54);
  display: inline;
`;
const Time = styled(Typography)`
  padding-right: 0.5rem;
  color: rgba(0, 0, 0, 0.54);
  display: inline;
`;
const CrimeTypes = styled.div`
  margin: 0.8rem 0 0.5rem;
  display: flex;
  flex-wrap: wrap;
`;
const CrimeType = styled(Typography)`
  color: #fff;
  background-color: #ef5350;
  padding: 0.3rem 0.8rem;
  border-radius: 25px;
  font-weight: 300;
  margin: 0 0.4rem 0.3rem 0;
  display: inline;
`;
const Description = styled(Typography)`
  margin: 0;
`;
const User = styled(Typography)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: #fff;
  padding: 0.8rem 1rem;
  color: rgba(0, 0, 0, 0.54);
`;
const Container = styled.div`
  height: 100%;
  overflow: auto;
  padding-bottom: 38px;
`;

class AlertCardDescription extends React.Component {
  render() {
    const { subject, date, time, crimeTypes, description, user, groups } =
      this.props;
    return (
      <AlertDescription>
        <Container>
          <Subject component="h3" variant="h6">
            {subject}
          </Subject>
          <Time component="span" variant="body2">
            <Moment format="HH:mm">{time}</Moment>
          </Time>
          <Date component="span" variant="body2">
            <Moment format="DD/MM/YYYY">{date}</Moment>
          </Date>
          <div
            style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
          >
            {groups.map((el) => (
              <>
                <span style={{ marginRight: '9px' }}>{`${el.name}`}</span>
              </>
            ))}
          </div>
          <CrimeTypes component="span" variant="body2">
            {crimeTypes.map(({ name, id }) => {
              return (
                <CrimeType variant="caption" key={id}>
                  {name}
                </CrimeType>
              );
            })}
          </CrimeTypes>
          <Description component="span" variant="body2">
            {description}
          </Description>
        </Container>
        <User component="p" variant="caption">
          <span>{user === null ? 'Deleted User' : user.fullName}</span>{' '}
          {user !== null && '-'}{' '}
          <span>{user !== null && user.organisation}</span>
        </User>
      </AlertDescription>
    );
  }
}

export default AlertCardDescription;
