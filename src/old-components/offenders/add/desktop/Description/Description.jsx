import React, { PureComponent } from 'react';

import { Header, HeaderText, HeaderSubText } from '../../../../global/forms';
import { NewOffenderForm } from '../../../../forms';

class Description extends PureComponent {
  render() {
    const {
      handleChange,
      name,
      gender,
      race,
      dateOfBirth,
      dateSource,
      age,
      build,
      hair,
      peculiarities
    } = this.props;
    return (
      <div>
        <Header>
          <HeaderText>Description</HeaderText>
          <HeaderSubText>
            Complete as many description fields as you can about the offender.
          </HeaderSubText>
        </Header>
        <NewOffenderForm
          handleChange={handleChange}
          data={{
            name,
            gender,
            race,
            dateOfBirth,
            dateSource,
            age,
            build,
            hair,
            peculiarities
          }}
        />
      </div>
    );
  }
}

export default Description;
