import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import moment from 'moment';
import MediaQuery from 'react-responsive';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { useQuery } from '@apollo/react-hooks';

import { PopOver, PopOverContainer } from '../../../global/layout';
import ExclusionQuery from '../../../../graphql/exclusions/queries/Exclusion';
import { BackButton } from '../../../global/actions';
import { ItemHeader } from '../../../global/typography';
import { BanSkeleton } from '../../../global/skeletons';

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
const Container = styled.div`
  margin-top: 20px;
`;

const ViewExclusionPopover = ({ visible, close, exclusionId, offenderId }) => {
  // queries
  const { data, loading } = useQuery(ExclusionQuery, {
    variables: { id: exclusionId },
    fetchPolicy: 'cache-and-network'
  });

  const HeaderMenu = [
    <div key={Math.random()}>
      <IconButton
        component={Link}
        to={`/offenders/edit/${offenderId}/bans/edit/${exclusionId}`}
      >
        <EditIcon />
      </IconButton>
    </div>
  ];

  return (
    <MediaQuery minDeviceWidth={1024}>
      {matches => (
        <PopOver
          noPadding
          open={visible}
          width={matches ? 500 : window.innerWidth - 15}
          handleClose={() => close()}
          title={'View Ban'}
          actions={[
            <BackButton
              color="primary"
              variant="contained"
              onClick={() => close()}
            >
              Close
            </BackButton>
          ]}
          headerActions={HeaderMenu}
        >
          {!loading && !!data && data.ban ? (
            <PopOverContainer>
              <Container>
                <ItemHeader>Duration</ItemHeader>
                <DateRow>
                  <div>
                    <BanDay variant="caption">
                      {moment(data.ban.startDate).format('dddd')}
                    </BanDay>
                    <BanDate variant="subtitle1">
                      {moment(data.ban.startDate).format('DD/MM/YY')}
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
                      {moment(data.ban.endDate).format('dddd')}
                    </BanDay>
                    <BanDate variant="subtitle1">
                      {moment(data.ban.endDate).format('DD/MM/YY')}
                    </BanDate>
                  </div>
                </DateRow>
                <ItemHeader>Location</ItemHeader>
                <Typography>{data.ban.location}</Typography>
                {data.ban.description !== '' && (
                  <ItemHeader>Description</ItemHeader>
                )}
                <Typography>{data.ban.description}</Typography>
              </Container>
            </PopOverContainer>
          ) : (
            <PopOverContainer>
              <Container>
                <BanSkeleton />
              </Container>
            </PopOverContainer>
          )}
        </PopOver>
      )}
    </MediaQuery>
  );
};

export default ViewExclusionPopover;
