import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Chip from '@material-ui/core/Chip';
import AddIcon from '@material-ui/icons/Add';

import { Section, SectionLoading } from '../../../../global/layout';
import { EditOffenderForm } from '../../../../forms';
import { SubHeader } from '../../../../global/typography';
import { Field, FieldHeader } from '../../../../global/forms';

const OffenderWarnings = styled.div`
  margin-top: 10px;
  display: flex;
`;
const OffenderWarning = styled(Chip)`
  margin-right: 8px;
`;

class EditDescription extends PureComponent {
  render() {
    const {
      data: {
        name,
        age,
        gender,
        race,
        dateOfBirth,
        dateSource,
        build,
        hair,
        peculiarities,
        labels
      },
      handleChange,
      openAddLabel,
      removeLabel,
      loading,
      ageSection
    } = this.props;
    return (
      <Section Section width="100%" elevation={1}>
        {!!loading && <SectionLoading />}
        <SubHeader>Offender Details</SubHeader>
        <EditOffenderForm
          handleChange={handleChange}
          data={{
            name,
            age,
            gender,
            race,
            dateOfBirth,
            dateSource,
            build,
            hair,
            peculiarities
          }}
          loading={loading}
          ageSection={ageSection}
          setAgeSection={section => handleChange(section, 'ageSection')}
        />
        <Field>
          <FieldHeader>Offender Warnings</FieldHeader>
          <OffenderWarnings>
            {labels.length > 0 &&
              labels.map(({ id, name }) => (
                <OffenderWarning
                  key={id}
                  label={name}
                  onDelete={() => removeLabel(id)}
                />
              ))}
            <Chip
              icon={<AddIcon />}
              label="Add Label"
              clickable
              color="primary"
              onClick={openAddLabel}
            />
          </OffenderWarnings>
        </Field>
      </Section>
    );
  }
}

export default EditDescription;
