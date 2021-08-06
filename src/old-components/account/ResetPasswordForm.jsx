import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import Paper from '@material-ui/core/Paper';
import MediaQuery from 'react-responsive';
import TextField from '@material-ui/core/TextField';
import validate from 'validate.js';

import ResetPasswordMutation from '../../graphql/account/mutations/ResetPasswordMutation';
import { FullWidthButton, ProgressButton } from '../global/actions';
import { HeaderText, HeaderSubText, Field, FieldHeader } from '../global/forms';
import { useStoreActions } from '../../state';

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

const ResetPassword = ({ auth, history }) => {
  const setTitle = useStoreActions(actions => actions.theme.setTitle);
  const setNavbarAction = useStoreActions(
    actions => actions.theme.setNavbarAction
  );
  const setBackLinkTo = useStoreActions(actions => actions.theme.setBackLinkTo);
  const setBottomNav = useStoreActions(actions => actions.theme.setBottomNav);

  const [passwords, setPassword] = useState({
    password: '',
    passwordError: '',
    passwordConfirmation: '',
    passwordConfirmationError: ''
  });
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setTitle('Reset Password');
    setNavbarAction('backLink');
    setBackLinkTo('/account-settings');
    setBottomNav(false);
    !auth && history.push('/account-settings/reset-password');
    return () => {
      setNavbarAction('default');
      setBottomNav(true);
      setBackLinkTo('');
    };
    // eslint-disable-next-line
  }, []);

  const handleChange = data => {
    setPassword({
      ...passwords,
      ...data
    });
  };

  const validatePassword = () =>
    new Promise((resolve, reject) => {
      const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
      if (
        validate(
          { password: passwords.password },
          { password: { length: { minimum: 8 } } }
        ) === undefined
      ) {
        handleChange({ passwordError: '' });
        if (regExp.test(passwords.password)) {
          handleChange({ passwordError: '' });
          if (passwords.password === passwords.passwordConfirmation) {
            handleChange({ passwordConfirmationError: '' });
            resolve();
          } else {
            handleChange({
              passwordConfirmationError: 'Passwords do not match.'
            });
            reject();
          }
        } else {
          handleChange({
            passwordError:
              'Password must contain at least one number and upper case letter.'
          });
          reject();
        }
      } else {
        handleChange({
          passwordError: 'Password must be at least 8 characters long.'
        });
        reject();
      }
    });

  return (
    <Mutation mutation={ResetPasswordMutation}>
      {resetPassword => {
        const handleSave = () => {
          validatePassword()
            .then(async () => {
              setDisabled(true);
              await resetPassword({
                variables: {
                  password: passwords.password
                }
              });
              setDisabled(false);
              history.push('/account-settings');
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
                            Your new password must be at least 8 characters long
                            and contain an uppercase letter, lowercase letter
                            and a number.
                          </HeaderSubText>
                        </Header>
                        <Field>
                          <FieldHeader required>New Password</FieldHeader>
                          <StyledTextField
                            value={passwords.password}
                            onChange={e =>
                              handleChange({ password: e.target.value })
                            }
                            error={passwords.passwordError !== ''}
                            helperText={passwords.passwordError}
                            fullWidth={!matches}
                            type="password"
                          />
                        </Field>
                        <Field>
                          <FieldHeader required>
                            Confirm New Password
                          </FieldHeader>
                          <StyledTextField
                            value={passwords.passwordConfirmation}
                            onChange={e =>
                              handleChange({
                                passwordConfirmation: e.target.value
                              })
                            }
                            error={passwords.passwordConfirmationError !== ''}
                            helperText={passwords.passwordConfirmationError}
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
                          onClick={handleSave}
                          disabled={disabled}
                        >
                          Reset Password
                        </ProgressButton>
                      </Actions>
                    )}
                    {!matches && (
                      <FullWidthButton
                        text="Reset Password"
                        onClick={handleSave}
                        disabled={disabled}
                      />
                    )}
                  </FormContainer>
                </Page>
              </Container>
            )}
          </MediaQuery>
        );
      }}
    </Mutation>
  );
};

export default ResetPassword;
