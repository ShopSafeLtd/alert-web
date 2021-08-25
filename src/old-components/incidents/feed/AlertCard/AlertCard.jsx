import React, { Component } from "react";
import styled from "styled-components";
import isEqual from "lodash/isEqual";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import {
  UnapprovedCard,
  CardMenu,
  UploadingOverlay,
} from "../../../global/cards";
import AlertCardImages from "../AlertCardImages/AlertCardImages";
import AlertCardDescription from "../AlertCardDescription/AlertCardDescription";
import AlertCardLocation from "../AlertCardLocation/AlertCardLocation";
import AlertCardOffenders from "../AlertCardOffenders/AlertCardOffenders";
import { isAuthorised } from "utils";
import { useStoreState } from "../../../../state";

const StyledTab = styled(Tab)`
  min-width: 0px !important;
`;
const Card = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
const DeleteItem = styled(MenuItem)`
  color: #ef5350;
`;

const Svg = styled.svg`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

class AlertCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offenderView: false,
      currentOffender: { images: [] },
      activeTab: 0,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!isEqual(this.props.alert, nextProps.alert)) return true;
    if (this.state.deleteModal !== nextState.deleteModal) return true;
    if (this.state.offenderView !== nextState.offenderView) return true;
    if (this.state.currentOffender !== nextState.currentOffender) return true;
    if (this.state.activeTab !== nextState.activeTab) return true;
    return false;
  }

  render() {
    const {
      alert: {
        id,
        approved,
        images,
        subject,
        date,
        time,
        crimeTypes,
        description,
        createdBy,
        location,
        offenders,
        uploaded,
      },
      userRole,
      toggleDeleteModal,
      toggleOffenderPopOver,
      toggleApprove,
      admin,
      toggleDecline,
    } = this.props;
    const { activeTab } = this.state;
    let menuActions = [];

    if (isAuthorised(userRole, ["SCHEME_ADMIN", "CONTENT_ADMIN"])) {
      menuActions.push(
        <MenuItem key="0" component={Link} to={`/app/incidents/edit/${id}`}>
          <Svg viewBox="0 0 24 24">
            <path
              fill="#757575"
              d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"
            />
          </Svg>
          Edit Incident
        </MenuItem>,
        <DeleteItem key="1" onClick={() => toggleDeleteModal(id)}>
          <Svg viewBox="0 0 24 24">
            <path
              fill="#EF5350"
              d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
            />
          </Svg>
          Delete Incident
        </DeleteItem>
      );
    }
    return (
      <Card>
        {approved ? null : (
          <UnapprovedCard
            decline={() => toggleDecline(id)}
            approve={this.approveAlert}
            alertId={id}
            offenders={offenders}
            overlayButtonText="View and Approve Incident"
            optionsTop="182px"
            toggleApprove={() => toggleApprove(id, offenders)}
            admin={admin}
          />
        )}
        {!uploaded && <UploadingOverlay />}
        {menuActions.length > 0 ? <CardMenu actions={menuActions} /> : null}
        <AlertCardImages images={images} />
        <Tabs
          value={activeTab}
          onChange={(e, value) => this.setState({ activeTab: value })}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <StyledTab label="Description" />
          <StyledTab label="Location" />
          <StyledTab label="Offenders" />
        </Tabs>
        <SwipeableViews
          index={activeTab}
          onChangeIndex={(e) => this.setState({ activeTab: e })}
        >
          <div>
            <AlertCardDescription
              subject={subject}
              date={date}
              time={time}
              crimeTypes={crimeTypes}
              description={description}
              user={createdBy}
            />
          </div>
          <div>
            <AlertCardLocation location={location} />
          </div>
          <div>
            <AlertCardOffenders
              offenders={offenders}
              toggleOffenderPopOver={toggleOffenderPopOver}
            />
          </div>
        </SwipeableViews>
      </Card>
    );
  }
}

const Wrapper = (props) => {
  const userRole = useStoreState((state) => state.user.role);

  return <AlertCard userRole={userRole} {...props} />;
};

export default Wrapper;
