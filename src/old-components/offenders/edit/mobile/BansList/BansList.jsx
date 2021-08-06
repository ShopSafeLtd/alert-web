import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import moment from 'moment';
import AddIcon from '@material-ui/icons/Add';

import { Header, HeaderText, HeaderSubText } from '../../../../global/forms';
import { FAB } from '../../../../global/actions';
import BanImage from '../../../../../images/Ban';
import { EmptyText, ItemHeader } from '../../../../global/typography';
import { BanSkeleton } from '../../../../global/skeletons';

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
const List = styled.div`
  margin-bottom: 60px;
`;
const BanItem = styled.div`
  margin: 0;
  padding: 20px 13%;
  border-bottom: 1px solid #eeeeee;
  cursor: pointer;
`;
const BanDate = styled(Typography)``;
const BanDay = styled(Typography)`
  line-height: 10px;
`;
const DateRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const DateArrow = styled.svg`
  height: 28px;
  width: 28px;
  flex: 1;
`;

class BansList extends PureComponent {
  componentDidMount() {
    this.props.setBackLinkTo(this.props.basePath);
  }

  render() {
    const { loading, offender, basePath, history } = this.props;
    return (
      <Page>
        <Header>
          <HeaderText>Bans</HeaderText>
          <HeaderSubText>
            Add bans to this offender or click on a bad to view and edit its
            details.
          </HeaderSubText>
        </Header>
        {loading ? (
          <List>
            <BanSkeleton />
            <BanSkeleton />
            <BanSkeleton />
          </List>
        ) : offender.bans !== undefined && offender.bans.length > 0 ? (
          <List>
            {offender.bans.map(
              ({ id, startDate, endDate, location, description }) => (
                <BanItem
                  id={id}
                  onClick={() => history.push(`${basePath}/bans/edit/${id}`)}
                >
                  <ItemHeader>Duration</ItemHeader>
                  <DateRow>
                    <div>
                      <BanDay variant="caption">
                        {moment(startDate).format('dddd')}
                      </BanDay>
                      <BanDate variant="subtitle1">
                        {moment(startDate).format('DD/MM/YY')}
                      </BanDate>
                    </div>
                    <DateArrow viewBox="0 0 24 24">
                      <path
                        fill="#EF5350"
                        d="M11,16H3V8H11V2L21,12L11,22V16M13,7V10H5V14H13V17L18,12L13,7Z"
                      />
                    </DateArrow>
                    <div>
                      <BanDay variant="caption">
                        {moment(endDate).format('dddd')}
                      </BanDay>
                      <BanDate variant="subtitle1">
                        {moment(endDate).format('DD/MM/YY')}
                      </BanDate>
                    </div>
                  </DateRow>
                  <ItemHeader>Location</ItemHeader>
                  <Typography>{location}</Typography>
                  {description !== '' && <ItemHeader>Description</ItemHeader>}
                  <Typography>{description}</Typography>
                </BanItem>
              )
            )}
          </List>
        ) : (
          <Empty>
            <BanImage width="100px" height="100px" />
            <EmptyText variant="subtitle1">
              There are currently no bans on this offender.
            </EmptyText>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={`${basePath}/bans/add`}
            >
              Add Ban
            </Button>
          </Empty>
        )}
        <FAB disabled={loading} bottom to={`${basePath}/bans/add`}>
          <AddIcon />
        </FAB>
      </Page>
    );
  }

  componentWillUnmount() {
    this.props.setBackLinkTo('');
  }
}

export default BansList;
