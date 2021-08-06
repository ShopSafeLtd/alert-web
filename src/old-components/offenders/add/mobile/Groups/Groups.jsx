import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';

import GroupList from '../GroupList/GroupList';
import AddGroup from '../AddGroup/AddGroup';

const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 60px;
`;

class Groups extends PureComponent {
  render() {
    const {
      selectedGroups,
      toggleSelectedGroups,
      disabled,
      loading,
      groups,
      admin,
      setNavbarAction,
      setBackLinkTo,
      warnings,
      handlePost,
      history
    } = this.props;
    return (
      <Page>
        <Route
          exact
          path="/offenders/add/groups"
          render={() => (
            <GroupList
              selectedGroups={selectedGroups}
              toggleSelectedGroups={toggleSelectedGroups}
              disabled={disabled}
              loading={loading}
              groups={groups}
              admin={admin}
              setNavbarAction={setNavbarAction}
              setBackLinkTo={setBackLinkTo}
              warnings={warnings}
              handlePost={handlePost}
              history={history}
            />
          )}
        />
        <Route
          path="/offenders/add/groups/add"
          render={() => (
            <AddGroup
              setNavbarAction={setNavbarAction}
              setBackLinkTo={setBackLinkTo}
            />
          )}
        />
      </Page>
    );
  }
}

export default Groups;
