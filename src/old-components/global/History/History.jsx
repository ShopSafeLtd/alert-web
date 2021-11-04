import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

import Created from '../../../images/history-icons/Created';
import Edited from '../../../images/history-icons/Edited';
import Extended from '../../../images/history-icons/Extended';
import Reduced from '../../../images/history-icons/Reduced';
import Deactivated from '../../../images/history-icons/Deactivated';
import Activate from '../../../images/history-icons/Activate';

const Container = styled.div``;
const Row = styled.div`
  display: flex;
  align-items: center;
`;
const HistoryItem = styled.div`
  width: 100%;
  border-bottom: 1px solid #e0e0e0;
  padding: 10px 10px;
`;
const HistoryTitle = styled(Typography)`
  margin-bottom: 0;
  margin-left: 5px;
  color: #616161;
`;
const HistoryUser = styled(Typography)`
  margin: 0 0;
  color: #9e9e9e;
`;
const HistoryText = styled(Typography)`
  margin: 0 0;
  color: #9e9e9e;
  font-size: 14px;
`;

class History extends PureComponent {
  render() {
    const { history, loading } = this.props;
    return loading ? (
      <div />
    ) : (
      <Container>
        {history.map(({ id, type, notes, createdAt, byUser }) => {
          let title, icon;
          if (type === 'CREATED') {
            title = 'Exclusion Created';
            icon = <Created width="20px" height="20px" />;
          } else if (type === 'EDITED') {
            title = 'Exclusion Edited';
            icon = <Edited width="20px" height="20px" />;
          } else if (type === 'EXTENDED') {
            title = 'Exclusion Extended';
            icon = <Extended width="20px" height="20px" />;
          } else if (type === 'REDUCED') {
            title = 'Exclusion Reduced';
            icon = <Reduced width="20px" height="20px" />;
          } else if (type === 'DEACTIVATED') {
            title = 'Exclusion Deactivated';
            icon = <Deactivated width="20px" height="20px" />;
          } else if (type === 'ACTIVATED') {
            title = 'Exclusion Activated';
            icon = <Activate width="20px" height="20px" />;
          }

          return (
            <HistoryItem key={id}>
              <Row>
                {icon}
                <HistoryTitle variant="subtitle1">{title}</HistoryTitle>
              </Row>
              <HistoryText>{notes}</HistoryText>
              <HistoryUser variant="caption">
                {!!byUser &&
                  `By ${byUser.fullName} at ${moment(createdAt).format(
                    'DD/MM/YYYY hh:mm'
                  )}`}
              </HistoryUser>
            </HistoryItem>
          );
        })}
      </Container>
    );
  }
}

export default History;
