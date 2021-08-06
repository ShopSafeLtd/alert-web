import React, { Fragment } from 'react';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import {
  FeedContainer,
  FeedCardContainer,
  SkeletonContainer
} from '../../../global/feed';
import { PullToRefresh } from '../../../global/pullToRefresh';
import { Card } from '../../../global/cards';
import { EmptyState } from '../../../global/emptyStates';
import Incidents from 'images/Incidents';
import AlertCard from '../AlertCard/AlertCard';
import SkeletonAlertCard from '../SkeletonAlertCard/SkeletonAlertCard';
import OffenderPopOver from '../OffenderPopOver/OffenderPopOver';
import UnapprovedCardGroups from '../../../global/cards/UnapprovedCardGroups/UnapprovedCardGroups';
import DeclineDialog from '../DeclineDialog/DeclineDialog';
import AlertFilter from '../AlertFilter/AlertFilter';

const EmptyContainer = styled.div`
  height: calc(100vh - 112px);
  display: flex;
  align-items: center;
`;

class AlertFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pristine: true,
      deleteModal: false,
      deleteId: '',
      disable: false,
      offenderPopOver: false,
      currentOffender: {
        images: []
      },
      approve: false,
      approveId: '',
      approveOffenders: [],
      declineDialog: false,
      filterOpen: false
    };
  }

  componentDidUpdate(prevProps) {
    this.props.alerts.length > 0 &&
      this.state.pristine &&
      this.setState({
        pristine: false
      });
  }

  toggleDeleteModal = id =>
    this.setState({
      deleteModal: !this.state.deleteModal,
      deleteId: id || ''
    });

  toggleDeclineDialog = id =>
    this.setState({
      declineDialog: !this.state.declineDialog,
      declineId: id || ''
    });

  toggleOffenderPopOver = offender =>
    this.setState({
      offenderPopOver: !this.state.offenderPopOver,
      currentOffender: offender || { images: [] }
    });

  toggleApprove = (id, offenders) =>
    this.setState({
      approve: !this.state.approve,
      approveId: id || '',
      approveGroups: [],
      approveOffenders: offenders || []
    });

  approveIncident = groups => {
    const { approveId } = this.state;
    const incident = this.props.alerts.find(({ id }) => id === approveId);
    const connect = groups
      .filter(group => !incident.groups.map(({ id }) => id).includes(group))
      .map(id => ({ id }));
    const disconnect = incident.groups
      .filter(({ id }) => !groups.includes(id))
      .map(({ id }) => ({ id }));
    this.props.approveIncident({
      variables: {
        id: approveId,
        groups: {
          connect: connect.length > 0 ? connect : undefined,
          disconnect: disconnect.length > 0 ? disconnect : undefined
        }
      }
    });
    this.toggleApprove();
  };

  handleDelete = () => {
    this.props.deleteIncident({
      variables: {
        id: this.state.deleteId
      },
      optimisicResponse: {
        id: this.state.deleteId,
        __typename: 'Alert'
      }
    });
    this.toggleDeleteModal();
  };

  handleDecline = async () => {
    this.setState({
      disable: true
    });
    await this.props.deleteIncident({
      variables: {
        id: this.state.declineId
      }
    });
    this.toggleDeclineDialog();
    this.setState({
      disable: false
    });
  };

  render() {
    const {
      setStatusBar,
      search,
      loading,
      alerts,
      refetch,
      order,
      crimeTypes,
      setCrimeTypes,
      setOrder,
      loadMore,
      admin,
      loadingMore,
      networkError,
      retryLoad,
      filterSet
    } = this.props;
    const {
      pristine,
      deleteModal,
      offenderPopOver,
      currentOffender,
      approve,
      disable,
      declineDialog,
      filterOpen,
      approveId
    } = this.state;
    return (
      <Fragment>
        <FeedContainer
          to="/incidents/add"
          loadMore={loadMore}
          loading={loadingMore}
          networkError={networkError}
          text="Incident"
          retryLoad={retryLoad}
        >
          <AlertFilter
            open={filterOpen}
            handleClose={() => this.setState({ filterOpen: false })}
            order={order}
            selectedCrimeTypes={crimeTypes}
            setCrimeTypes={setCrimeTypes}
            setOrder={setOrder}
          />
          {loading && pristine ? (
            <PullToRefresh onRefresh={refetch}>
              <FeedCardContainer>
                <SkeletonContainer cardHeight="500px">
                  <SkeletonAlertCard />
                </SkeletonContainer>
              </FeedCardContainer>
            </PullToRefresh>
          ) : alerts.length > 0 ? (
            <PullToRefresh onRefresh={refetch}>
              <FeedCardContainer>
                {alerts.map(alert => {
                  return (
                    <Card key={alert.id} height="500px">
                      <AlertCard
                        key={alert.id}
                        alert={alert}
                        setStatusBar={setStatusBar}
                        refetch={refetch}
                        toggleDeleteModal={this.toggleDeleteModal}
                        toggleOffenderPopOver={this.toggleOffenderPopOver}
                        toggleApprove={this.toggleApprove}
                        toggleDecline={id => this.toggleDeclineDialog(id)}
                        admin={admin}
                      />
                    </Card>
                  );
                })}
              </FeedCardContainer>
              <Dialog
                open={deleteModal}
                onClose={this.toggleDeleteModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {'Are you sure?'}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    There is no going back this incident will be deleted
                    permanently!
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    disabled={disable}
                    onClick={() => this.toggleDeleteModal()}
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={disable}
                    onClick={this.handleDelete}
                    color="primary"
                    autoFocus
                  >
                    Delete Permanently
                  </Button>
                </DialogActions>
              </Dialog>
              <DeclineDialog
                open={declineDialog}
                close={() => this.toggleDeclineDialog()}
                handleDecline={this.handleDecline}
              />
            </PullToRefresh>
          ) : filterSet > 0 || search !== '' ? (
            <PullToRefresh onRefresh={refetch}>
              <EmptyContainer>
                <EmptyState
                  image={<Incidents height="96px" width="96px" />}
                  alt="Incident Icon"
                  text="Can't find any incidents that match."
                />
              </EmptyContainer>
            </PullToRefresh>
          ) : (
            <PullToRefresh onRefresh={refetch}>
              <EmptyContainer>
                <EmptyState
                  image={<Incidents height="96px" width="96px" />}
                  alt="Incident Icon"
                  text="There are currently no active incidents."
                  actions={[
                    <Button
                      variant="contained"
                      color="primary"
                      component={Link}
                      to="/incidents/add"
                    >
                      Add First Incident
                    </Button>
                  ]}
                />
              </EmptyContainer>
            </PullToRefresh>
          )}
        </FeedContainer>
        <OffenderPopOver
          open={offenderPopOver}
          offender={currentOffender}
          toggleOffenderPopOver={this.toggleOffenderPopOver}
        />
        {!admin && (
          <UnapprovedCardGroups
            visible={approve}
            cancel={this.toggleApprove}
            approve={this.approveIncident}
            incident={alerts.find(({ id }) => id === approveId)}
          />
        )}
      </Fragment>
    );
  }

  componentWillUnmount() {
    !!this.props.setActions && this.props.setActions([]);
  }
}

export default AlertFeed;
