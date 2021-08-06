import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { CircularProgress, Typography, Button } from '@material-ui/core';

import { Groups } from 'graphql-src/groups/queries';
import { PopOver, CheckList } from '../../layout';
import { FullWidthButton } from '../../actions';
import { useStoreState } from '../../../../state';

const Text = styled(Typography)`
  margin: 20px;
`;

const UnapprovedCardGroups = ({
  visible,
  cancel,
  approve,
  incident,
  offender
}) => {
  const role = useStoreState(state => state.user.role);
  const userId = useStoreState(state => state.user.id);
  const schemeAdmin = role === 'SCHEME_ADMIN';

  // state
  const [selected, setSelected] = useState([]);
  const [type, setType] = useState('');

  // effects
  useEffect(
    () => {
      !!incident && setSelected(incident.groups.map(({ id }) => id));
      !!incident && setType('INCIDENT');
      !!offender && setSelected(offender.groups.map(({ id }) => id));
      !!offender && setType('OFFENDER');
    },
    [incident, offender]
  );

  // queries
  const { data, loading } = useQuery(Groups, {
    variables: {
      schemeId: window.localStorage.getItem('currentScheme'),
      user: schemeAdmin ? undefined : { some: { id: { equals: userId } } }
    },
    fetchPolicy: 'cache-and-network',
    onCompleted: data => data.groups.length === 1 && toggle(data.groups[0].id)
  });

  // functions
  const toggle = id =>
    selected.includes(id)
      ? setSelected(selected.filter(group => group !== id))
      : setSelected([...selected, id]);

  const error = selected.length === 0;

  return (
    <PopOver
      open={visible}
      handleClose={cancel}
      title={`Approve this ${type === 'INCIDENT' ? 'incident' : 'offender'}?`}
      width={500}
      actions={[
        <Button key="1" onClick={() => cancel()}>
          Cancel
        </Button>,
        <Button
          key="2"
          onClick={() => approve(selected)}
          color="primary"
          disabled={!!data && data.groups.length === 1 ? false : error}
          autoFocus
        >
          Approve
        </Button>
      ]}
      mobileAction={[
        <FullWidthButton
          key="1"
          text={`Approve ${type === 'INCIDENT' ? 'Incident' : 'Offender'}`}
          onClick={() => approve(selected)}
        />
      ]}
    >
      <Text>
        {!!data && data.groups.length === 1
          ? `Approving this ${
              type === 'INCIDENT' ? 'incident' : 'offender'
            } will make it available for your users to see it.`
          : `Approving this ${
              type === 'INCIDENT' ? 'incident' : 'offender'
            } will make it available for your users to see it, please select groups that you want to show this ${
              type === 'INCIDENT' ? 'incident' : 'offender'
            } to from the below list.`}
      </Text>
      {loading ? (
        <CircularProgress />
      ) : (
        <CheckList
          menuItems={data.groups.map(({ id, name }) => ({
            value: id,
            label: name
          }))}
          onClick={toggle}
          selected={selected}
          disabled={!!data && data.groups.length === 1}
        />
      )}
    </PopOver>
  );
};

export default UnapprovedCardGroups;
