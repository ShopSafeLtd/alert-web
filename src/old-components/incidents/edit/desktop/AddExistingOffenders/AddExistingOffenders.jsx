import React, { useState } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { useQuery } from '@apollo/react-hooks';

import OffenderPreview from '../../../global/OffenderPreview/OffenderPreview';
import SearchOffenders from '../SearchOffenders/SearchOffenders';
import OffenderList from '../OffenderList/OffenderList';
import OffenderSvg from '../../../../../images/Offenders';
import { EmptyText } from '../../../../global/typography';
import OffenderPreviewSkeleton from '../../../../global/skeletons/OffenderPreviewSkeleton/OffenderPreviewSkeleton';
import {
  AdminOffendersFiltered,
  MoreFilteredOffenders
} from '../../../../../graphql/offenders/queries';

const ListItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid #eeeeee;
  background-color: ${({ current }) => (current ? 'rgba(0,0,0,0.01)' : '#fff')};
`;
const ItemText = styled(Typography)`
  margin: 0;
  flex: 1;
  padding-left: 15px;
  height: 50px;
  display: flex;
  align-items: center;
`;
const Row = styled.div`
  display: flex;
  ${({ fullHeight }) => fullHeight && 'height: 100%'};
  ${({ left }) => left && 'justify-content: flex-end'};
`;
const Container = styled.div`
  width: 100%;
`;
const OffenderImage = styled.div`
  height: 60px;
  min-width: 60px;
  width: 60px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  ${({ url }) => `background-image: url(${url});`};
`;
const BlankAvatar = styled.div`
  background: #f5f5f5;
  position: relative;
  height: 60px;
  width: 60px;
  min-width: 60px;
  overflow: hidden;
`;
const UserIcon = styled.svg`
  height: 70px;
  width: 70px;
  position: absolute;
  bottom: -12px;
  left: -5px;
`;
const OffenderSkeleton = styled.div`
  display: flex;
  align-items: center;
`;
const TextSkeleton = styled.div`
  margin-left: 15px;
  background: #f5f5f5;
  height: 20px;
  width: 70%;
`;
const EmptyList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 1;
`;

const AddExistingOffender = ({ current, setCurrentOffender, offendersIds }) => {
  // state
  const [search, setSearch] = useState('');
  const [allLoaded, setAllLoaded] = useState(false);
  const [fetching, setFetching] = useState(false);

  // queries
  const { data, loading, fetchMore } = useQuery(AdminOffendersFiltered, {
    variables: {
      offendersIds,
      schemeId: window.localStorage.getItem('currentScheme'),
      search
    },
    fetchPolicy: 'cache-and-network',
    onCompleted: data =>
      setCurrentOffender(data.offenders.length > 0 && data.offenders[0])
  });

  let cursor;
  if (!loading && !!data && data.offenders.length > 0) {
    cursor = data.offenders.slice(-1)[0].id;
  }

  const loadMore = async () => {
    if (!allLoaded && !fetching) {
      setFetching(true);
      await fetchMore({
        query: MoreFilteredOffenders,
        variables: {
          cursor,
          offendersIds,
          schemeId: window.localStorage.getItem('currentScheme'),
          search
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (fetchMoreResult.offenders.length === 0) {
            setAllLoaded(true);
          }
          return {
            offenders: [
              ...previousResult.offenders,
              ...fetchMoreResult.offenders
            ]
          };
        }
      });
      setFetching(true);
    }
  };

  return (
    <Row fullHeight>
      <div>
        <SearchOffenders search={search} handleSearch={setSearch} />
        {loading ? (
          <OffenderList loadMore={loadMore}>
            <OffenderSkeleton>
              <BlankAvatar />
              <TextSkeleton />
            </OffenderSkeleton>
            <OffenderSkeleton>
              <BlankAvatar />
              <TextSkeleton />
            </OffenderSkeleton>
            <OffenderSkeleton>
              <BlankAvatar />
              <TextSkeleton />
            </OffenderSkeleton>
          </OffenderList>
        ) : (
          <OffenderList loadMore={loadMore}>
            {data.offenders.length === 0 ? (
              search !== '' ? (
                <EmptyList>
                  <OffenderSvg width="80px" height="80px" />
                  <EmptyText>No offenders match search.</EmptyText>
                </EmptyList>
              ) : (
                <EmptyList>
                  <OffenderSvg width="80px" height="80px" />
                  <EmptyText>There are currently no offenders.</EmptyText>
                </EmptyList>
              )
            ) : (
              data.offenders.map(offender => {
                return (
                  <ListItem
                    key={offender.id}
                    current={current.id === offender.id}
                    onClick={() => setCurrentOffender(offender)}
                  >
                    {offender.images.length > 0 ? (
                      <OffenderImage url={offender.images[0].url} />
                    ) : (
                      <BlankAvatar>
                        <UserIcon viewBox="0 0 24 24">
                          <path
                            fill="#E0E0E0"
                            d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
                          />
                        </UserIcon>
                      </BlankAvatar>
                    )}
                    <ItemText>{offender.name}</ItemText>
                  </ListItem>
                );
              })
            )}
          </OffenderList>
        )}
      </div>
      <Container>
        {!!data && data.offenders.length === 0 ? (
          <OffenderPreviewSkeleton />
        ) : (
          <OffenderPreview offender={current} />
        )}
      </Container>
    </Row>
  );
};

export default AddExistingOffender;
