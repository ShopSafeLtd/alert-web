import React, { Component } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import AddSvg from "@material-ui/icons/Add";
import { isEqual } from "lodash-es";

import { SubHeader, ErrorText } from "../../../../global/typography";
import {
  Field,
  FieldHeader,
  DateField,
  TimeField,
} from "../../../../global/forms";
import { Row, Section } from "../../../../global/layout";
import Grow from "../Grow/Grow";

const AddIcon = styled(AddSvg)`
  margin-right: 5px;
`;
const CrimeTypeRow = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 100%;
`;
const CrimeTypes = styled.div`
  flex: 1;
  display: flex;
`;
const CrimeType = styled(Typography)`
  padding: 10px 10px 10px 15px;
  background: #ef5350;
  color: #fff;
  border-radius: 2px;
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
`;
const Close = styled.svg`
  height: 18px;
  width: 18px;
  margin-left: 5px;
  cursor: pointer;
`;
const VertCenter = styled.div`
  display: flex;
  align-items: center;
`;
const Center = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

class EditDescription extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.loading !== nextProps.loading) return true;
    if (!isEqual(this.props.crimeTypes, nextProps.crimeTypes)) return true;
    if (!isEqual(this.props.description, nextProps.description)) return true;
    return false;
  }

  render() {
    const {
      description: {
        subject,
        subjectError,
        description,
        descriptionError,
        date,
        dateError,
        time,
        timeError,
      },
      crimeTypes,
      handleChange,
      removeCrimeType,
      openCrimeTypes,
      loading,
    } = this.props;

    return (
      <Section width="50%" elevation={1}>
        <SubHeader>Description</SubHeader>
        <Field>
          <FieldHeader required>Subject</FieldHeader>
          <TextField
            id="subject-input"
            value={subject}
            fullWidth
            onChange={(value) => handleChange(value.target.value, "subject")}
            disabled={loading}
            error={!!subjectError}
            helperText={subjectError}
          />
        </Field>
        <Field>
          <FieldHeader required>Description</FieldHeader>
          <TextField
            id="description-input"
            rows="3"
            fullWidth
            multiline
            value={description}
            onChange={(value) =>
              handleChange(value.target.value, "description")
            }
            disabled={loading}
            error={!!descriptionError}
            helperText={descriptionError}
          />
        </Field>
        <Row>
          <Field>
            <FieldHeader required>Date</FieldHeader>
            <DateField
              id="date-input"
              value={date}
              onChange={(value) => handleChange(value, "date")}
              disabled={loading}
              error={!!dateError}
              helperText={dateError}
            />
          </Field>
          <Field>
            <FieldHeader required>Time</FieldHeader>
            <TimeField
              id="time-input"
              value={time}
              onChange={(value) => handleChange(value, "time")}
              disabled={loading}
              error={!!timeError}
              helperText={timeError}
            />
          </Field>
        </Row>
        <Field>
          <FieldHeader required>Crime Types</FieldHeader>
          <CrimeTypeRow>
            {crimeTypes?.length > 0 ? (
              <CrimeTypes>
                <Grow>
                  {[...new Set(crimeTypes)].map((el) => {
                    return (
                      <CrimeType component="div" key={el?.id}>
                        {el?.name}
                        <Close
                          viewBox="0 0 24 24"
                          onClick={() => removeCrimeType(el?.id)}
                        >
                          <path
                            fill="#fff"
                            d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
                          />
                        </Close>
                      </CrimeType>
                    );
                  })}
                </Grow>
                <VertCenter>
                  <div>
                    <Button
                      color="primary"
                      size="small"
                      disabled={loading}
                      onClick={openCrimeTypes}
                    >
                      <AddIcon />
                      Add Crime Type
                    </Button>
                  </div>
                </VertCenter>
              </CrimeTypes>
            ) : (
              <Center>
                <ErrorText>Please add at least one crime type.</ErrorText>
                <Button
                  color="primary"
                  onClick={openCrimeTypes}
                  disabled={loading}
                >
                  <AddIcon />
                  Add Crime Types
                </Button>
              </Center>
            )}
          </CrimeTypeRow>
        </Field>
      </Section>
    );
  }
}

export default EditDescription;
