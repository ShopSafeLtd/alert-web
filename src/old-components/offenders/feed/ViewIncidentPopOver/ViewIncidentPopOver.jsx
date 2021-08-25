import React from "react";
import styled from "styled-components";
import moment from "moment";
import MediaQuery from "react-responsive";
import Typography from "@material-ui/core/Typography";
import { useQuery } from "@apollo/client";

import { PopOver, Item, Grow } from "../../../global/layout";
import { ItemHeader, ItemText } from "../../../global/typography";
import { Incident } from "graphql-src/incidents/queries";
import AlertCardImages from "../../../incidents/feed/AlertCardImages/AlertCardImages";
import { BackButton } from "../../../global/actions";

const Subject = styled(Typography)`
  margin: 10px 0 0;
  ${({ loading }) =>
    loading === 1 &&
    `
    background: #EF9A9A;
    border-radius: 4px;
    height: 32px;
    width: 50%;
    margin-bottom: 10px;
  `};
`;
const Date = styled(Typography)`
  margin-bottom: 8px;
  ${({ loading }) =>
    loading === 1 &&
    `
    background: #EF9A9A;
    border-radius: 4px;
    height: 20px;
    width: 60px;
  `};
`;
const Row = styled.div`
  display: flex;
`;
const CrimeTypes = styled.div`
  margin: 0.8rem 0 0.5rem;
  display: flex;
  flex-wrap: wrap;
`;
const CrimeType = styled(Typography)`
  color: #fff;
  background-color: #ef5350;
  padding: 0.3rem 0.8rem;
  border-radius: 25px;
  margin: 0 0.4rem 0.3rem 0;
`;
const Container = styled.div`
  padding: 0 30px;
  flex: 1;
`;

const ViewIncidentPopOver = ({ visible, close, incidentId }) => {
  // queries
  const { data, loading: loadingQuery } = useQuery(Incident, {
    variables: { where: { id: incidentId } },
    fetchPolicy: "cache-and-network",
    skip: !incidentId,
  });

  const loading = !!data && !!data.incident && !loadingQuery ? false : true;

  return (
    <MediaQuery minDeviceWidth={1024}>
      {(matches) => (
        <PopOver
          noPadding
          open={visible}
          width={matches ? 500 : window.innerWidth - 15}
          handleClose={() => close()}
          title={"View Incident"}
          actions={[
            <BackButton
              color="primary"
              variant="contained"
              onClick={() => close()}
            >
              Close
            </BackButton>,
          ]}
        >
          <AlertCardImages images={loading ? [] : data.incident.images} />
          <Container>
            <Subject variant="h6" loading={loading ? 1 : 0}>
              {!loading && data.incident.subject}
            </Subject>
            <Date variant="body2" loading={loading ? 1 : 0}>
              {!loading &&
                `${data.incident.createdBy.fullName} - ${
                  data.incident.createdBy.organisation
                } - ${moment(data.incident.date).format("DD/MM/YY")}`}
            </Date>
            <CrimeTypes>
              {!loading &&
                data.incident.crimeTypes.map(({ id, name }) => {
                  return <CrimeType key={id}>{name}</CrimeType>;
                })}
            </CrimeTypes>
            <Row>
              <Grow>
                <Item>
                  <ItemHeader>Date</ItemHeader>
                  <ItemText loading={loading ? 1 : 0}>
                    {!loading &&
                      moment(data.incident.date).format("DD/MM/YYYY")}
                  </ItemText>
                </Item>
              </Grow>
              <Grow>
                <Item>
                  <ItemHeader>Time</ItemHeader>
                  <ItemText loading={loading ? 1 : 0}>
                    {!loading && moment(data.incident.time).format("HH:mm")}
                  </ItemText>
                </Item>
              </Grow>
            </Row>
            <Item>
              <ItemHeader>Description</ItemHeader>
              <ItemText loading={loading ? 1 : 0}>
                {!loading && data.incident.description}
              </ItemText>
            </Item>
          </Container>
        </PopOver>
      )}
    </MediaQuery>
  );
};

export default ViewIncidentPopOver;
