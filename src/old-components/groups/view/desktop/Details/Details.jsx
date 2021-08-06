import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import EditSvg from '@material-ui/icons/Edit';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
  ItemHeader,
  ItemText,
  SectionTitle
} from '../../../../global/typography';
import { Section } from '../../../../global/layout';

const Row = styled.div`
  display: flex;
`;
const Item = styled.div`
  flex: 1;
  margin: 10px 0;
`;
const Center = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const EditIcon = styled(EditSvg)`
  width: 18px;
  margin-right: 5px;
`;

const Details = ({ group, loading, openEdit }) => {
  return (
    <Section width="50%" elevation={1}>
      <Row>
        <SectionTitle>Details</SectionTitle>
        <Button variant="text" color="primary" size="small" onClick={openEdit}>
          <EditIcon />
          Edit Details
        </Button>
      </Row>
      {loading ? (
        <Center>
          <CircularProgress />
        </Center>
      ) : (
        <div>
          <Item>
            <ItemHeader>Group Name</ItemHeader>
            <ItemText>{group.name}</ItemText>
          </Item>
          <Item>
            <ItemHeader>Description</ItemHeader>
            <ItemText>{group.description}</ItemText>
          </Item>
        </div>
      )}
    </Section>
  );
};

export default Details;
