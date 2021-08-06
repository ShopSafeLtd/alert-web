import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Query, Mutation } from 'react-apollo';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import SettignsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import Exclusion from '../../../../../graphql/exclusions/queries/Exclusion';
import { BanSkeleton } from '../../../../global/skeletons';
import { ItemHeader } from '../../../../global/typography';
import { HeaderText, HeaderSubText } from '../../../../global/forms';
import ConfirmDialog from '../../../../global/ConfirmDialog/ConfirmDialog';
import EditMutation from '../../../../../graphql/exclusions/mutations/EditExclusion';

const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const BanDate = styled(Typography)``;
const BanDay = styled(Typography)`
  line-height: 10px;
`;
const DateRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const DateArrow = styled.svg`
  height: 28px;
  width: 28px;
  flex: 1;
`;
const Form = styled.div`
  flex: 1;
  margin-bottom: 60px;
  padding: 20px 40px;
`;
const Header = styled.div`
  margin-bottom: 20px;
`;

class ViewBan extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      confirmActive: false,
      loaded: false,
      confirmDelete: false
    };
  }

  componentDidMount() {
    this.props.setBackLinkTo(`${this.props.basePath}/bans`);
    !!this.props.setActions &&
      this.props.setActions([
        <IconButton
          key={0}
          onClick={this.handleClick}
          aria-owns={this.state.anchorEl ? 'options-menu' : undefined}
          aria-haspopup="true"
          disabled={this.state.loaded}
        >
          <SettignsIcon />
        </IconButton>
      ]);
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const {
      match: {
        params: { banId, id }
      },
      editOffender
    } = this.props;
    const { anchorEl, confirmActive, confirmDelete } = this.state;
    return (
      <Query
        query={Exclusion}
        variables={{ id: banId }}
        fetchPolicy="cache-and-network"
        onCompleted={() => this.setState({ loaded: true })}
      >
        {({ data: { ban }, loading }) => (
          <Page>
            <Menu
              id="options-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              <MenuItem
                onClick={() => this.handleClose()}
                component={Link}
                to={`/offenders/edit/${id}/bans/edit/${banId}`}
              >
                Edit Ban
              </MenuItem>
              <MenuItem
                onClick={() => this.handleClose()}
                component={Link}
                to={`/offenders/edit/${id}/bans/extend/${banId}`}
              >
                Extend Ban
              </MenuItem>
              <MenuItem
                onClick={() => this.handleClose()}
                component={Link}
                to={`/offenders/edit/${id}/bans/reduce/${banId}`}
              >
                Reduce Ban
              </MenuItem>
              {!loading && (
                <MenuItem
                  onClick={() => {
                    this.handleClose();
                    this.setState({ confirmActive: true });
                  }}
                >
                  {ban.active ? 'Deactivate Ban' : 'Activate Ban'}
                </MenuItem>
              )}
              <MenuItem
                onClick={() => {
                  this.handleClose();
                  this.setState({ confirmDelete: true });
                }}
              >
                Delete Ban
              </MenuItem>
            </Menu>
            {!loading ? (
              <Form>
                <Header>
                  <HeaderText>Ban</HeaderText>
                  <HeaderSubText>
                    View the details and history of the ban.
                  </HeaderSubText>
                </Header>
                <ItemHeader>Duration</ItemHeader>
                <DateRow>
                  <div>
                    <BanDay variant="caption">
                      {moment(ban.startDate).format('dddd')}
                    </BanDay>
                    <BanDate variant="subtitle1">
                      {moment(ban.startDate).format('DD/MM/YY')}
                    </BanDate>
                  </div>
                  <DateArrow viewBox="0 0 24 24">
                    <path
                      fill="#EF5350"
                      d="M11,16H3V8H11V2L21,12L11,22V16M13,7V10H5V14H13V17L18,12L13,7Z"
                    />
                  </DateArrow>
                  <div>
                    <BanDay variant="caption">
                      {moment(ban.endDate).format('dddd')}
                    </BanDay>
                    <BanDate variant="subtitle1">
                      {moment(ban.endDate).format('DD/MM/YY')}
                    </BanDate>
                  </div>
                </DateRow>
                <ItemHeader>Location</ItemHeader>
                <Typography>{ban.location}</Typography>
                {ban.description !== '' && <ItemHeader>Description</ItemHeader>}
                <Typography>{ban.description}</Typography>
              </Form>
            ) : (
              <Form>
                <BanSkeleton />
              </Form>
            )}
            {!loading && (
              <Mutation mutation={EditMutation}>
                {markAsInactive => (
                  <ConfirmDialog
                    open={confirmActive}
                    handleClose={() => this.setState({ confirmActive: false })}
                    title="Are You Sure?"
                    description={
                      Exclusion.active
                        ? 'Deactivating this ban will hide it from all users. If this is th only ban for this offender it will no longer be shown as banned.'
                        : 'Activate this ban will show it to all users and the offender will be shown as banned.'
                    }
                    actions={[
                      <Button
                        key={0}
                        onClick={() => this.setState({ confirmActive: false })}
                      >
                        close
                      </Button>,
                      <Button
                        key={1}
                        color="primary"
                        onClick={() => {
                          this.setState({ confirmActive: false });
                          markAsInactive({
                            variables: {
                              id: banId,
                              active: !ban.active
                            },
                            optimisticResponse: {
                              updateExclusion: {
                                ...ban,
                                active: !ban.active
                              }
                            }
                          });
                        }}
                      >
                        Confirm
                      </Button>
                    ]}
                  />
                )}
              </Mutation>
            )}
            <ConfirmDialog
              open={confirmDelete}
              handleClose={() => this.setState({ confirmDelete: false })}
              title="Are You Sure?"
              description="Deleteing this ban will be permanent and cannot be undone."
              actions={[
                <Button
                  key={0}
                  onClick={() => this.setState({ confirmDelete: false })}
                >
                  close
                </Button>,
                <Button
                  key={1}
                  color="primary"
                  onClick={() => {
                    this.setState({ confirmDelete: false });
                    editOffender({
                      variables: {
                        id,
                        removeBans: [{ id: banId }]
                      },
                      optimisticResponse: {
                        deleteExclusion: {
                          id,
                          __typename: 'Exclusion'
                        }
                      }
                    });
                    this.props.history.push(`/offenders/edit/${id}/bans`);
                  }}
                >
                  Confirm
                </Button>
              ]}
            />
          </Page>
        )}
      </Query>
    );
  }

  componentWillUnmount() {
    this.props.setBackLinkTo(``);
    this.props.setActions([]);
  }
}

export default ViewBan;
