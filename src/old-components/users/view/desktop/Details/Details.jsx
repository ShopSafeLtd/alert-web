import React from "react";
import styled from "styled-components";
import EditSvg from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import {
  ItemHeader,
  ItemText,
  SubHeader,
  SectionTitle,
} from "../../../../global/typography";
import { Section } from "../../../../global/layout";
import { RoleValues } from "types";

const EditIcon = styled(EditSvg)`
  width: 18px;
  margin-right: 5px;
`;
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

const Details = ({ user, userLoading, openEdit }) => {
  return (
    <Section width="50%" elevation={1}>
      <Row>
        <SectionTitle>Details</SectionTitle>
        <Button variant="text" color="primary" size="small" onClick={openEdit}>
          <EditIcon />
          Edit Details
        </Button>
      </Row>
      {userLoading ? (
        <Center>
          <CircularProgress />
        </Center>
      ) : (
        <div>
          <Row>
            <Item>
              <ItemHeader>Full Name</ItemHeader>
              <ItemText>{user.fullName}</ItemText>
            </Item>
            <Item>
              <ItemHeader>Organisation</ItemHeader>
              <ItemText>{user.organisation}</ItemText>
            </Item>
          </Row>
          <Row>
            <Item>
              <ItemHeader>Email Address</ItemHeader>
              <ItemText>{user.email}</ItemText>
            </Item>
            <Item>
              <ItemHeader>Role</ItemHeader>
              <ItemText>
                {!!user.schemes && RoleValues[user.schemes[0].role]}
              </ItemText>
            </Item>
          </Row>
          <SubHeader>Address</SubHeader>
          <Row>
            <Item>
              <ItemHeader>Company Name</ItemHeader>
              <ItemText>
                {!!user.addresses && user.addresses[0].premises}
              </ItemText>
            </Item>
            <Item>
              <ItemHeader>Premises</ItemHeader>
              <ItemText>
                {!!user.addresses && user.addresses[0].building}
              </ItemText>
            </Item>
          </Row>
          <Row>
            <Item>
              <ItemHeader>Street</ItemHeader>
              <ItemText>
                {!!user.addresses && user.addresses[0].street}
              </ItemText>
            </Item>
            <Item>
              <ItemHeader>Town/City</ItemHeader>
              <ItemText>
                {!!user.addresses && user.addresses[0].townCity}
              </ItemText>
            </Item>
          </Row>
          <Row>
            <Item>
              <ItemHeader>County</ItemHeader>
              <ItemText>
                {!!user.addresses && user.addresses[0].county}
              </ItemText>
            </Item>
            <Item>
              <ItemHeader>Postcode</ItemHeader>
              <ItemText>
                {!!user.addresses && user.addresses[0].postcode}
              </ItemText>
            </Item>
          </Row>
        </div>
      )}
    </Section>
  );
};

export default Details;
