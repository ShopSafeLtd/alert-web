import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';

import ImageQuery from '../../../../../graphql/images/queries/ImageQuery';
import OffenderItem from '../../../global/OffenderItem/OffenderItem';
import OffendersImage from '../../../../../images/Offenders';
import { FullWidthButton } from '../../../../global/actions';
import { Header, HeaderText, HeaderSubText } from '../../../../global/forms';
import { EmptyText } from '../../../../global/typography';
import OffenderSkeleton from '../OffenderSkeleton/OffenderSkeleton';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;
const Offenders = styled.div`
  height: calc(100% - 80px);
  width: 100%;
  display: flex;
`;
const OffendersList = styled.div`
  height: 100%;
  width: 100%;
  margin-bottom: 64px;
`;
const Empty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: calc(100% - 80px);
`;

const AssignOffenders = ({
  setBackLinkTo,
  basePath,
  match,
  updateIncident,
  incidentId,
  loadingIncident,
  history,
  offenders
}) => {
  // state
  const [selected, setSelected] = useState([]);

  // effects
  useEffect(() => {
    setBackLinkTo(`${basePath}/images`);
    return () => setBackLinkTo('');
  });

  // queries
  const { data, loading } = useQuery(ImageQuery, {
    variables: { id: match.params.imageId },
    fetchPolicy: 'cache-and-network',
    onCompleted: data => setSelected(data.image.offenders.map(({ id }) => id))
  });

  // functions
  const toggleSelected = id =>
    selected.includes(id)
      ? setSelected(selected.filter(offender => id !== offender))
      : setSelected([...selected, id]);
  const assignOffendersToImage = () => {
    const connect = selected
      .filter(
        offender => !data.image.offenders.map(({ id }) => id).includes(offender)
      )
      .map(id => ({ id }));
    const disconnect = data.image.offenders
      .filter(({ id }) => !selected.includes(id))
      .map(({ id }) => ({ id }));
    updateIncident({
      variables: {
        id: incidentId,
        images: {
          update: {
            where: { id: match.params.imageId },
            data: {
              offenders: {
                connect: connect.length > 0 ? connect : undefined,
                disconnect: disconnect.length > 0 ? disconnect : undefined
              }
            }
          }
        }
      }
    });
  };

  return (
    <Page>
      <Header>
        <HeaderText>Assign Offenders</HeaderText>
        <HeaderSubText>Assign any offenders shown in this image.</HeaderSubText>
      </Header>
      {loading || loadingIncident ? (
        <div>
          <OffendersList>
            <OffenderSkeleton check />
            <OffenderSkeleton check />
            <OffenderSkeleton check />
          </OffendersList>
          <FullWidthButton text="Assign Offenders" disabled />
        </div>
      ) : offenders.length > 0 ? (
        <div>
          <Offenders>
            <OffendersList>
              {offenders.map(offender => {
                return (
                  <OffenderItem
                    key={offender.id}
                    offender={offender}
                    onClick={() => toggleSelected(offender.id)}
                    select
                    selected={selected.includes(offender.id)}
                  />
                );
              })}
            </OffendersList>
          </Offenders>
          <FullWidthButton
            text="Assign Offenders"
            onClick={() => {
              assignOffendersToImage();
              history.push(`${basePath}/images`);
            }}
          />
        </div>
      ) : (
        <Empty>
          <OffendersImage width="100px" height="100px" />
          <EmptyText>All offenders have been assigned</EmptyText>
        </Empty>
      )}
    </Page>
  );
};

export default AssignOffenders;
