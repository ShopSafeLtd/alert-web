import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Route, withRouter } from 'react-router-dom';

import AddImagesList from '../AddImagesList/AddImagesList';
import AssignOffenders from '../AssignOffenders/AssignOffenders';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

class AddImages extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: {
        offendersIds: []
      }
    };
  }

  setCurrentImage = offender =>
    this.setState({
      currentImage: offender
    });

  render() {
    const {
      images,
      uploadImage,
      uploading,
      offenders,
      removeImage,
      assignImageToOffenders,
      setBackLinkTo,
      setNavbarAction,
      submit,
      uploadMobileImage,
      validateImages,
      setAssign,
      groups
    } = this.props;
    const { currentImage } = this.state;
    return (
      <Page>
        <Route
          exact
          path="/incidents/add/images"
          render={({ history }) => (
            <AddImagesList
              images={images}
              uploading={uploading}
              addImage={uploadImage}
              offenders={offenders}
              removeImages={removeImage}
              history={history}
              setCurrentImage={this.setCurrentImage}
              setBackLinkTo={setBackLinkTo}
              setNavbarAction={setNavbarAction}
              submit={submit}
              uploadMobileImage={uploadMobileImage}
              validateImages={validateImages}
              setAssign={setAssign}
              groups={groups}
            />
          )}
        />
        <Route
          path="/incidents/add/images/assign-offenders"
          render={({ history }) => (
            <AssignOffenders
              offenders={offenders}
              assignOffendersToImages={assignImageToOffenders}
              currentImage={currentImage}
              history={history}
              setBackLinkTo={setBackLinkTo}
              setNavbarAction={setNavbarAction}
            />
          )}
        />
      </Page>
    );
  }
}

export default withRouter(AddImages);
