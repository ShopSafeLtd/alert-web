import React, { useEffect } from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useQuery } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { FAB } from "../../global/actions";
import { APP_PREFIX_PATH } from "configs/AppConfig";

import { Section } from "../../global/layout";
import { PageHeader, EmptyText } from "../../global/typography";
import { AdminWarningSkeleton } from "../../global/skeletons";
import { Tags } from "graphql-src/tags/queries";
// import AllOffenderLabels from '../../../graphql/offenderLabels/queries/AllOffenderLabels';
import { useStoreActions, useStoreState } from "../../../state";

const Page = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  @media (min-width: 1024px) {
    background-color: none;
    padding: 0px 10px 20px;
  }
`;
const List = styled.div`
  flex: 1;
`;
const ListItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid #eeeeee;
  height: 50px;
  padding: 30px 20px;
`;
const Empty = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const EmptyIcon = styled.svg`
  width: 64px;
  height: 64px;
`;

const OffenderWarnings = () => {
  const navigate = useNavigate()
  const setTitle = useStoreActions((actions) => actions.theme.setTitle);
  const setBottomNav = useStoreActions((actions) => actions.theme.setBottomNav);
  // const setNavbarAction = useStoreActions(
  //   actions => actions.theme.setNavbarAction
  // );
  const setBackLinkTo = useStoreActions(
    (actions) => actions.theme.setBackLinkTo
  );

  const schemeId = useStoreState((state) => state.scheme.id);

  // effects
  useEffect(() => {
    setBottomNav(false);
    setTitle("Offender Warnings");
    // setNavbarAction('backLink');
    setBackLinkTo(`${APP_PREFIX_PATH}/scheme-settings`);
    return () => {
      setBottomNav(true);
      setTitle("");
      // setNavbarAction('default');
      setBackLinkTo("");
    };
    // eslint-disable-next-line
  }, []);

  // queries
  const { data, loading } = useQuery(Tags, {
    variables: {
      where: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
        dataType: {
          equals: "OFFENDER",
        },
      },
    },
    fetchPolicy: "cache-and-network",
  });

  return (
    // <MediaQuery minDeviceWidth={1024}>
    //   {(matches) => (
    <Page>
      {/* {matches && ( */}
      <Section width="100%" elevation={1}>
        <PageHeader>Offender Warnings</PageHeader>
      </Section>
      {/*  )} */}

      <Section noPadding width="100%" elevation={1} grow>
        {!!loading && loading ? (
          <List>
            <AdminWarningSkeleton />
            <AdminWarningSkeleton />
            <AdminWarningSkeleton />
          </List>
        ) : data?.tags?.length === 0 ? (
          <Empty>
            <EmptyIcon viewBox="0 0 24 24">
              <path
                fill="#EF5350"
                d="M6,6.9L3.87,4.78L5.28,3.37L7.4,5.5L6,6.9M13,1V4H11V1H13M20.13,4.78L18,6.9L16.6,5.5L18.72,3.37L20.13,4.78M4.5,10.5V12.5H1.5V10.5H4.5M19.5,10.5H22.5V12.5H19.5V10.5M6,20H18A2,2 0 0,1 20,22H4A2,2 0 0,1 6,20M12,5A6,6 0 0,1 18,11V19H6V11A6,6 0 0,1 12,5Z"
              />
            </EmptyIcon>
            <EmptyText>There are currently no offender warnings</EmptyText>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={`${APP_PREFIX_PATH}/scheme-settings/offender-warnings/add`}
            >
              Add Offender Warning
            </Button>
          </Empty>
        ) : (
          <List>
            {data?.tags?.map(({ id, name }) => (
              <ListItem
                key={id}
                onClick={() =>
                  navigate(
                    `${APP_PREFIX_PATH}/scheme-settings/offender-warnings/view/${id}`
                  )
                }
              >
                <Typography>{name}</Typography>
              </ListItem>
            ))}
          </List>
        )}
      </Section>
      {!!data && data.tags.length > 0 && (
        <FAB
          bottom
          to={`${APP_PREFIX_PATH}/scheme-settings/offender-warnings/add`}
        />
      )}
    </Page>
    //   )}
    // </MediaQuery>
  );
};

export default OffenderWarnings;
