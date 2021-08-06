import React, { PureComponent } from 'react';
import styled from 'styled-components';
import EditSvg from '@material-ui/icons/Edit';
import CreateSvg from '@material-ui/icons/Add';
import DeleteSvg from '@material-ui/icons/Delete';
import LockSvg from '@material-ui/icons/Lock';
import LockOpenSvg from '@material-ui/icons/LockOpen';
import UndoSvg from '@material-ui/icons/Undo';
import RedoSvg from '@material-ui/icons/Redo';
import ApproveSvg from '@material-ui/icons/DoneOutline';
import DeclineSvg from '@material-ui/icons/Clear';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const ActionAvatar = styled.div`
  color: #ef5350;
  margin-right: 15px;
  display: flex;
  align-items: center;
`;
const CreateIcon = styled(CreateSvg)`
  width: 24px;
`;
const DeleteIcon = styled(DeleteSvg)`
  width: 20px;
`;
const UndoIcon = styled(UndoSvg)`
  width: 22px;
`;
const RedoIcon = styled(RedoSvg)`
  width: 22px;
`;
const LockIcon = styled(LockSvg)`
  width: 22px;
`;
const LockOpenIcon = styled(LockOpenSvg)`
  width: 22px;
`;
const EditAvatarIcon = styled(EditSvg)`
  width: 20px;
`;
const ApproveIcon = styled(ApproveSvg)`
  width: 20px;
`;
const DeclineIcon = styled(DeclineSvg)`
  width: 20px;
`;
const Action = styled(Typography)`
  padding: 10px 15px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
`;
const ViewLink = styled(Link)`
  text-decoration: none;
  color: #ef5350;
`;

class Activity extends PureComponent {
  render() {
    const { type, model, incident, offender } = this.props;
    return (
      <div>
        <Action component="div">
          <ActionAvatar>
            {type === 'CREATED' && <CreateIcon />}
            {type === 'DELETED' && <DeleteIcon />}
            {type === 'REDUCED' && <UndoIcon />}
            {type === 'EXTENDED' && <RedoIcon />}
            {type === 'EDITED' && <EditAvatarIcon />}
            {type === 'ACTIVATED' && <LockOpenIcon />}
            {type === 'DEACTIVATED' && <LockIcon />}
            {type === 'APPROVED' && <ApproveIcon />}
            {type === 'DECLINED' && <DeclineIcon />}
          </ActionAvatar>
          <div>
            <div>
              {type === 'CREATED' && 'Created new '}
              {type === 'DELETED' && 'Deleted an '}
              {type === 'REDUCED' && 'Reduced '}
              {type === 'EXTENDED' && 'Extended '}
              {type === 'EDITED' && 'Edited an '}
              {type === 'ACTIVATED' && 'Actived '}
              {type === 'DEACTIVATED' && 'Deactivated '}
              {type === 'APPROVED' && 'Approved an  '}
              {type === 'DECLINED' && 'Declied an '}

              {model === 'INCIDENT' && 'incident'}
              {model === 'OFFENDER' && 'Offender'}
              {model === 'SCHEME' && 'Scheme'}
              {model === 'USER' && 'User'}
              {model === 'GROUP' && 'Group'}
              {model === 'EXCLUSION' && 'Exclusion'}
            </div>
            {model === 'INCIDENT' &&
              incident !== null && (
                <ViewLink to={`/incidents/view/${incident.id}`}>
                  View Incident
                </ViewLink>
              )}
            {model === 'OFFENDER' &&
              offender !== null && (
                <ViewLink to={`/offenders/view/${offender.id}`}>
                  View Offender
                </ViewLink>
              )}
          </div>
        </Action>
      </div>
    );
  }
}

export default Activity;
