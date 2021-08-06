import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';

import {
  FindOffenders,
  MoreOffenders
} from '../../../../../graphql/offenders/queries';
import FindOffendersList from '../FindOffendersList/FindOffendersList';
import SearchOffenders from '../../../global/SearchOffenders/SearchOffenders';
import OffendersImage from '../../../../../images/Offenders';
import { Header, HeaderText, HeaderSubText } from '../../../../global/forms';
import { EmptyText } from '../../../../global/typography';

const Page = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 56px);
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
const LoadingItem = styled.div`
  border-bottom: 1px solid #eeeeee;
  display: flex;
  align-items: center;
  min-height: 75px;
  cursor: pointer;
`;
const LoadingImage = styled.div`
  height: 75px;
  width: 75px;
  background: #f5f5f5;
`;
const LoadingName = styled.div`
  height: 16px;
  background: #f5f5f5;
  border-radius: 5px;
  margin-left: 20px;
`;

const ExistingOffenders = ({
  setBackLinkTo,
  basePath,
  history,
  userId,
  incidentId,
  schemeAdmin
}) => {
  // state
  const [allLoaded, setAllLaoded] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [search, setSearch] = useState('');
  const [firstLoad, setFirstLoad] = useState(true);

  // effects
  useEffect(() => {
    setBackLinkTo(`${basePath}/offenders`);
    return () => setBackLinkTo('');
    // eslint-disable-next-line
  }, []);

  // queries
  const { data, loading, fetchMore } = useQuery(FindOffenders, {
    variables: {
      schemeId: window.localStorage.getItem('currentScheme'),
      search: search !== '' ? search : undefined,
      incidentId: incidentId,
      groups: schemeAdmin
        ? undefined
        : { some: { groupUsers: { some: { id: { equals: userId } } } } }
    },
    fetchPolicy: 'cache-and-network',
    onCompleted: () => setFirstLoad(false)
  });

  // functions
  const handleSearch = search => {
    setAllLaoded(false);
    setSearch(search);
  };

  let cursor;
  if (!loading && !!data && data.offenders.length > 0) {
    cursor = data.offenders.slice(-1)[0].id;
  }

  const loadMore = async () => {
    if (!allLoaded && !fetching) {
      setFetching(true);

      await fetchMore({
        query: MoreOffenders,
        variables: {
          cursor,
          schemeId: window.localStorage.getItem('currentScheme'),
          search: search !== '' ? search : undefined,
          incidentId: incidentId,
          groups: schemeAdmin
            ? undefined
            : { some: { groupUsers: { some: { id: { equals: userId } } } } }
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (fetchMoreResult.offenders.length === 0) setAllLaoded(true);
          return {
            offenders: [
              ...previousResult.offenders,
              ...fetchMoreResult.offenders
            ]
          };
        }
      });
      setFetching(false);
    }
  };

  return (
    <Page>
      <Header>
        <HeaderText>Existing Offenders</HeaderText>
        <HeaderSubText>
          Search through existing offenders to find any relevant offenders.
        </HeaderSubText>
      </Header>
      <SearchOffenders handleSearch={handleSearch} search={search} />
      {firstLoad && loading ? (
        <div>
          <LoadingItem>
            <LoadingImage />
            <LoadingName
              style={{
                width: `${Math.floor(Math.random() * (60 - 30 + 1)) + 30}%`
              }}
            />
          </LoadingItem>
          <LoadingItem>
            <LoadingImage />
            <LoadingName
              style={{
                width: `${Math.floor(Math.random() * (60 - 30 + 1)) + 30}%`
              }}
            />
          </LoadingItem>
          <LoadingItem>
            <LoadingImage />
            <LoadingName
              style={{
                width: `${Math.floor(Math.random() * (60 - 30 + 1)) + 30}%`
              }}
            />
          </LoadingItem>
          <LoadingItem>
            <LoadingImage />
            <LoadingName
              style={{
                width: `${Math.floor(Math.random() * (60 - 30 + 1)) + 30}%`
              }}
            />
          </LoadingItem>
          <LoadingItem>
            <LoadingImage />
            <LoadingName
              style={{
                width: `${Math.floor(Math.random() * (60 - 30 + 1)) + 30}%`
              }}
            />
          </LoadingItem>
        </div>
      ) : data.offenders.length > 0 ? (
        <FindOffendersList
          offenders={data.offenders}
          loadMore={loadMore}
          history={history}
          basePath={basePath}
          loading={!firstLoad && loading}
        />
      ) : (
        <Empty>
          <OffendersImage width="100px" height="100px" />
          <EmptyText>
            {search !== ''
              ? 'No offenders found with that name'
              : 'There are no existing offenders'}
          </EmptyText>
        </Empty>
      )}
    </Page>
  );
};

export default ExistingOffenders;
