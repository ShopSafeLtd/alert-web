import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { Mutation } from 'react-apollo';

import CreateHistory from '../../../../graphql/history/mutations/CreateHistory';
import {
  AdminOffenders,
  AdminOffendersExcluded,
  UserOffenders,
  UserOffendersExcluded
} from '../../../../graphql/offenders/queries';
import DeleteMutation from '../../../../graphql/exclusions/mutations/DeleteExclusion';

class DeleteExclusionModal extends React.PureComponent {
  render() {
    const {
      close,
      visible,
      exclusionId,
      currentUserId,
      closeExclusion,
      filter,
      admin,
      search,
      userId,
      offenderId
    } = this.props;

    let query;
    if (admin) {
      filter === 'EXCLUDED'
        ? (query = AdminOffendersExcluded)
        : (query = AdminOffenders);
    } else {
      filter === 'EXCLUDED'
        ? (query = UserOffendersExcluded)
        : (query = UserOffenders);
    }

    return (
      <Mutation mutation={CreateHistory}>
        {createHistory => (
          <Mutation
            mutation={DeleteMutation}
            update={(store, { data: { deleteExclusion } }) => {
              let data = store.readQuery({
                query,
                variables: {
                  schemeId: window.localStorage.getItem('currentScheme'),
                  search:
                    filter === 'UNIDENTIFIED'
                      ? 'Unidentified Offender'
                      : search,
                  order: 'createdAt_DESC',
                  active: filter === 'ACTIVE' ? true : undefined,
                  userId
                }
              });
              let index = data.allOffenders
                .map(({ id }) => id)
                .indexOf(offenderId);
              data.allOffenders[index].exclusions = data.allOffenders[
                index
              ].exclusions.filter(({ id }) => id !== deleteExclusion.id);
              store.writeQuery({
                query,
                data,
                variables: {
                  schemeId: window.localStorage.getItem('currentScheme'),
                  search:
                    filter === 'UNIDENTIFIED'
                      ? 'Unidentified Offender'
                      : search,
                  order: 'createdAt_DESC',
                  active: filter === 'ACTIVE' ? true : undefined,
                  userId
                }
              });
            }}
          >
            {deleteExclusion => {
              const handleSubmit = () => {
                deleteExclusion({
                  variables: {
                    id: exclusionId
                  },
                  optimisticResponse: {
                    deleteExclusion: {
                      id: exclusionId,
                      __typename: 'Exclusion'
                    }
                  }
                });
                createHistory({
                  variables: {
                    type: 'DELETED',
                    model: 'EXCLUSION',
                    buUserId: currentUserId,
                    schemeId: window.localStorage.getItem('currentScheme')
                  }
                });
                close();
                closeExclusion();
              };
              return (
                <Dialog
                  open={visible}
                  onClose={() => close()}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {'Are you sure?'}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      There is no going back this ban will be delete
                      permanently!
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => close()}>Cancel</Button>
                    <Button onClick={handleSubmit} color="primary" autoFocus>
                      Delete Permanently
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

export default DeleteExclusionModal;
