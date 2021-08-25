import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { useQuery } from "@apollo/client";

import {
  PopOver,
  PopOverContainer,
  CheckList,
  Row,
} from "../../../global/layout";
import { BackButton } from "../../../global/actions";
import { FieldHeader, FieldHelp } from "../../../global/forms";
import { Tags } from "../../../../graphql-src/tags/queries";
import { useStoreState } from "../../../../state";
// import AllOffenderLabels from '../../../../graphql/offenderLabels/queries/AllOffenderLabels';

const Container = styled.div`
  height: calc(100vh - 130px);
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
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
const Form = styled.div`
  margin-top: 20px;
`;
const Field = styled.div`
  margin: 10px;
`;

const AddLabelPopOver = ({
  visible,
  close,
  submitLabels,
  tags: offenderTags,
}) => {
  // state
  const [add, setAdd] = useState(false);
  const [details, setDetails] = useState({
    name: "",
    nameError: "",
    description: "",
    descriptionError: "",
  });
  const [tags, setTags] = useState([]);
  const [selected, setSelected] = useState([]);

  const schemeId = useStoreState((state) => state.scheme.id);

  // effects
  useEffect(() => setSelected(offenderTags), [offenderTags]);

  // queries
  useQuery(Tags, {
    variables: {
      where: {
        scheme: { id: { equals: schemeId } },
        dataType: { equals: "OFFENDER" },
      },
    },
    fetchPolicy: "cache-and-network",
    onCompleted: ({ tags }) => setTags(tags),
  });

  // functions
  const handleChange = (value, field) => {
    setDetails({
      ...details,
      [field]: value,
    });
  };
  const validate = () =>
    new Promise((resolve, reject) => {
      const nameValid = !!details.name;
      const descriptionValid = !!details.description;
      setDetails({
        ...details,
        nameError: nameValid ? "" : "This is a required field.",
        descriptionError: descriptionValid ? "" : "This is a required field.",
      });
      nameValid && descriptionValid ? resolve() : reject();
    });
  const toggle = (tag) =>
    selected.map(({ id }) => id).includes(tag.id)
      ? setSelected(selected.filter(({ id }) => id !== tag.id))
      : setSelected([...selected, tag]);
  const addTag = () => {
    validate()
      .then(() => {
        const tag = {
          id: Math.random(),
          name: details.name,
          description: details.description,
          newTag: true,
        };
        setTags([...tags, tag]);
        setSelected([...selected, tag]);
        setAdd(false);
        setDetails({
          name: "",
          nameError: "",
          description: "",
          descriptionError: "",
        });
      })
      .catch(() => {});
  };

  return (
    <PopOver
      noPadding
      open={visible}
      width={500}
      handleClose={close}
      title={add ? "Add Offender Warnings" : "Edit Offender Warnings"}
      actions={
        add
          ? [
              <BackButton
                key={0}
                onClick={() => {
                  setAdd(false);
                  setDetails({
                    name: "",
                    nameError: "",
                    description: "",
                    descriptionError: "",
                  });
                }}
              >
                Cancel
              </BackButton>,
              <Button
                key={1}
                color="primary"
                variant="contained"
                onClick={addTag}
              >
                Add Label
              </Button>,
            ]
          : [
              <BackButton key={0} onClick={close}>
                Cancel
              </BackButton>,
              <Button
                key={1}
                color="primary"
                variant="contained"
                onClick={() => {
                  submitLabels(selected);
                  close();
                }}
              >
                Update Labels
              </Button>,
            ]
      }
    >
      <Container>
        {!add ? (
          <PopOverContainer>
            <CheckList
              menuItems={tags.map(({ id, name, helpText }) => ({
                value: id,
                label: name,
                helpText,
              }))}
              selected={selected.map(({ id }) => id)}
              onClick={(id) => toggle(tags.find((tag) => id === tag.id))}
            />
            <ListItem onClick={() => setAdd(true)}>
              <Svg viewBox="0 0 24 24">
                <path
                  fill="#EF5350"
                  d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z"
                />
              </Svg>
              <ItemText>{"Add New Label"}</ItemText>
            </ListItem>
          </PopOverContainer>
        ) : (
          <PopOverContainer>
            <Form>
              <Field row>
                <Row row>
                  <FieldHeader required>Name</FieldHeader>
                  <FieldHelp>Enter a name for the nw offender label.</FieldHelp>
                </Row>
                <TextField
                  id="name-input"
                  value={details.name}
                  onChange={(e) => handleChange(e.target.value, "name")}
                  fullWidth
                  error={!!details.nameError}
                  helperText={details.nameError}
                />
              </Field>
              <Field row>
                <Row row>
                  <FieldHeader required>Description</FieldHeader>
                  <FieldHelp>
                    Enter a description for the new offender label.
                  </FieldHelp>
                </Row>
                <TextField
                  id="description-input"
                  value={details.description}
                  onChange={(e) => handleChange(e.target.value, "description")}
                  fullWidth
                  multiline
                  rows={2}
                  error={!!details.descriptionError}
                  helperText={details.descriptionError}
                />
              </Field>
            </Form>
          </PopOverContainer>
        )}
      </Container>
    </PopOver>
  );
};

export default AddLabelPopOver;
