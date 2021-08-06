import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useQuery } from '@apollo/react-hooks';

import ImageQuery from '../../../../../graphql/images/queries/ImageQuery';
import { Header, HeaderText, HeaderSubText } from '../../../../global/forms';
import { EmptyText } from '../../../../global/typography';
import OffenderItem from '../../../global/OffenderItem/OffenderItem';
import ConfirmDialog from '../../../../global/ConfirmDialog/ConfirmDialog';
import OffendersImage from '../../../../../images/Offenders';
import OffenderSkeleton from '../OffenderSkeleton/OffenderSkeleton';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;
const Empty = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 60px;
`;
const Offenders = styled.div`
  height: 100%;
  width: 100%;
  overflow: auto;
`;

const AssignedOffenders = ({
  setBackLinkTo,
  basePath,
  updateIncident,
  incidentId,
  match,
  loadingIncident
}) => {
  // state
  const [remove, setRemove] = useState('');

  // effects
  useEffect(() => {
    setBackLinkTo(`${basePath}/images`);
    return () => setBackLinkTo('');
  }, []);

  // queries
  const { data, loading } = useQuery(ImageQuery, {
    id: match.params.imageId
  });

  // functions
  const removeOffender = id =>
    updateIncident({
      variables: {
        id: incidentId,
        images: {
          update: [
            {
              where: {
                id: match.params.imageId
              },
              data: {
                offenders: {
                  disconnect: [{ id }]
                }
              }
            }
          ]
        }
      }
    });
  return (
    <Page>
      <Header>
        <HeaderText>Assigned Offenders</HeaderText>
        <HeaderSubText>Offenders assigned to this image.</HeaderSubText>
      </Header>
      {loading || loadingIncident ? (
        <Offenders>
          <OffenderSkeleton />
          <OffenderSkeleton />
          <OffenderSkeleton />
        </Offenders>
      ) : data.image.offenders.length === 0 ? (
        <Empty>
          <OffendersImage width="100px" height="100px" />
          <EmptyText>There are no offenders assigned</EmptyText>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`${basePath}/images`}
          >
            Back To Images
          </Button>
        </Empty>
      ) : (
        <Offenders>
          {data.image.offenders.map(offender => (
            <OffenderItem
              key={offender.id}
              offender={offender}
              remove
              onRemove={() => setRemove(offender.id)}
            />
          ))}
        </Offenders>
      )}
      <ConfirmDialog
        open={remove}
        handleClose={() => setRemove('')}
        title="Are you sure?"
        description="Are you sure you want to remove this offender from the image?"
        actions={[
          <Button onClick={() => setRemove('')}>Cancel</Button>,
          <Button
            color="primary"
            onClick={() => {
              setRemove('');
              removeOffender(remove);
            }}
          >
            Remove Offender
          </Button>
        ]}
      />
    </Page>
  );
};

export default AssignedOffenders;
