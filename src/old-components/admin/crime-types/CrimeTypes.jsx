import React, { Component } from "react";
import styled from "styled-components";
import { Route } from "react-router-dom";
import { APP_PREFIX_PATH } from "configs/AppConfig";

import CrimeTypeList from "./CrimeTypeList";
import AddCrimeType from "./AddCrimeType";
import EditCrimeType from "./EditCrimeType";

const Page = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
`;

class CrimeTypes extends Component {
  render() {
    const { setActions } = this.props;
    return (
      <Page>
        <Route
          exact
          path={`${APP_PREFIX_PATH}/scheme-settings/crime-types`}
          component={CrimeTypeList}
        />
        <Route
          path={`${APP_PREFIX_PATH}/scheme-settings/crime-types/add`}
          component={AddCrimeType}
        />
        <Route
          path={`${APP_PREFIX_PATH}/scheme-settings/crime-types/view/:id`}
          render={(router) => (
            <EditCrimeType setActions={setActions} {...router} />
          )}
        />
      </Page>
    );
  }
}

export default CrimeTypes;
