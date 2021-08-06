import React, { PureComponent } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Mutation } from 'react-apollo';

import CreateHistory from '../../../../graphql/history/mutations/CreateHistory';
import ExclusionQuery from '../../../../graphql/exclusions/queries/Exclusion';
import EditMutation from '../../../../graphql/exclusions/mutations/EditExclusion';

class DeactivateExclusionModal extends PureComponent {
  render() {
    const {
      open,
      close,
      setStatusBar,
      exclusionId,
      currentUserId
    } = this.props;
    return (
      <Mutation
        mutation={CreateHistory}
        refetchQueries={[
          {
            query: ExclusionQuery,
            variables: {
              id: exclusionId
            }
          }
        ]}
      >
        {createHistory => (
          <Mutation mutation={EditMutation}>
            {editExclusion => {
              const handleSubmit = async () => {
                setStatusBar(true, 'Deactivating Ban...');
                this.setState({ submitting: true });
                editExclusion({
                  variables: {
                    id: exclusionId,
                    active: false
                  }
                });
                createHistory({
                  variables: {
                    type: 'DEACTIVATED',
                    model: 'EXCLUSION',
                    byUserId: currentUserId,
                    schemeId: window.localStorage.getItem('currentScheme'),
                    exclusionId: exclusionId
                  }
                });
                setStatusBar(false, '');
                this.setState({ submitting: false });
                close();
              };
              return (
                <Dialog
                  open={open}
                  onClose={close}
                  aria-labelledby="deactivate-dialog-title"
                  aria-describedby="deactivate-dialog-description"
                >
                  <DialogTitle id="deactivate-dialog-title">
                    {'Are you sure?'}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="deactivate-dialog-description">
                      Deactivating this ban will keep it listed on the offender
                      but will only show it to admin users, standard users will
                      no longer be able to see this ban.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={close}>Cancel</Button>
                    <Button onClick={handleSubmit} color="primary" autoFocus>
                      Deactivate
                    </Button>
                  </DialogActions>
                </Dialog>
              );
            }}
          </Mutation>
        )}
      </Mutation>
    );
  }
}

export default DeactivateExclusionModal;
