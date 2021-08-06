import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Route, withRouter } from 'react-router-dom';

import ImagesList from '../ImagesList/ImagesList';
import AssignOffenders from '../AssignOffenders/AssignOffenders';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

class EditImages extends PureComponent {
  render() {
    const {
      incidentId,
      loading,
      setBackLinkTo,
      basePath,
      setNavbarActionDisabled,
      images,
      offenders,
      uploadImage,
      uploadMobileImage,
      uploadingImage,
      updateIncident
    } = this.props;
    return (
      <Page>
        <Route
          exact
          path="/incidents/edit/:id/images"
          render={({ history }) => (
            <ImagesList
              history={history}
              basePath={basePath}
              images={images}
              offenders={offenders}
              setBackLinkTo={setBackLinkTo}
              removeImage={this.removeImage}
              removeOffenderFromImage={this.removeOffenderFromImage}
              incidentId={incidentId}
              loadingIncident={loading}
              setNavbarActionDisabled={setNavbarActionDisabled}
              uploadImage={uploadImage}
              uploadMobileImage={uploadMobileImage}
              uploadingImage={uploadingImage}
              updateIncident={updateIncident}
            />
          )}
        />
        <Route
          path="/incidents/edit/:id/images/:imageId/assign-offenders"
          render={({ history, match }) => (
            <AssignOffenders
              history={history}
              basePath={basePath}
              offenders={offenders}
              setBackLinkTo={setBackLinkTo}
              match={match}
              loadingIncident={loading}
              addImageToOffender={this.addImageToOffender}
              incidentId={incidentId}
              updateIncident={updateIncident}
            />
          )}
        />
      </Page>
    );
  }
}

export default withRouter(EditImages);
