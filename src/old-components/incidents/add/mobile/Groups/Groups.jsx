import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';

import GroupList from '../GroupList/GroupList';
import AddGroup from '../AddGroup/AddGroup';

const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

class Groups extends PureComponent {
  render() {
    const {
      setBackLinkTo,
      setNavbarAction,
      handleSubmit,
      groups,
      groupsList,
      toggleGroups,
      disabled,
      loading,
      schemeAdmin
    } = this.props;
    return (
      <Page>
        <Route
          exact
          path="/incidents/add/groups"
          render={() => (
            <GroupList
              selectedGroups={groups}
              toggleSelectedGroups={toggleGroups}
              disabled={disabled}
              loading={loading}
              groups={groupsList}
              handlePost={handleSubmit}
              setBackLinkTo={setBackLinkTo}
              setNavbarAction={setNavbarAction}
              schemeAdmin={schemeAdmin}
            />
          )}
        />
        <Route
          path="/incidents/add/groups/new"
          render={() => (
            <AddGroup
              setBackLinkTo={setBackLinkTo}
              setNavbarAction={setNavbarAction}
            />
          )}
        />
      </Page>
    );
  }

  componentWillUnmount() {
    this.props.setNavbarAction('default');
    this.props.setBackLinkTo('');
  }
}

export default Groups;
