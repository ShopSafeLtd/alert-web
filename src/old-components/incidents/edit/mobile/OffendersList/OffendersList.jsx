import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import AddGroupIcon from '@material-ui/icons/GroupAdd';

import ConfirmDialog from '../../../../global/ConfirmDialog/ConfirmDialog';
import { SpeedDial } from '../../../../global/SpeedDial';
import { Header, HeaderText, HeaderSubText } from '../../../../global/forms';
import OffendersImage from '../../../../../images/Offenders';
import OffenderItem from '../../../global/OffenderItem/OffenderItem';
import { EmptyText } from '../../../../global/typography';
import OffenderSkeleton from '../OffenderSkeleton/OffenderSkeleton';

const Page = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  margin-bottom: 60px;
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

class OffendersList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      confirmRemove: false,
      offenderId: ''
    };
  }

  componentDidMount() {
    this.props.setBackLinkTo(this.props.basePath);
  }

  render() {
    const {
      offenders,
      history,
      basePath,
      removeOffender,
      loading
    } = this.props;
    const { confirmRemove, offenderId } = this.state;
    return (
      <Page>
        <Header>
          <HeaderText>Offenders</HeaderText>
          <HeaderSubText>
            Add or update offenders on this incident.
          </HeaderSubText>
        </Header>
        {loading ? (
          <div>
            <OffenderSkeleton />
            <OffenderSkeleton />
            <OffenderSkeleton />
            <OffenderSkeleton />
          </div>
        ) : offenders.length > 0 ? (
          <div>
            {offenders.map(offender => (
              <OffenderItem
                key={offender.id}
                offender={offender}
                onClick={() => {
                  history.push(`${basePath}/offenders/view/${offender.id}`);
                }}
                remove
                onRemove={() =>
                  this.setState({
                    confirmRemove: true,
                    offenderId: offender.id
                  })
                }
              />
            ))}
            <SpeedDial
              bottom
              actions={[
                {
                  name: 'New Offender',
                  onClick: () => history.push(`${basePath}/offenders/add`),
                  icon: <AddIcon />
                },
                {
                  name: 'Find Offender',
                  onClick: () => history.push(`${basePath}/offenders/find`),
                  icon: <AddGroupIcon />
                }
              ]}
            />
            <ConfirmDialog
              open={confirmRemove}
              handleClose={() => this.setState({ confirmRemove: false })}
              title="Are you sure?"
              description="Are you sure you want to remove this offender from the incident?"
              actions={[
                <Button onClick={() => this.setState({ confirmRemove: false })}>
                  Cancel
                </Button>,
                <Button
                  color="primary"
                  onClick={() => {
                    this.setState({ confirmRemove: false });
                    removeOffender(offenderId);
                  }}
                >
                  Remove Offender
                </Button>
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
              to={`${basePath}/offenders/add`}
            >
              Add New Offender
            </MarginButton>
            <MarginButton
              variant="contained"
              color="primary"
              component={Link}
              to={`${basePath}/offenders/find`}
            >
              Add Existing Offender
            </MarginButton>
          </Empty>
        )}
      </Page>
    );
  }
}

export default OffendersList;
