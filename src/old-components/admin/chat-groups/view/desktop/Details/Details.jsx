import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import EditSvg from '@material-ui/icons/Edit';

import {
  ItemHeader,
  ItemText,
  SectionTitle
} from '../../../../../global/typography';
import { Section } from '../../../../../global/layout';

const Row = styled.div`
  display: flex;
`;
const Item = styled.div`
  flex: 1;
  margin: 10px 0;
`;
const EditIcon = styled(EditSvg)`
  width: 18px;
  margin-right: 5px;
`;
const Center = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Details = ({ chat, loading, openEdit }) => {
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
            <ItemHeader>Chat Group Name</ItemHeader>
            <ItemText>{chat.name}</ItemText>
          </Item>
          <Item>
            <ItemHeader>Description</ItemHeader>
            <ItemText>{chat.description}</ItemText>
          </Item>
        </div>
      )}
    </Section>
  );
};

export default Details;
