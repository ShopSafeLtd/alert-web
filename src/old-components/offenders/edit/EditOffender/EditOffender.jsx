import React, { Component } from "react";
import MediaQuery from "react-responsive";

import EditDesktop from "../desktop/EditDesktop/EditDesktop";

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
      history,
      match: {
        params: { id },
      },
    } = this.props;

    return <EditDesktop id={id} userId={userId} history={history} />;
  }
}

export default EditOffender;
