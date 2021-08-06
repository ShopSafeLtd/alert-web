import React, { Component } from 'react';
import MediaQuery from 'react-responsive';

import EditDesktop from '../desktop/EditDesktop/EditDesktop';
import EditMobile from '../mobile/EditMobile/EditMobile';

class EditOffender extends Component {
  render() {
    const {
      offenderId,
      setBackLinkTo,
      setBottomNav,
      setNavbarAction,
      setTitle,
      offender,
      loading,
      setStatusBar,
      createImage,
      editOffender,
      addImage,
      removeImage,
      addExclusion,
      allOffenderWarnings,
      userId,
      labelsLoading,
      addWarningLabel,
      setNavbarActionDisabled,
      toggleNotificationBar,
      setActions,
      history
    } = this.props;

    return (
      <MediaQuery minDeviceWidth={1024}>
        {matches =>
          matches ? (
            <EditDesktop id={offenderId} userId={userId} history={history} />
          ) : (
            <EditMobile
              offenderId={offenderId}
              setBackLinkTo={setBackLinkTo}
              setBottomNav={setBottomNav}
              setNavbarAction={setNavbarAction}
              setTitle={setTitle}
              offender={offender}
              loading={loading}
              editOffender={editOffender}
              offenderLabels={allOffenderWarnings}
              labelsLoading={labelsLoading}
              addWarningLabel={addWarningLabel}
              addImage={addImage}
              removeImage={removeImage}
              createImage={createImage}
              setNavbarActionDisabled={setNavbarActionDisabled}
              setStatusBar={setStatusBar}
              addExclusion={addExclusion}
              userId={userId}
              toggleNotificationBar={toggleNotificationBar}
              setActions={setActions}
            />
          )
        }
      </MediaQuery>
    );
  }
}

export default EditOffender;
