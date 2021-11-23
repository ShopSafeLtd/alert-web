import React from 'react';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { Input, Typography } from 'antd';
import {
  SearchOutlined,
  FilterOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';

import {
  FeedContainer,
  FeedCardContainer,
  SkeletonContainer,
} from '../../../global/feed';
import { PullToRefresh } from '../../../global/pullToRefresh';
import { EmptyState } from '../../../global/emptyStates';
import Incidents from 'images/Incidents';
import AlertCard from '../AlertCard/AlertCard';
import SkeletonAlertCard from '../SkeletonAlertCard/SkeletonAlertCard';
import OffenderPopOver from '../OffenderPopOver/OffenderPopOver';
import UnapprovedCardGroups from '../../../global/cards/UnapprovedCardGroups/UnapprovedCardGroups';
import DeclineDialog from '../DeclineDialog/DeclineDialog';
import AlertFilter from '../AlertFilter/AlertFilter';
import LightBox from 'old-components/global/LightBox/LightBox';

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
        images: [],
      },
      approve: false,
      approveId: '',
      approveOffenders: [],
      declineDialog: false,
      filterOpen: false,
    };
  }

  componentDidUpdate(prevProps) {
    this.props.alerts.length > 0 &&
      this.state.pristine &&
      this.setState({
        pristine: false,
      });
  }

  toggleDeleteModal = (id) =>
    this.setState({
      deleteModal: !this.state.deleteModal,
      deleteId: id || '',
    });

  toggleDeclineDialog = (id) =>
    this.setState({
      declineDialog: !this.state.declineDialog,
      declineId: id || '',
    });

  toggleOffenderPopOver = (offender) =>
    this.setState({
      offenderPopOver: !this.state.offenderPopOver,
      currentOffender: offender || { images: [] },
    });

  toggleApprove = (id, offenders) =>
    this.setState({
      approve: !this.state.approve,
      approveId: id || '',
      approveGroups: [],
      approveOffenders: offenders || [],
    });

  approveIncident = (groups) => {
    const { approveId } = this.state;
    const incident = this.props.alerts.find(({ id }) => id === approveId);
    const connect = groups
      .filter((group) => !incident.groups.map(({ id }) => id).includes(group))
      .map((id) => ({ id }));
    const disconnect = incident.groups
      .filter(({ id }) => !groups.includes(id))
      .map(({ id }) => ({ id }));
    this.props.approveIncident({
      variables: {
        where: {
          id: approveId,
        },
        data: {
          groups: {
            connect: connect.length > 0 ? connect : undefined,
            disconnect: disconnect.length > 0 ? disconnect : undefined,
          },
        },
      },
    });
    this.toggleApprove();
  };

  handleDelete = () => {
    this.props.deleteIncident({
      variables: {
        where: {
          id: this.state.deleteId,
        },
      },
      optimisicResponse: {
        id: this.state.deleteId,
        __typename: 'Alert',
      },
    });
    this.toggleDeleteModal();
  };

  handleDecline = async () => {
    this.setState({
      disable: true,
    });
    await this.props.deleteIncident({
      variables: {
        where: {
          id: this.state.declineId,
        },
      },
    });
    this.toggleDeclineDialog();
    this.setState({
      disable: false,
    });
  };

  handleOpenFilter = () => {
    this.setState({ filterOpen: true });
  };

  handleCloseFilter = () => {
    this.setState({ filterOpen: false });
  };

  render() {
    const {
      setStatusBar,
      loading,
      alerts,
      refetch,
      loadMore,
      admin,
      loadingMore,
      networkError,
      retryLoad,
      filterSet,
      searchInput,
      handleSearchChange,
      queryVariables,
      setQueryVariables,
      crimeTypes,
      groups,
    } = this.props;
    const {
      deleteModal,
      offenderPopOver,
      currentOffender,
      approve,
      disable,
      declineDialog,
      filterOpen,
      approveId,
    } = this.state;

    return (
      <div style={{ paddingTop: '25px' }}>
        <AlertFilter
          // state management
          open={filterOpen}
          handleClose={this.handleCloseFilter}
          setQueryVariables={setQueryVariables}
          // data
          crimeTypes={crimeTypes}
          groups={groups}
        />
        {/* search and filter bar */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}
        >
          <div style={{ width: '30%' }}></div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '35%',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Input
                placeholder="Search..."
                size="large"
                prefix={
                  <SearchOutlined
                    style={{
                      fontSize: '22px',
                      color: '#EF5350',
                      marginRight: 10,
                    }}
                  />
                }
                value={searchInput}
                onChange={handleSearchChange}
              />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: 16,
                cursor: 'pointer',
              }}
              onClick={this.handleOpenFilter}
            >
              <FilterOutlined
                style={{
                  fontSize: '28px',
                  color: '#EF5350',
                  marginRight: 5,
                }}
              />
              <ArrowUpOutlined
                style={{
                  fontSize: '21px',
                  color: '#EF5350',
                  marginBottom: 8,
                }}
              />
              <ArrowDownOutlined
                style={{
                  fontSize: '21px',
                  color: '#EF5350',
                  marginTop: 8,
                  marginLeft: -8,
                }}
              />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              cursor: 'pointer',
              userSelect: 'none',
              width: '30%',
            }}
          >
            <div
              onClick={this.handleOpenFilter}
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                userSelect: 'none',
                marginRight: '36px',
              }}
            >
              <Typography.Text>
                {`Order: ${
                  queryVariables.order.createdAt === 'desc'
                    ? 'Most recent first'
                    : 'Oldest first'
                }`}
              </Typography.Text>
              {queryVariables.groups && (
                <div>
                  {`Groups: `}
                  {queryVariables.groups?.map((el) => (
                    <Typography.Text>
                      {`[ ${groups.find((e) => e.id === el).name} ] `}
                    </Typography.Text>
                  ))}
                </div>
              )}
              {queryVariables.crimeTypes && (
                <div>
                  {`Crime Types: `}
                  {queryVariables.crimeTypes?.map((el) => (
                    <Typography.Text>
                      {`[ ${crimeTypes.find((e) => e.id === el).name} ] `}
                    </Typography.Text>
                  ))}
                </div>
              )}
              {queryVariables.approved !== undefined && (
                <Typography.Text>
                  {queryVariables.approved
                    ? 'Approved only'
                    : 'Awaiting approval only'}
                </Typography.Text>
              )}
            </div>
          </div>
        </div>
        {/* end search and filter bar */}
        <FeedContainer
          to="/app/incidents/add"
          loadMore={loadMore}
          loading={loadingMore}
          networkError={networkError}
          text="Incident"
          retryLoad={retryLoad}
        >
          {alerts && alerts.length === 0 && loading ? (
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
                {alerts.map((alert) => {
                  return (
                    <div key={alert.id} className="feed-card">
                      <AlertCard
                        key={alert.id}
                        alert={alert}
                        setStatusBar={setStatusBar}
                        refetch={refetch}
                        toggleDeleteModal={this.toggleDeleteModal}
                        toggleOffenderPopOver={this.toggleOffenderPopOver}
                        toggleApprove={this.toggleApprove}
                        toggleDecline={(id) => this.toggleDeclineDialog(id)}
                        admin={admin}
                      />
                    </div>
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
                    Deleting this incident will add it to the recycle bin for 30
                    days, after which, it will be permanently deleted.
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
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
              <DeclineDialog
                open={declineDialog}
                close={() => this.toggleDeclineDialog()}
                handleDecline={this.handleDecline}
              />
            </PullToRefresh>
          ) : filterSet > 0 || searchInput !== '' ? (
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
                      to="/app/incidents/add"
                    >
                      Add First Incident
                    </Button>,
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
        <LightBox />
      </div>
    );
  }

  componentWillUnmount() {
    !!this.props.setActions && this.props.setActions([]);
  }
}

export default AlertFeed;
