import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useQuery } from '@apollo/client';

import { PopOver } from '../../layout';
import { BackButton } from '../../actions';
import { Groups } from 'graphql-src/groups/queries';
import { EmptyText } from '../../typography';
import { useStoreState } from 'state';
import OffendersImage from 'images/Offender'

const Grow = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
`;
const List = styled.div`
  flex: 1;
`;
const ListItem = styled.div`
  display: flex;
  align-items: center;
  margin: 3px 0;
  cursor: pointer;
  border-bottom: 1px solid #eeeeee;
  height: 50px;
`;
const ItemText = styled(Typography)`
  margin: 0;
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
const Empty = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const PopOverContainer = styled.div`
  padding: 0 30px;
  flex: 1;
  display: flex;
`;

const AddGroups = ({ open, close, groups, addGroups }) => {
  const scheme = useStoreState(state => state.scheme.id)

  // state
  const [selected, setSelected] = useState([]);

  // queries
  const { data, loading } = useQuery(Groups, {
    variables: {
      where: {
        scheme: { id : { equals: scheme } },
        id: { notIn: !!groups ? groups.map(({ id }) => id) : [] }
      }
    },
    fetchPolicy: 'cache-and-network'
  });

  // functions
  const toggleSelected = id =>
    selected.includes(id)
      ? setSelected(selected.filter(group => group !== id))
      : setSelected([...selected, id]);
  const handleClose = () => {
    close();
    setSelected([]);
  };

  return (
    <PopOver
      noPadding
      open={open}
      width={600}
      handleClose={handleClose}
      title={'Add Groups'}
      actions={[
        <BackButton key={0} onClick={handleClose}>
          Cancel
        </BackButton>,
        <Button
          key={1}
          variant="contained"
          color="primary"
          onClick={() => {
            handleClose();
            addGroups(
              selected.map(group => data.groups.find(({ id }) => id === group))
            );
          }}
        >
          Add Groups
        </Button>
      ]}
    >
      <Grow>
        <PopOverContainer>
          {loading ? (
            <List />
          ) : data.groups.length === 0 ? (
            <Empty>
              <OffendersImage height="70px" width="70px" />
              <EmptyText>
                There are no groups or all groups are already added.
              </EmptyText>
            </Empty>
          ) : (
            <List>
              {!!data &&
                data.groups.map(({ id, name }) => {
                  return (
                    <ListItem key={id}>
                      <Svg
                        onClick={() => toggleSelected(id)}
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill={selected.includes(id) ? '#1E88E5' : '#E0E0E0'}
                          d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"
                        />
                      </Svg>
                      <ItemText onClick={() => toggleSelected(id)}>
                        {name}
                      </ItemText>
                    </ListItem>
                  );
                })}
            </List>
          )}
        </PopOverContainer>
      </Grow>
    </PopOver>
  );
};

export default AddGroups;
