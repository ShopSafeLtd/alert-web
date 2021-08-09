import React, { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import {
  Field,
  FieldHeader,
  FieldHelp,
  DateField,
  TimeField,
  Header,
  HeaderSubText,
} from "../../../../global/forms";
import { Row } from "../../../../global/layout";
import { ErrorText } from "../../../../global/typography";
import CrimeTypePopOver from "../../../global/CrimeTypePopOver/CrimeTypePopOver";

const CrimeTypes = styled.div`
  margin: 5px 0 20px;
  display: flex;
`;
const CrimeType = styled(Typography)`
  padding: 0px 0px 0px 10px;
  background: #ef5350;
  color: #fff;
  border-radius: 2px;
  display: flex;
  align-items: center;
  & + & {
    margin-left: 10px;
  }
`;
const CrimeTypeButton = styled(Button)`
  margin-left: 20px;
`;
const EmptyCrimeType = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
`;
const Svg = styled.svg`
  width: 40px;
  height: 40px;
  padding: 10px;
  cursor: pointer;
`;

const AddDescription = ({
  handleChange,
  description: {
    subject,
    subjectError,
    description,
    descriptionError,
    date,
    time,
  },
  crimeTypes,
  crimeTypesError,
  crimeTypesList,
  setCrimeTypes,
}) => {
  // state
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Header>
        <HeaderSubText>
          Complete a description of the incident and assign crime catagories to
          the incident.
        </HeaderSubText>
      </Header>
      <Field>
        <Row row vertCenter>
          <FieldHeader required error={!!subjectError}>
            Subject
          </FieldHeader>
          <FieldHelp>A short overview of the incident.</FieldHelp>
        </Row>
        <TextField
          id="subject-input"
          value={subject}
          onChange={(e) => handleChange(e.target.value, "subject")}
          error={!!subjectError}
          helperText={subjectError}
          fullWidth
        />
      </Field>
      <Row row vertCenter>
        <Field row>
          <Row row vertCenter>
            <FieldHeader required>Date</FieldHeader>
            <FieldHelp>The date that the incident occurred.</FieldHelp>
          </Row>
          <DateField
            id="date"
            fullWidth
            modal
            value={date}
            onChange={(value) => handleChange(value, "date")}
          />
        </Field>
        <Field row left>
          <Row row vertCenter>
            <FieldHeader required>Time</FieldHeader>
            <FieldHelp>The time that the incident occurred.</FieldHelp>
          </Row>
          <TimeField
            id="time-input"
            fullWidth
            value={time}
            onChange={(value) => handleChange(value, "time")}
          />
        </Field>
      </Row>
      <Field>
        <Row row vertCenter>
          <FieldHeader required error={!!crimeTypesError}>
            Crime Types
          </FieldHeader>
          <FieldHelp>
            Tag the crime catagories that are relevant to this incident.
          </FieldHelp>
          <CrimeTypeButton color="primary" onClick={() => setOpen(true)}>
            Add Crime Type
          </CrimeTypeButton>
        </Row>
        <CrimeTypes>
          {crimeTypes.length > 0 ? (
            crimeTypes.map((crimeType) => (
              <CrimeType component="div" key={crimeType}>
                {crimeTypesList.find(({ id }) => crimeType === id).name}
                <Svg
                  viewBox="0 0 24 24"
                  onClick={() => {
                    setCrimeTypes(crimeTypes.filter((id) => crimeType !== id));
                  }}
                >
                  <path
                    fill="#fff"
                    d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z"
                  />
                </Svg>
              </CrimeType>
            ))
          ) : (
            <EmptyCrimeType>
              <ErrorText>
                Please add at least one crime type to the incident.
              </ErrorText>
            </EmptyCrimeType>
          )}
        </CrimeTypes>
      </Field>
      <Field>
        <Row row vertCenter>
          <FieldHeader required error={!!descriptionError}>
            Description
          </FieldHeader>
          <FieldHelp>A more detailed description of the incident.</FieldHelp>
        </Row>
        <TextField
          id="description-input"
          value={description}
          onChange={(e) => handleChange(e.target.value, "description")}
          rows="5"
          multiline
          error={!!descriptionError}
          helperText={descriptionError}
          fullWidth
        />
      </Field>
      <CrimeTypePopOver
        crimeTypes={crimeTypes}
        open={open}
        close={() => setOpen(false)}
        setCrimeTypes={setCrimeTypes}
        selected={crimeTypes}
        crimeTypesList={crimeTypesList}
      />
    </div>
  );
};

export default AddDescription;
