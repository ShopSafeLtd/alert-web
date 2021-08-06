import React, { PureComponent } from 'react';
import styled from 'styled-components';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import AlertCardImages from '../../../feed/AlertCardImages/AlertCardImages';
import ViewDescription from '../ViewDescription/ViewDescription';
import ViewLocation from '../ViewLocation/ViewLocation';
import ViewOffenders from '../ViewOffenders/ViewOffenders';

const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;
const StyledTab = styled(Tab)`
  background-color: #fff;
  flex: 1;
`;

class ViewIncidentMobile extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0
    };
  }

  render() {
    const { incident } = this.props;
    const { activeTab } = this.state;
    return (
      <Page>
        <AlertCardImages images={incident.images} />
        <Tabs
          value={activeTab}
          onChange={(e, value) => this.setState({ activeTab: value })}
          indicatorColor="primary"
          textColor="primary"
          fullWidth
        >
          <StyledTab
            classes={{ root: { minWidth: 'none' } }}
            label="Description"
          />
          <StyledTab label="Location" />
          <StyledTab label="Offenders" />
        </Tabs>
        <SwipeableViews
          index={activeTab}
          onChangeIndex={e => this.setState({ activeTab: e })}
        >
          <div>
            <ViewDescription
              subject={incident.subject}
              date={incident.date}
              time={incident.time}
              crimeTypes={incident.crimeTypes}
              description={incident.description}
              user={incident.user}
            />
          </div>
          <div>
            <ViewLocation location={incident.address} />
          </div>
          <div>
            <ViewOffenders offenders={incident.offenders} />
          </div>
        </SwipeableViews>
      </Page>
    );
  }
}

export default ViewIncidentMobile;
