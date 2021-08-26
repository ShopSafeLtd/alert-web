import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { APP_PREFIX_PATH } from "configs/AppConfig";

import {
  Field,
  FieldHeader,
  HeaderSubText,
} from "../../global/forms";
import { PageHeader } from "../../global/typography";
import { BackButton } from "../../global/actions";
import { Row, Section } from "../../global/layout";
import { CreateTag } from "graphql-src/tags/mutations";
import { Tags } from "graphql-src/tags/queries";
// import AddCrimeType from '../../../graphql/admin/mutations/AddCrimeType';
// import CrimeTypes from '../../../graphql/admin/queries/AllCrimeTypes';
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
const Form = styled.div`
  flex: 1;
  margin-bottom: 60px;
  padding: 0px 20px;
  @media (min-width: 1024px) {
    padding: 0px;
  }
`;

const EditOffenderWarnings = ({ history }) => {
  const userId = useStoreState((state) => state.user.id);
  const setTitle = useStoreActions((actions) => actions.theme.setTitle);
  const setBottomNav = useStoreActions((actions) => actions.theme.setBottomNav);
  // const setNavbarAction = useStoreActions(
  //   (actions) => actions.theme.setNavbarAction
  // );
  const setBackLinkTo = useStoreActions(
    (actions) => actions.theme.setBackLinkTo
  );

  const schemeId = useStoreState((state) => state.scheme.id);

  const [details, setDetails] = useState({
    name: "",
    nameError: "",
    description: "",
    descriptionError: "",
  });

  useEffect(() => {
    setBottomNav(false);
    setTitle("Add Crime Type");
    // setNavbarAction("backLink");
    setBackLinkTo(`${APP_PREFIX_PATH}/scheme-settings/crime-types`);
    return () => {
      setTitle("");
      // setNavbarAction("default");
      setBackLinkTo("");
    };
    // eslint-disable-next-line
  }, []);

  const handleChange = (data) => {
    setDetails({
      ...details,
      ...data,
    });
  };

  const [addCrimeType] = useMutation(CreateTag, {
    update: (store, { data: { createTag } }) => {
      let data = store.readQuery({
        query: Tags,
        variables: {
          where: {
            scheme: {
              id: {
                equals: schemeId,
              },
            },
            dataType: {
              equals: "INCIDENT",
            },
          },
        },
      });
      store.writeQuery({
        query: Tags,
        data: {
          ...data,
          tags: [...data?.tags, createTag],
        },
        variables: {
          where: {
            scheme: {
              id: {
                equals: schemeId,
              },
            },
            dataType: {
              equals: "INCIDENT",
            },
          },
        },
      });
    },
  });

  const validate = () =>
    new Promise((resolve, reject) => {
      const { name, description } = details;

      const nameValid = name !== "";
      const descriptionValid = description !== "";

      !nameValid
        ? handleChange({ nameError: "This field is required" })
        : handleChange({ nameError: "" });

      !descriptionValid
        ? handleChange({ descriptionError: "This field is required" })
        : handleChange({ descriptionError: "" });

      if (nameValid && descriptionValid) {
        return resolve();
      } else {
        return reject();
      }
    });

  const submit = () => {
    validate()
      .then(async () => {
        await addCrimeType({
          variables: {
            data: {
              name: details.name,
              description: details.description,
              scheme: {
                connect: { id: schemeId },
              },
              createdBy: {
                connect: {
                  id: userId,
                },
              },
              dataType: "INCIDENT",
            },
          },
          optimisticResponse: {
            createTag: {
              description: details.description,
              id: Math.random(),
              name: details.name,
              __typename: "Tag",
            },
          },
        });
        history.push(`${APP_PREFIX_PATH}/scheme-settings/crime-types`);
      })
      .catch(() => {});
  };

  // return (
  //   <Mutation
  //     mutation={AddCrimeType}
  //     update={(store, { data: { createTag } }) => {
  //       let data = store.readQuery({
  //         query: CrimeTypes,
  //         variables: {
  //           schemeId: window.localStorage.getItem('currentScheme')
  //         }
  //       });
  //       data.tags = [...data.tags, createTag];
  //       store.writeQuery({
  //         query: CrimeTypes,
  //         data,
  //         variables: {
  //           schemeId: window.localStorage.getItem('currentScheme')
  //         }
  //       });
  //     }}
  //   >
  //     {addCrimeType => {
  //       const submit = () => {
  //         validate()
  //           .then(async () => {
  //             await addCrimeType({
  //               variables: {
  //                 name: details.name,
  //                 description: details.description,
  //                 schemeId: window.localStorage.getItem('currentScheme'),
  //                 createdById: userId
  //               },
  //               optimisticResponse: {
  //                 createTag: {
  //                   description: details.description,
  //                   id: Math.random(),
  //                   name: details.name,
  //                   __typename: 'Tag'
  //                 }
  //               }
  //             });
  //             history.push(`${APP_PREFIX_PATH}/scheme-settings/crime-types`);
  //           })
  //           .catch(() => {});
  //       };

  return (
    // <MediaQuery minDeviceWidth={1024}>
    //   {(matches) => (
    <Page>
      {/* {matches ? ( */}
      <Section width="100%" elevation={1}>
        <PageHeader>Add Crime Type</PageHeader>
        <HeaderSubText>
          Crime types are used to catagorise incidents that are submitted by
          members.
        </HeaderSubText>
      </Section>
      {/* ) : (
            <Header>
              <HeaderText>Add Crime Type</HeaderText>
              <HeaderSubText>
                Crime types are used to catagorise incidents that are submitted
                by members.
              </HeaderSubText>
            </Header>
          )} */}
      <Section noPadding width="100%" elevation={1} grow>
        <Form>
          <Field>
            <FieldHeader required>Name</FieldHeader>
            <TextField
              value={details.name}
              onChange={(e) => handleChange({ name: e.target.value })}
              fullWidth
              error={!!details.nameError}
              helperText={details.nameError}
            />
          </Field>
          <Field>
            <FieldHeader required>Description</FieldHeader>
            <TextField
              value={details.description}
              onChange={(e) => handleChange({ description: e.target.value })}
              fullWidth
              multiline
              rows="5"
              error={!!details.descriptionError}
              helperText={details.descriptionError}
            />
          </Field>
        </Form>
      </Section>
      {/* {matches ? ( */}
      <Section width="100%" elevation={1}>
        <Row row right>
          <BackButton
            component={Link}
            to={`${APP_PREFIX_PATH}/scheme-settings/crime-types`}
          >
            Cancel
          </BackButton>
          <Button variant="contained" color="primary" onClick={submit}>
            Submit
          </Button>
        </Row>
      </Section>
      {/* ) : (
            <FullWidthButton text="Submit" onClick={submit} />
          )} */}
    </Page>
    //   )}
    // </MediaQuery>
  );
  //     }}
  //   </Mutation>
  // );
};

export default EditOffenderWarnings;
