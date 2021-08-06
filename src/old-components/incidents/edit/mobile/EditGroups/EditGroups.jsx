import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { useQuery } from '@apollo/react-hooks';

import { FullWidthButton } from '../../../../global/actions';
import { Header, HeaderText } from '../../../../global/forms';
import { GroupSkeleton } from '../../../../global/skeletons';
import AllGroups from '../../../../../graphql/groups/AllGroupsQuery';

const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 60px;
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
  font-size: 14px;
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
const Text = styled(Typography)`
  margin: 0px;
`;
const TipText = styled(Typography)`
  text-align: center;
  color: #ef5350;
`;

const Groups = ({
  groups,
  setBackLinkTo,
  basePath,
  incidentId,
  loadingIncident,
  history,
  updateIncident,
  schemeAdmin,
  userId
}) => {
  // state
  const [selected, setSelected] = useState([]);

  // effects
  useEffect(() => {
    setBackLinkTo(basePath);
    return () => setBackLinkTo('');
  });
  useEffect(
    () => {
      setSelected(groups.map(({ id }) => id));
    },
    [groups]
  );

  // queries
  const { data, loading } = useQuery(AllGroups, {
    variables: {
      schemeId: window.localStorage.getItem('currentScheme'),
      user: schemeAdmin ? undefined : { some: { id: { equals: userId } } }
    },
    fetchPolicy: 'cache-and-network'
  });

  // functions
  const toggleGroups = id =>
    selected.includes(id)
      ? setSelected(selected.filter(group => group !== id))
      : setSelected([...selected, id]);
  const handleSave = () => {
    const connect = selected
      .filter(group => !groups.map(({ id }) => id).includes(group))
      .map(id => ({ id }));
    const disconnect = groups
      .filter(({ id }) => !selected.includes(id))
      .map(({ id }) => ({ id }));
    updateIncident({
      variables: {
        id: incidentId,
        groups: {
          connect: connect.length > 0 ? connect : undefined,
          disconnect: disconnect.length > 0 ? disconnect : undefined
        }
      }
    });
    history.push(basePath);
  };

  return (
    <Page>
      <Header>
        <HeaderText>Edit Groups</HeaderText>
        <Text>
          Please select the groups that you would like this incident to be
          visible to.
        </Text>
      </Header>
      {!!data &&
        !!data.groups &&
        data.groups.length === 0 && (
          <TipText>Please select at least one group</TipText>
        )}
      {loading || loadingIncident ? (
        <List>
          <GroupSkeleton />
          <GroupSkeleton />
          <GroupSkeleton />
        </List>
      ) : (
        <List>
          {!!data &&
            !!data.groups &&
            data.groups.map(({ id, name }) => (
              <ListItem key={id} onClick={() => toggleGroups(id)}>
                <Svg viewBox="0 0 24 24">
                  <path
                    fill={selected.includes(id) ? '#1E88E5' : '#E0E0E0'}
                    d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"
                  />
                </Svg>
                <ItemText>{name}</ItemText>
              </ListItem>
            ))}
        </List>
      )}
      <FullWidthButton
        text="Save Groups"
        disabled={loading || selected.length === 0}
        onClick={handleSave}
      />
    </Page>
  );
};

export default Groups;
