import React, { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import {
  PopOver,
  PopOverHeader,
  PopOverActions,
  PopOverContainer,
  Row,
} from "../../../../global/layout";
import {
  FieldHeader,
  Field,
  DateField,
  FieldHelp,
} from "../../../../global/forms";
import { BackButton } from "../../../../global/actions";

const Grow = styled.div`
  flex: 1;
  width: 100%;
`;

const AddExclusion = ({ open, addExclusion, close }) => {
  const [details, setDetails] = useState({
    startDate: new Date(),
    endDate: new Date(),
    location: "",
    locationError: "",
    description: "",
  });

  const handleChange = (value, field) => {
    setDetails((prev) => {
      return { ...prev, [field]: value };
    });
  };

  const handleAdd = async () => {
    if (details?.location !== "") {
      await addExclusion({
        startDate: new Date(details.startDate),
        endDate: new Date(details.endDate),
        location: details.location,
        description: details.description,
      });
      handleClose();
    } else {
      setDetails((prev) => {
        return { ...prev, locationError: "This field is required." };
      });
    }
  };

  const handleClose = () => {
    setDetails({
      startDate: new Date(),
      endDate: new Date(),
      location: "",
      locationError: "",
      description: "",
    });
    close();
  };

  const { startDate, endDate, location, description, locationError } = details;
  return (
    <PopOver noPadding open={open} width={600}>
      <PopOverHeader close={handleClose}>Add New Exclusion</PopOverHeader>
      <Grow>
        <PopOverContainer>
          <Row row>
            <Field row>
              <Row row>
                <FieldHeader>Start Date</FieldHeader>
                <FieldHelp>The start date of the ban period.</FieldHelp>
              </Row>
              <DateField
                id="Start Date"
                value={startDate}
                onChange={(value) => handleChange(value, "startDate")}
              />
            </Field>
            <Field row left>
              <Row row>
                <FieldHeader>End Date</FieldHeader>
                <FieldHelp>The end date of the ban period.</FieldHelp>
              </Row>
              <DateField
                id="End Date"
                value={endDate}
                onChange={(value) => handleChange(value, "endDate")}
              />
            </Field>
          </Row>
          <Field>
            <Row row>
              <FieldHeader>Location</FieldHeader>
              <FieldHelp>
                The location that the offender the excluded from.
              </FieldHelp>
            </Row>
            <TextField
              id="name-input"
              value={location}
              onChange={(e) => handleChange(e.target.value, "location")}
              fullWidth
              error={locationError !== ""}
              helperText={locationError}
            />
          </Field>
          <Field>
            <Row row>
              <FieldHeader>Description</FieldHeader>
              <FieldHelp>
                Any addition information about the ban, like the reasoning for
                excluding.
              </FieldHelp>
            </Row>
            <TextField
              id="name-input"
              value={description}
              onChange={(e) => handleChange(e.target.value, "description")}
              fullWidth
              multiline
              rows="5"
            />
          </Field>
        </PopOverContainer>
      </Grow>
      <PopOverActions>
        <BackButton onClick={handleClose}>Cancel</BackButton>
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Add Exclusion
        </Button>
      </PopOverActions>
    </PopOver>
  );
};

export default AddExclusion;
