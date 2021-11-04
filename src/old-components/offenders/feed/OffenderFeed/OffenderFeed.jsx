import React, { Fragment } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { Input } from 'antd';
import {
  SearchOutlined,
  FilterOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';

import OffenderCard from '../OffenderCard/OffenderCard';
import {
  FeedContainer,
  FeedCardContainer,
  SkeletonContainer,
} from '../../../global/feed';
import { PullToRefresh } from '../../../global/pullToRefresh';
import { Card } from '../../../global/cards';
import { EmptyState } from '../../../global/emptyStates';
import DeleteOffenderModal from '../DeleteOffenderModal/DeleteOffenderModal';
import AddExclusionPopOver from '../../global/AddExclusionPopOver/AddExclusionPopOver';
import ViewExclusionPopOver from '../../global/ViewExclusionPopOver/ViewExclusionPopOver';
import ViewIncidentPopOver from '../ViewIncidentPopOver/ViewIncidentPopOver';
import UnapprovedCardGroups from '../../../global/cards/UnapprovedCardGroups/UnapprovedCardGroups';
import OffenderFilter from '../OffenderFilter/OffenderFilter';
import ViewOffenderPopOver from '../ViewOffenderPopOver/ViewOffenderPopOver';
import LabelModal from '../LabelModal/LabelModal';
import ActiveOffenderModal from '../ActiveOffenderModal/ActiveOffenderModal';
import InactiveOffenderModal from '../InactiveOffenderModal/InactiveOffenderModal';
import OffenderSkeletonCard from '../OffenderSkeletonCard/OffenderSkeletonCard';
import DeclineDialog from '../DeclineDialog/DeclineDialog';
import Offenders from '../../../../images/Offenders';
import LightBox from 'old-components/global/LightBox/LightBox';

const EmptyContainer = styled.div`
  height: calc(100vh - 167px);
  display: flex;
  align-items: center;
`;

class OffenderFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteOffenderModal: false,
      deleteOffenderId: '',
      declineOffenderDialog: false,
      declineOffenderId: '',
      disabled: false,
      addExclusionPopOver: false,
      addExclusionId: '',
      viewExclusionPopOver: false,
      viewExclusionId: '',
      viewExclusionOffender: '',
      viewIncidentPopOver: false,
      viewIncidentId: '',
      approve: false,
      approveId: '',
      approveGroups: [],
      pristine: true,
      viewOffenderPopOver: false,
      viewOffender: {
        images: [],
        age: 'UNKNOWN',
        build: 'UNKNOWN',
        race: 'UNKNOWN',
        gender: 'UNKNOWN',
        exclusions: [],
        incidents: [],
      },
      viewLabel: false,
      label: {
        name: '',
        helpText: '',
      },
      activeOffenderModal: false,
      activeOffenderId: '',
      inactiveOffenderModal: false,
      inactiveOffenderId: '',
      filterOpen: false,
    };
  }

  componentDidUpdate() {
    this.props.offenders !== undefined &&
      this.props.offenders.length > 0 &&
      this.state.pristine &&
      this.setState({
        pristine: false,
      });
  }

  setExcluded = (value) => {
    this.setState({
      excluded: value,
    });
  };

  toggleDeleteOffenderModal = (id) =>
    this.setState({
      deleteOffenderModal: !this.state.deleteOffenderModal,
      deleteOffenderId: id || '',
    });

  toggleDeclineOffender = (id) =>
    this.setState({
      declineOffenderDialog: !this.state.declineOffenderDialog,
      declineOffenderId: id || '',
    });

  toggleAddExclusionPopOver = (id) =>
    this.setState({
      addExclusionPopOver: !this.state.addExclusionPopOver,
      addExclusionId: id || '',
    });

  toggleViewExclusionPopOver = (exclusion, offender) =>
    this.setState({
      viewExclusionPopOver: !this.state.viewExclusionPopOver,
      viewExclusionId: exclusion || '',
      viewExclusionOffender: offender || '',
    });

  toggleIncidentPopOver = (incident) => {
    if (incident !== undefined) {
      this.setState({
        viewIncidentPopOver: !this.state.viewIncidentPopOver,
        viewIncidentId: incident,
      });
    } else {
      this.setState({
        viewIncidentPopOver: !this.state.viewIncidentPopOver,
        viewIncidentId: '',
      });
    }
  };

  toggleApprove = (id, offenders) =>
    this.setState({
      approve: !this.state.approve,
      approveId: id || '',
      approveGroups: [],
      approveOffenders: offenders,
    });

  toggleApproveGroups = (id) => {
    const { approveGroups } = this.state;
    if (approveGroups.indexOf(id) === -1) {
      this.setState({
        approveGroups: [...approveGroups, id],
      });
    } else {
      let newSelected = approveGroups.filter((item) => {
        return item !== id;
      });
      this.setState({
        approveGroups: newSelected,
      });
    }
  };

  toggleViewOffenderPopOver = (offender) =>
    this.setState({
      viewOffenderPopOver: !this.state.viewOffenderPopOver,
      viewOffender:
        offender !== undefined
          ? offender
          : {
              images: [],
              age: 'UNKNOWN',
              build: 'UNKNOWN',
              race: 'UNKNOWN',
              gender: 'UNKNOWN',
              exclusions: [],
              incidents: [],
            },
    });

  toggleViewLabel = (label) =>
    this.setState({
      viewLabel: !this.state.viewLabel,
      label:
        label !== undefined
          ? label
          : {
              name: '',
              helpText: '',
            },
    });

  toggleActiveOffender = (offender) => {
    this.setState({
      activeOffenderModal: !this.state.activeOffenderModal,
      activeOffenderId: offender !== undefined ? offender : '',
    });
  };

  toggleInactiveOffender = (offender) => {
    this.setState({
      inactiveOffenderModal: !this.state.inactiveOffenderModal,
      inactiveOffenderId: offender !== undefined ? offender : '',
    });
  };

  render() {
    const {
      setStatusBar,
      userId,
      deleteOffender,
      loading,
      offenders,
      approveOffender,
      loadMore,
      search,
      admin,
      markOffenderActive,
      loadingMore,
      networkError,
      retryLoad,
      refetch,
      filterPristine,
      role,
      searchInput,
      setSearchInput,
      filter,
      setFilter,
      order,
      setOrder,
      setQueryVariables,

      tags,
      groups,
    } = this.props;
    const {
      deleteOffenderModal,
      deleteOffenderId,
      declineOffenderDialog,
      declineOffenderId,
      addExclusionPopOver,
      addExclusionId,
      viewExclusionPopOver,
      viewExclusionId,
      viewExclusionOffender,
      viewIncidentPopOver,
      viewIncidentId,
      approve,
      approveId,
      approveGroups,
      viewOffenderPopOver,
      viewOffender,
      viewLabel,
      label,
      disabled,
      activeOffenderModal,
      activeOffenderId,
      inactiveOffenderModal,
      inactiveOffenderId,
      filterOpen,
    } = this.state;

    const handleDelete = async () => {
      console.log({
        variables: {
          id: deleteOffenderId,
        },
      });
      setStatusBar(true, 'Deleting Offender...');
      this.setState({
        disabled: true,
      });
      await deleteOffender({
        variables: {
          where: {
            id: deleteOffenderId,
          },
        },
        optimisticResponse: {
          recycleOffender: {
            id: deleteOffenderId,
            optimistic: true,
            __typename: 'Offender',
          },
        },
      });
      this.setState({
        disabled: false,
      });
      setStatusBar(false, '');
    };

    const handleApprove = async (groups) => {
      setStatusBar(true, 'Approving Offender...');
      const add = groups
        .filter(
          (id) =>
            !offenders
              .find(({ id }) => id === approveId)
              .groups.map(({ id }) => id)
              .includes(id)
        )
        .map((id) => ({ id }));
      const remove = offenders
        .find(({ id }) => id === approveId)
        .groups.map(({ id }) => id)
        .filter((id) => !groups.includes(id))
        .map((id) => ({ id }));

      await approveOffender({
        variables: {
          where: {
            id: approveId,
          },
          data: {
            groups: {
              connect: add.length > 0 ? add : undefined,
              disconnect: remove.length > 0 ? remove : undefined,
            },
          },
        },
      });
      setStatusBar(false, '');
      this.setState({ approve: false, approveId: '' });
    };

    const handleDecline = async () => {
      setStatusBar(true, 'Deleting Offender...');
      this.setState({
        disabled: true,
      });
      await deleteOffender({
        variables: {
          where: {
            id: declineOffenderId,
          },
        },
        optimisticResponse: {
          recycleOffender: {
            id: declineOffenderId,
            optimistic: true,
            __typename: 'Offender',
          },
        },
      });
      this.toggleDeclineOffender();
      this.setState({
        disabled: false,
      });
      setStatusBar(false, '');
    };

    console.log(!!offenders, offenders?.length === 0, loading )

    return (
      <>
        {/* search and filter bar */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '35%',
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
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: 16,
            }}
            onClick={() => this.setState({ filterOpen: true })}
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
        {/* end search and filter bar */}
        {!!offenders && offenders?.length === 0 && loading ? (
          <FeedContainer to="/app/offenders/add" text="Offender">
            <PullToRefresh onRefresh={refetch}>
              <FeedCardContainer>
                <SkeletonContainer cardHeight="500px">
                  <OffenderSkeletonCard />
                </SkeletonContainer>
              </FeedCardContainer>
              <OffenderFilter
                open={filterOpen}
                handleClose={() => this.setState({ filterOpen: false })}
                order={order}
                setOrder={setOrder}
                filter={filter}
                setFilter={setFilter}
                setQueryVariables={setQueryVariables}
                tags={tags}
                groups={groups}
              />
            </PullToRefresh>
            <LightBox />
          </FeedContainer>
        ) : !!offenders && offenders?.length > 0 ? (
          <Fragment>
            <FeedContainer
              to="/app/offenders/add"
              loadMore={loadMore}
              text="Offender"
              loading={loadingMore}
              networkError={networkError}
              retryLoad={retryLoad}
            >
              <PullToRefresh onRefresh={refetch}>
                <FeedCardContainer>
                  {offenders.map((offender) => (
                    <Card key={offender.id} height="500px">
                      <OffenderCard
                        key={offender.id}
                        offender={offender}
                        toggleDeleteOffenderModal={
                          this.toggleDeleteOffenderModal
                        }
                        toggleDecline={this.toggleDeclineOffender}
                        toggleDeleteExclusionModal={
                          this.toggleDeleteExclusionModal
                        }
                        toggleAddExclusionPopOver={
                          this.toggleAddExclusionPopOver
                        }
                        toggleViewExclusionPopOver={
                          this.toggleViewExclusionPopOver
                        }
                        toggleIncidentPopOver={this.toggleIncidentPopOver}
                        toggleApprove={this.toggleApprove}
                        toggleViewOffenderPopOver={
                          this.toggleViewOffenderPopOver
                        }
                        toggleViewLabel={this.toggleViewLabel}
                        toggleActiveOffender={this.toggleActiveOffender}
                        toggleInactiveOffender={this.toggleInactiveOffender}
                        admin={admin}
                      />
                    </Card>
                  ))}
                </FeedCardContainer>
              </PullToRefresh>
            </FeedContainer>
            <DeleteOffenderModal
              visible={deleteOffenderModal}
              close={this.toggleDeleteOffenderModal}
              handleDelete={handleDelete}
              disabled={disabled}
            />
            <DeclineDialog
              open={declineOffenderDialog}
              close={this.toggleDeclineOffender}
              handleDecline={handleDecline}
            />
            <AddExclusionPopOver
              visible={addExclusionPopOver}
              close={this.toggleAddExclusionPopOver}
              offenderId={addExclusionId}
              filter={filter}
              admin={admin}
              search={search}
              userId={userId}
              role={role}
            />
            <ViewExclusionPopOver
              visible={viewExclusionPopOver}
              close={this.toggleViewExclusionPopOver}
              exclusionId={viewExclusionId}
              offenderId={viewExclusionOffender}
              filter={filter}
              admin={admin}
              search={search}
              userId={userId}
            />
            <ViewIncidentPopOver
              visible={viewIncidentPopOver}
              close={this.toggleIncidentPopOver}
              incidentId={viewIncidentId}
            />
            <UnapprovedCardGroups
              visible={approve}
              cancel={this.toggleApprove}
              toggle={this.toggleApproveGroups}
              selected={approveGroups}
              approve={handleApprove}
              offender={offenders?.find(({ id }) => id === approveId)}
            />
            <ViewOffenderPopOver
              visible={viewOffenderPopOver}
              close={this.toggleViewOffenderPopOver}
              offender={viewOffender}
              admin={admin}
            />
            <LabelModal
              visible={viewLabel}
              close={this.toggleViewLabel}
              label={label}
            />
            <ActiveOffenderModal
              open={activeOffenderModal}
              close={this.toggleActiveOffender}
              offenderId={activeOffenderId}
              markOffenderActive={markOffenderActive}
            />
            <InactiveOffenderModal
              open={inactiveOffenderModal}
              close={this.toggleInactiveOffender}
              offenderId={inactiveOffenderId}
              markOffenderActive={markOffenderActive}
            />
            <OffenderFilter
              open={filterOpen}
              handleClose={() => this.setState({ filterOpen: false })}
              order={order}
              setOrder={setOrder}
              filter={filter}
              setFilter={setFilter}
              setQueryVariables={setQueryVariables}
              tags={tags}
              groups={groups}
            />
            <LightBox />
          </Fragment>
        ) : filterPristine ? (
          <FeedContainer to="/app/offenders/add" text="Offender">
            <PullToRefresh onRefresh={refetch}>
              <EmptyContainer>
                <EmptyState
                  image={<Offenders height="96px" width="96px" />}
                  text="There are currently no active offenders."
                  actions={[
                    <Button
                      variant="contained"
                      color="primary"
                      component={Link}
                      to="/app/offenders/add"
                    >
                      Add First Offender
                    </Button>,
                  ]}
                />
              </EmptyContainer>
              <OffenderFilter
                open={filterOpen}
                handleClose={() => this.setState({ filterOpen: false })}
                order={order}
                setOrder={setOrder}
                filter={filter}
                setFilter={setFilter}
                setQueryVariables={setQueryVariables}
                tags={tags}
                groups={groups}
              />
            </PullToRefresh>
            <LightBox />
          </FeedContainer>
        ) : (
          <FeedContainer to="/app/offenders/add" text="Offender">
            <PullToRefresh onRefresh={refetch}>
              <EmptyContainer>
                <EmptyState
                  image={<Offenders height="96px" width="96px" />}
                  text="We could not find any offenders that match."
                  actions={[
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => this.setState({ filterOpen: true })}
                    >
                      Change Filter
                    </Button>,
                  ]}
                />
              </EmptyContainer>
              <OffenderFilter
                open={filterOpen}
                handleClose={() => this.setState({ filterOpen: false })}
                order={order}
                setOrder={setOrder}
                filter={filter}
                setFilter={setFilter}
                setQueryVariables={setQueryVariables}
                tags={tags}
                groups={groups}
              />
            </PullToRefresh>
            <LightBox />
          </FeedContainer>
        )}
      </>
    );
  }

  componentWillUnmount() {
    // this.props.toggleFetchOffenders(true);
    !!this.props.setActions && this.props.setActions([]);
  }
}

export default OffenderFeed;
