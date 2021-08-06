import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import { FullWidthButton } from '../../../../global/actions';
import { ErrorText, EmptyText } from '../../../../global/typography';
import { Header, HeaderText, HeaderSubText } from '../../../../global/forms';
import { ToggleSkeleton } from '../../../../global/skeletons';
import GroupImage from '../../../../../images/Offenders';

const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 60px;
  flex: 1;
`;
const List = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const ListItem = styled.div`
  display: flex;
  align-items: center;
  margin: 3px 0;
  cursor: pointer;
  border-bottom: 1px solid #eeeeee;
  height: 50px;
  padding: 0 20px;
`;
const ItemText = styled(Typography)`
  margin: 0;
  flex: 1;
  padding-left: 15px;
  height: 50px;
  display: flex;
  align-items: center;
`;
const Svg = styled.svg`
  height: 30px;
  width: 30px;
`;
const Empty = styled.div`
  flex: 1;
  margin-bottom: 60px;
  padding: 0px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class GroupList extends PureComponent {
  componentDidMount() {
    this.props.setNavbarAction('backLink');
    this.props.setBackLinkTo(
      this.props.admin
        ? '/offenders/add/ban'
        : this.props.warnings.length > 0
          ? '/offenders/add/warning-labels'
          : '/offenders/add/images'
    );
  }

  handleNext = async () => {
    if (this.props.selectedGroups.length > 0) {
      await this.props.handlePost();
      this.props.history.push('/offenders');
    }
  };

  render() {
    const {
      selectedGroups,
      toggleSelectedGroups,
      disabled,
      loading,
      groups,
      admin
    } = this.props;
    return (
      <Page>
        <Header>
          <HeaderText>Groups</HeaderText>
          <HeaderSubText>
            Please select the groups that you would like this offender to be
            visible to.
          </HeaderSubText>
        </Header>
        <ErrorText>Please select at least one group.</ErrorText>
        {loading ? (
          <List>
            <ToggleSkeleton />
            <ToggleSkeleton />
            <ToggleSkeleton />
          </List>
        ) : (
          <List>
            {groups.length === 0 ? (
              <Empty>
                <GroupImage width="100px" height="100px" />
                <EmptyText variant="subtitle1">
                  There are no groups in scheme.
                </EmptyText>
                {admin && (
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/offenders/add/groups/add"
                  >
                    Add New Group
                  </Button>
                )}
              </Empty>
            ) : (
              groups.map(({ id, name }) => (
                <ListItem key={id} onClick={() => toggleSelectedGroups(id)}>
                  <Svg viewBox="0 0 24 24">
                    <path
                      fill={selectedGroups.includes(id) ? '#1E88E5' : '#E0E0E0'}
                      d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"
                    />
                  </Svg>
                  <ItemText>{name}</ItemText>
                </ListItem>
              ))
            )}
          </List>
        )}
        <FullWidthButton
          text="Submit"
          disabled={disabled || loading || selectedGroups.length === 0}
          onClick={this.handleNext}
        />
      </Page>
    );
  }

  componentWillUnmount() {
    this.props.setNavbarAction('default');
    this.props.setBackLinkTo('');
  }
}

export default GroupList;
