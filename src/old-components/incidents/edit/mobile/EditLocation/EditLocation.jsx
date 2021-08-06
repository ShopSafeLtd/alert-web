import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { FullWidthButton } from '../../../../global/actions';
import { Header, HeaderText, HeaderSubText } from '../../../../global/forms';
import NewLocation from '../../../global/NewLocation/NewLocation';

const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;
const Form = styled.div`
  flex: 1;
  margin-bottom: 60px;
`;

class EditLocation extends PureComponent {
  componentDidMount() {
    this.props.setBackLinkTo(this.props.basePath);
  }

  handleSave = () => {
    this.props
      .validateLocation()
      .then(() => {
        this.props.handleSave();
        this.props.history.push(this.props.basePath);
      })
      .catch(() => {});
  };

  render() {
    const {
      loading,
      location: {
        premises,
        building,
        street,
        streetError,
        townCity,
        townError,
        county,
        postcode,
        postcodeError
      },
      handleChange
    } = this.props;

    return (
      <Page>
        <Header>
          <HeaderText>Incident Location</HeaderText>
          <HeaderSubText>Update the location for this incident.</HeaderSubText>
        </Header>
        <Form>
          <NewLocation
            newLocation={{
              premises,
              building,
              street,
              streetError,
              townCity,
              townCityError: townError,
              county,
              postcode,
              postcodeError
            }}
            handleChange={handleChange}
            loading={loading}
          />
        </Form>
        <FullWidthButton
          disabled={loading}
          text="Save Location"
          onClick={this.handleSave}
        />
      </Page>
    );
  }
}

export default EditLocation;
