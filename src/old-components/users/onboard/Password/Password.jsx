import React, { PureComponent } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

import {
  HeaderText,
  Field,
  FieldHeader,
  HeaderSubText
} from '../../../global/forms';

const Page = styled.div`
  width: 100%;
  padding: 0px 0px 60px;
  overflow: auto;
  @media (min-width: 1024px) {
    padding: 0px;
  }
`;
const Header = styled.div`
  @media (min-width: 1024px) {
    padding: 0px 0px 10px;
  }
`;
const StyledTextField = styled(TextField)`
  @media (min-width: 1024px) {
    width: 250px;
  }
`;

class OnboardPassword extends PureComponent {
  render() {
    const {
      mobile,
      values: { password, passwordError, confirm, confirmError },
      handleChange
    } = this.props;

    return (
      <Page>
        <Header>
          <HeaderText>Set Password</HeaderText>
          <HeaderSubText>
            Please set you new password, you will use this password when ever
            you log into alert in the future.
          </HeaderSubText>
        </Header>
        <Field>
          <FieldHeader required>New Password</FieldHeader>
          <StyledTextField
            value={password}
            onChange={handleChange('password')}
            error={!!passwordError}
            helperText={passwordError}
            fullWidth={!mobile}
            type="password"
          />
        </Field>
        <Field>
          <FieldHeader required>Confirm New Password</FieldHeader>
          <StyledTextField
            value={confirm}
            onChange={handleChange('confirm')}
            error={!!confirmError}
            helperText={confirmError}
            fullWidth={!mobile}
            type="password"
          />
        </Field>
      </Page>
    );
  }
}

export default OnboardPassword;
