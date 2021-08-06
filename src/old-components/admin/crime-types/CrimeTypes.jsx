import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';

import CrimeTypeList from './CrimeTypeList';
import AddCrimeType from './AddCrimeType';
import EditCrimeType from './EditCrimeType';

const Page = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
`;

class CrimeTypes extends PureComponent {
  render() {
    const { setActions } = this.props;
    return (
      <Page>
        <Route exact path="/admin/crime-types" component={CrimeTypeList} />
        <Route path="/admin/crime-types/add" component={AddCrimeType} />
        <Route
          path="/admin/crime-types/edit/:id"
          render={router => (
            <EditCrimeType setActions={setActions} {...router} />
          )}
        />
      </Page>
    );
  }
}

export default CrimeTypes;
