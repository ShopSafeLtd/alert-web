import React, { Component } from "react";

import EditDesktop from "../desktop/EditDesktop/EditDesktop";

class EditOffender extends Component {
  render() {
    const {
      userId,
      history,
      match: {
        params: { id },
      },
    } = this.props;

    return <EditDesktop id={id} userId={userId} history={history} />;
  }
}

export default EditOffender;
