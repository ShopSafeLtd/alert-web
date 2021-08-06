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
import { useStoreState, useStoreActions } from '../../../../state';

class ActivateExclusionModal extends PureComponent {
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
                    active: true
                  }
                });
                createHistory({
                  variables: {
                    type: 'ACTIVATED',
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
                  aria-labelledby="activate-dialog-title"
                  aria-describedby="activate-dialog-description"
                >
                  <DialogTitle id="activate-dialog-title">
                    {'Are you sure?'}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="deactivate-dialog-description">
                      Activating this ban will make it available for all users
                      to see.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={close}>Cancel</Button>
                    <Button onClick={handleSubmit} color="primary" autoFocus>
                      Activate
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

const Wrapper = props => {
  const currentUserId = useStoreState(state => state.user.id);
  const setStatusBar = useStoreActions(actions => actions.theme.setStatusBar);

  return (
    <ActivateExclusionModal
      currentUserId={currentUserId}
      setStatusBar={setStatusBar}
      {...props}
    />
  );
};

export default Wrapper;
