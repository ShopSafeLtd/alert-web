import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import SwipeableViews from 'react-swipeable-views';
import EditIcon from '@material-ui/icons/Edit';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import { Link } from 'react-router-dom';

import Details from '../Details/Details';
import Users from '../Users/Users';

const Page = styled.div`
  width: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
`;
const TabContainer = styled(AppBar)`
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12) !important;
  background-color: #fff !important;
`;
const StyledFab = styled(Fab)`
  position: absolute !important;
  bottom: 70px !important;
  right: 10px !important;
`;

class ViewGroupMobile extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0
    };
  }

  componentDidMount() {
    this.props.setTitle(
      this.props.group !== undefined ? this.props.group.name : 'View Group'
    );
    this.props.setNavbarAction('backLink');
    this.props.setMultiAppBar(true);
    this.props.setBackLinkTo('/admin/groups');
  }

  componentDidUpdate() {
    this.props.setTitle(
      this.props.group !== undefined && this.props.group.name
    );
  }

  render() {
    const { groupId, loading, group } = this.props;
    const { activeTab } = this.state;
    const transitionDuration = {
      enter: 225,
      exit: 195
    };
    const fabs = [
      {
        index: 0,
        icon: <EditIcon />,
        to: `/admin/groups/edit/${groupId}`
      },
      {
        index: 1,
        icon: <EditIcon />,
        to: `/admin/groups/users/${groupId}`
      }
    ];

    return (
      <Page>
        <TabContainer position="static" color="default">
          <Tabs
            value={activeTab}
            onChange={(e, value) => this.setState({ activeTab: value })}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Details" />
            <Tab label="Users" />
          </Tabs>
        </TabContainer>
        <SwipeableViews
          index={activeTab}
          onChangeIndex={e => this.setState({ activeTab: e })}
        >
          <Details group={group} loading={loading} />
          <Users group={group} loading={loading} />
        </SwipeableViews>
        {fabs.map(({ index, icon, to }) => (
          <Zoom
            key={index}
            in={activeTab === index}
            timeout={transitionDuration}
            style={{
              transitionDelay: `${
                activeTab === index ? transitionDuration.exit : 0
              }ms`
            }}
          >
            <StyledFab
              color="primary"
              disabled={loading}
              component={Link}
              to={to}
            >
              {icon}
            </StyledFab>
          </Zoom>
        ))}
      </Page>
    );
  }

  componentWillUnmount() {
    this.props.setTitle('');
    this.props.setNavbarAction('');
    this.props.setMultiAppBar(false);
    this.props.setBackLinkTo('');
  }
}

export default ViewGroupMobile;
