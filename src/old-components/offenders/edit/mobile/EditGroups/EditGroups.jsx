import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { Query } from 'react-apollo';
import { isEqual } from 'lodash-es';

import { FullWidthButton } from '../../../../global/actions';
import { Header, HeaderText } from '../../../../global/forms';
import { GroupSkeleton } from '../../../../global/skeletons';
import AllGroups from '../../../../../graphql/groups/AllGroupsQuery';

const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 60px;
`;
const List = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const ListItem = styled.div`
  display: flex;
  align-items: center;
  margin: 3px 0;
  cursor: pointer;
  border-bottom: 1px solid #eeeeee;
  height: 50px;
  padding: 0 20px;
`;
const ItemText = styled(Typography)`
  margin: 0;
  font-size: 14px;
  flex: 1;
  padding-left: 15px;
  height: 50px;
  display: flex;
  align-items: center;
`;
const Svg = styled.svg`
  height: 30px;
  width: 30px;
`;
const Text = styled(Typography)`
  margin: 0px;
`;
const TipText = styled(Typography)`
  text-align: center;
  color: #ef5350;
`;

const initialState = {
  id: '',
  selectedGroups: [],
  removedGroups: [],
  addedGroups: [],
  error: null
};

class Groups extends PureComponent {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    this.props.setBackLinkTo(this.props.basePath);
    if (!isEqual(this.props.offender, {})) {
      const {
        offender: { id, groups }
      } = this.props;
      this.setState({
        id,
        selectedGroups: groups.map(({ id }) => id)
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(this.props.offender, {}) && isEqual(prevState, initialState)) {
      const {
        offender: { id, groups }
      } = this.props;
      this.setState({
        id,
        selectedGroups: groups.map(({ id }) => id)
      });
    }
  }

  toggleSelectedGroups = group => {
    const { selectedGroups, removedGroups, addedGroups } = this.state;
    if (selectedGroups.indexOf(group) === -1) {
      this.setState({
        selectedGroups: [...selectedGroups, group],
        addedGroups: [...addedGroups, group],
        removedGroups: removedGroups.filter(id => id !== group)
      });
    } else {
      this.setState({
        selectedGroups: selectedGroups.filter(id => id !== group),
        addedGroups: addedGroups.filter(id => id !== group),
        removedGroups: [...removedGroups, group]
      });
    }
  };

  validate = () =>
    new Promise((resolve, reject) => {
      let errors = [];

      if (this.state.selectedGroups.length === 0) {
        this.setState({
          error: 'Please select at least one group.'
        });
        errors.push('Please select at least one group.');
      } else {
        this.state.error !== null &&
          this.setState({
            error: null
          });
      }

      return errors.length ? reject(errors) : resolve();
    });

  saveOffender = groups => {
    const { id, selectedGroups, removedGroups, addedGroups } = this.state;
    this.props.editOffender({
      variables: {
        id,
        groups:
          addedGroups.length > 0 ? addedGroups.map(id => ({ id })) : undefined,
        removeGroups:
          removedGroups.length > 0
            ? removedGroups.map(id => ({ id }))
            : undefined
      },
      optimisticResponse: {
        updateOffender: {
          ...this.props.offender,
          groups: groups.filter(({ id }) => selectedGroups.includes(id))
        }
      }
    });
  };

  handleSave = groups => {
    this.validate()
      .then(() => {
        this.saveOffender(groups);
        this.props.history.push(this.props.basePath);
      })
      .catch(error => {});
  };

  render() {
    const { loadingOffender, userId, admin } = this.props;
    const { selectedGroups } = this.state;

    return (
      <Query
        query={AllGroups}
        variables={{
          schemeId: window.localStorage.getItem('currentScheme'),
          user: admin ? undefined : { some: { id: { equals: userId } } }
        }}
        errorPolicy="ignore"
        fetchPolicy="cache-and-network"
      >
        {({ data, loading }) => {
          return (
            <Page>
              <Header>
                <HeaderText>Edit Groups</HeaderText>
                <Text>
                  Please select the groups that you would like this offender to
                  be visible to.
                </Text>
              </Header>
              {selectedGroups !== undefined &&
                selectedGroups.length === 0 && (
                  <TipText>Please select at least one group</TipText>
                )}
              {loading || loadingOffender ? (
                <List>
                  <GroupSkeleton />
                  <GroupSkeleton />
                  <GroupSkeleton />
                </List>
              ) : (
                <List>
                  {!!data &&
                    !!data.groups &&
                    data.groups.map(({ id, name }) => (
                      <ListItem
                        key={id}
                        onClick={() => this.toggleSelectedGroups(id)}
                      >
                        <Svg viewBox="0 0 24 24">
                          <path
                            fill={
                              selectedGroups.includes(id)
                                ? '#1E88E5'
                                : '#E0E0E0'
                            }
                            d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"
                          />
                        </Svg>
                        <ItemText>{name}</ItemText>
                      </ListItem>
                    ))}
                </List>
              )}
              <FullWidthButton
                text="Save Groups"
                disabled={loading || selectedGroups.length === 0}
                onClick={() => this.handleSave(selectedGroups)}
              />
            </Page>
          );
        }}
      </Query>
    );
  }

  componentWillUnmount() {
    this.props.setBackLinkTo('');
  }
}

export default Groups;
