import React, { useState } from "react";
import styled from "styled-components";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";

import { UnapprovedCard, CardMenu } from "../../../global/cards";
import OffenderCardImage from "../OffenderCardImage/OffenderCardImage";
import OffenderCardDescription from "../OffenderCardDescription/OffenderCardDescription";
import OffenderCardIncidents from "../OffenderCardIncidents/OffenderCardIncidents";
import OffenderCardExclusions from "../OffenderCardExclusions/OffenderCardExclusions";
import { isAuthorised } from "utils";
import BannedBanner from "../BannedBanner/BannedBanner";
import ActiveBanner from "../ActiveBanner/ActiveBanner";
import { useStoreState } from "../../../../state";

const Card = styled.div`
  width: 100%;
  height: 100%;
`;
const StyledTab = styled(Tab)`
  min-width: 0px !important;
`;
const DeleteItem = styled(MenuItem)`
  color: #ef5350;
`;
const Svg = styled.svg`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const OffenderCard = ({
  offender,
  toggleDeleteOffenderModal,
  toggleDeleteExclusionModal,
  toggleAddExclusionPopOver,
  toggleViewExclusionPopOver,
  toggleIncidentPopOver,
  toggleApprove,
  toggleViewOffenderPopOver,
  toggleViewLabel,
  toggleActiveOffender,
  toggleInactiveOffender,
  toggleDecline,
}) => {
  const userRole = useStoreState((state) => state.user.role);
  const admin = userRole !== "USER" ? true : false;
  const [activeTab, setActiveTab] = useState(0);

  let actions = [];
  if (isAuthorised(userRole, ["SCHEME_ADMIN", "CONTENT_ADMIN"])) {
    actions.push(
      <MenuItem key={0} onClick={() => toggleAddExclusionPopOver(offender.id)}>
        <Svg viewBox="0 0 24 24">
          <path
            fill="#757575"
            d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12C4,13.85 4.63,15.55 5.68,16.91L16.91,5.68C15.55,4.63 13.85,4 12,4M12,20A8,8 0 0,0 20,12C20,10.15 19.37,8.45 18.32,7.09L7.09,18.32C8.45,19.37 10.15,20 12,20Z"
          />
        </Svg>
        Add Ban
      </MenuItem>
    );
  }
  if (
    isAuthorised(userRole, ["SCHEME_ADMIN", "CONTENT_ADMIN"]) &&
    !offender.active
  ) {
    actions.push(
      <MenuItem key={1} onClick={() => toggleActiveOffender(offender.id)}>
        <Svg viewBox="0 0 24 24">
          <path
            fill="#757575"
            d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z"
          />
        </Svg>
        Mark as Active
      </MenuItem>
    );
  }
  // if (
  //   isAuthorised(userRole, ["SCHEME_ADMIN", "CONTENT_ADMIN"]) &&
  //   offender.active
  // ) {
  //   actions.push(
  //     <MenuItem key={1} onClick={() => toggleInactiveOffender(offender.id)}>
  //       <Svg viewBox="0 0 24 24">
  //         <path
  //           fill="#757575"
  //           d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7.07,18.28C7.5,17.38 10.12,16.5 12,16.5C13.88,16.5 16.5,17.38 16.93,18.28C15.57,19.36 13.86,20 12,20C10.14,20 8.43,19.36 7.07,18.28M18.36,16.83C16.93,15.09 13.46,14.5 12,14.5C10.54,14.5 7.07,15.09 5.64,16.83C4.62,15.5 4,13.82 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,13.82 19.38,15.5 18.36,16.83M12,6C10.06,6 8.5,7.56 8.5,9.5C8.5,11.44 10.06,13 12,13C13.94,13 15.5,11.44 15.5,9.5C15.5,7.56 13.94,6 12,6M12,11A1.5,1.5 0 0,1 10.5,9.5A1.5,1.5 0 0,1 12,8A1.5,1.5 0 0,1 13.5,9.5A1.5,1.5 0 0,1 12,11Z"
  //         />
  //       </Svg>
  //       Remove from Active
  //     </MenuItem>
  //   );
  // }
  if (isAuthorised(userRole, ["SCHEME_ADMIN", "CONTENT_ADMIN"])) {
    actions.push(
      <Divider key={2} />,
      <MenuItem
        key={4}
        component={Link}
        to={`/app/offenders/edit/${offender.id}`}
      >
        <Svg viewBox="0 0 24 24">
          <path
            fill="#757575"
            d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"
          />
        </Svg>
        Edit Offender
      </MenuItem>,
      <DeleteItem
        key={5}
        onClick={() => toggleDeleteOffenderModal(offender.id)}
      >
        <Svg viewBox="0 0 24 24">
          <path
            fill="#EF5350"
            d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
          />
        </Svg>
        Delete Offender
      </DeleteItem>
    );
  }

  let tabViews = [];
  tabViews.push(
    <div key="0">
      <OffenderCardDescription
        age={offender.age}
        build={offender.build}
        dateOfBirth={offender.ateOfBirth}
        gender={offender.gender}
        name={offender.name}
        race={offender.race}
        viewAll={() =>
          toggleViewOffenderPopOver({
            ...offender,
            incidents: offender.incidents,
          })
        }
        offenderWarnings={offender.offenderWarnings}
        toggleViewLabel={toggleViewLabel}
      />
    </div>
  );
  admin &&
    tabViews.push(
      <div key="1">
        <OffenderCardExclusions
          exclusions={offender.bans}
          openExclusion={toggleViewExclusionPopOver}
          openDeleteExclusion={toggleDeleteExclusionModal}
          offenderId={offender.id}
        />
      </div>
    );
  tabViews.push(
    <div key="2">
      <OffenderCardIncidents
        incidents={offender.incidents || []}
        toggleOpen={toggleIncidentPopOver}
      />
    </div>
  );

  return (
    <Card>
      <BannedBanner
        banned={
          !!offender.bans &&
          offender.bans.filter(({ active }) => active).length > 0
        }
        large={offender.active}
      />
      {/* <ActiveBanner active={offender.active} /> */}
      {offender.approved ? null : (
        <UnapprovedCard
          decline={() => toggleDecline(offender.id)}
          alertId={offender.id}
          overlayButtonText="View and Approve Offender"
          optionsTop="227px"
          toggleApprove={() => toggleApprove(offender.id)}
          admin={!admin}
        />
      )}
      {admin && <CardMenu actions={actions} />}
      <OffenderCardImage images={offender.images} />
      <Tabs
        value={activeTab}
        onChange={(e, value) => setActiveTab(value)}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
      >
        <StyledTab label="Details" />
        {admin && <StyledTab label="Bans" />}
        <StyledTab label="Incidents" />
      </Tabs>
      <SwipeableViews index={activeTab} onChangeIndex={(e) => setActiveTab(e)}>
        {tabViews}
      </SwipeableViews>
    </Card>
  );
};

export default OffenderCard;
