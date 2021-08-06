import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import MediaQuery from 'react-responsive';
import TextField from '@material-ui/core/TextField';

import { FullWidthButton, ProgressButton } from '../global/actions';
import { HeaderText, HeaderSubText, Field, FieldHeader } from '../global/forms';
import Auth from '../../auth/Auth';
import { useStoreActions, useStoreState } from '../../state';

const auth = new Auth();

const Container = styled.div`
  min-height: calc(100vh - 56px);
  width: 100%;
  display: flex;
  justify-content: center;
  @media (min-width: 1024px) {
    height: calc(100vh - 56px);
  }
`;
const Page = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  @media (min-width: 1024px) {
    padding: 15px 20px;
    max-width: 1200px;
  }
`;
const FormContainer = styled(Paper)`
  flex: 1;
  display: flex;
  width: 100%;
  flex-direction: column;
`;
const Actions = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  @media (min-width: 1024px) {
    padding: 20px 90px 40px;
  }
`;
const Content = styled.div`
  flex: 1;
  display: flex;
  padding: 15px 20px;
  @media (min-width: 1024px) {
    overflow: auto;
    padding: 0px 90px;
  }
`;
const Form = styled.div`
  width: 100%;
  padding: 0px 0px 60px;
  overflow: auto;
  @media (min-width: 1024px) {
    padding: 0px;
  }
`;
const Header = styled.div`
  @media (min-width: 1024px) {
    padding: 40px 0px 10px;
  }
`;
const StyledTextField = styled(TextField)`
  @media (min-width: 1024px) {
    width: 250px;
  }
`;

const ResetPassword = ({ setAuth, history }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const user = useStoreState(state => state.user);
  const setTitle = useStoreActions(actions => actions.theme.setTitle);
  const setNavbarAction = useStoreActions(
    actions => actions.theme.setNavbarAction
  );
  const setBottomNav = useStoreActions(actions => actions.theme.setBottomNav);
  const setBackLinkTo = useStoreActions(actions => actions.theme.setBackLinkTo);

  useEffect(() => {
    setTitle('Reset Password');
    setNavbarAction('backLink');
    setBackLinkTo('/account-settings');
    setBottomNav(false);
    return () => {
      setNavbarAction('default');
      setBottomNav(true);
      setBackLinkTo('');
    };
    // eslint-disable-next-line
  }, []);

  const handleChange = name => event => {
    setPassword(event.target.value);
  };

  const validate = () =>
    new Promise((resolve, reject) => {
      this.setState({
        passwordError: !!password ? '' : 'Please enter your password.'
      });
      !!password ? resolve() : reject();
    });

  const login = () => {
    validate()
      .then(() => {
        auth.login({
          emailAddress: user.emailAddress,
          password,
          success: () => {
            setAuth(true);
            history.push('/account-settings/reset-password/new');
          },
          errorCb: error => {
            setError(error);
          }
        });
      })
      .catch(() => {});
  };

  return (
    <MediaQuery minDeviceWidth={1024}>
      {matches => (
        <Container>
          <Page>
            <FormContainer elevation={1}>
              <Content>
                <Form>
                  <Header>
                    {matches && <HeaderText>Reset Password</HeaderText>}
                    <HeaderSubText>
                      Please enter your current password to confirm that its
                      you.
                    </HeaderSubText>
                  </Header>
                  <Field>
                    <FieldHeader required>Password</FieldHeader>
                    <StyledTextField
                      value={password}
                      onChange={handleChange('password')}
                      error={error !== ''}
                      helperText={error}
                      fullWidth={!matches}
                      type="password"
                    />
                  </Field>
                </Form>
              </Content>
              {matches && (
                <Actions>
                  <ProgressButton
                    variant="contained"
                    color="primary"
                    onClick={login}
                  >
                    Enter New Password
                  </ProgressButton>
                </Actions>
              )}
              {!matches && (
                <FullWidthButton text="Enter New Password" onClick={login} />
              )}
            </FormContainer>
          </Page>
        </Container>
      )}
    </MediaQuery>
  );
};

export default ResetPassword;
