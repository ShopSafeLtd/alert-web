import React, { PureComponent } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

import { IoArrowBackOutline } from 'react-icons/io5';
import { Typography, Row } from 'antd';

import { Field, FieldHeader } from '../../../global/forms';

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
      handleChange,
      handleBack,
    } = this.props;

    return (
      <Page>
        <Header>
          <Row align="middle">
            <IoArrowBackOutline
              onClick={handleBack}
              role="button"
              size="24px"
              color="#1a3353"
            />
            <div style={{ width: '8px' }} />
            <Typography.Title style={{ margin: 0 }} level={3}>
              Set Password
            </Typography.Title>
          </Row>
          <div style={{ height: '10px' }} />
          <Typography.Text>
            Please set your password, you will use this to log into Alert in the
            future. It must contain upper and lower case letters, a number, and
            be at least 8 characters long.
          </Typography.Text>
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
