import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import GroupAddIcon from '@material-ui/icons/GroupAdd';

import {
  FullWidthButton,
  SpeedDial,
  SpeedDialAction,
  SpeedDialButton
} from '../../../../global/actions';
import OffendersImage from '../../../../../images/Offenders';
import OffenderItem from '../../../global/OffenderItem/OffenderItem';
import { Header, HeaderText, HeaderSubText } from '../../../../global/forms';
import { EmptyText } from '../../../../global/typography';

const Page = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
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
const MarginButton = styled(Button)`
  margin: 5px 0;
`;

class OffenderList extends PureComponent {
  componentDidMount() {
    this.props.setNavbarAction('backLink');
    this.props.setBackLinkTo('/incidents/add/location');
  }

  render() {
    const { offenders, setCurrentOffender, history } = this.props;
    return (
      <Page>
        <Header>
          <HeaderText>Offenders</HeaderText>
          <HeaderSubText>
            Assign any relevant offenders, you can either add a new offender or
            search for existing offenders.
          </HeaderSubText>
        </Header>
        {offenders.length > 0 ? (
          <div>
            {offenders.map(offender => (
              <OffenderItem
                key={offender.id}
                offender={offender}
                onClick={() => {
                  history.push('/incidents/add/offenders/view');
                  setCurrentOffender(offender.id);
                }}
              />
            ))}
            <SpeedDial
              icon={<AddIcon />}
              actions={[
                <SpeedDialAction key="0" label="Add New Offender">
                  <SpeedDialButton
                    color="primary"
                    size="small"
                    component={Link}
                    to="/incidents/add/offenders/new"
                  >
                    <AddIcon />
                  </SpeedDialButton>
                </SpeedDialAction>,
                <SpeedDialAction key="1" label="Add Existing Offender">
                  <SpeedDialButton
                    color="primary"
                    size="small"
                    component={Link}
                    to="/incidents/add/offenders/existing-offenders"
                  >
                    <GroupAddIcon />
                  </SpeedDialButton>
                </SpeedDialAction>
              ]}
            />
          </div>
        ) : (
          <Empty>
            <OffendersImage width="100px" height="100px" />
            <EmptyText variant="subtitle1">
              There are no offender assigned
            </EmptyText>
            <MarginButton
              variant="contained"
              color="primary"
              component={Link}
              to="/incidents/add/offenders/new"
            >
              Add New Offender
            </MarginButton>
            <MarginButton
              variant="contained"
              color="primary"
              component={Link}
              to="/incidents/add/offenders/existing-offenders"
            >
              Add Existing Offender
            </MarginButton>
          </Empty>
        )}
        <FullWidthButton
          text="Next"
          onClick={() => this.props.history.push('/incidents/add/images')}
        />
      </Page>
    );
  }

  componentWillUnmount() {
    this.props.setNavbarAction('default');
    this.props.setBackLinkTo('');
  }
}

export default OffenderList;
