import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import { Mutation } from 'react-apollo';
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
// import validate from "validate.js";
import { useMutation } from "@apollo/client";

// import ResetPasswordMutation from '../../graphql/account/mutations/ResetPasswordMutation';
import { UpdatePassword } from "graphql-src/users/mutations";
import { ProgressButton } from "../global/actions";
import { HeaderText, HeaderSubText, Field, FieldHeader } from "../global/forms";
import { useStoreActions, useStoreState } from "../../state";
import { useNavigate } from "react-router-dom";

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

const ResetPassword = ({ auth, setAuth }) => {
  const navigate = useNavigate()
  const setTitle = useStoreActions((actions) => actions.theme.setTitle);
  const setBackLinkTo = useStoreActions(
    (actions) => actions.theme.setBackLinkTo
  );
  const setBottomNav = useStoreActions((actions) => actions.theme.setBottomNav);
  const userId = useStoreState((state) => state.user.id);

  const [passwords, setPassword] = useState({
    password: "",
    passwordError: "",
    passwordConfirmation: "",
    passwordConfirmationError: "",
  });
  const [disabled, setDisabled] = useState(false);

  // mutations
  const [updatePassword] = useMutation(UpdatePassword, {
    onCompleted: (res) => {
      setDisabled(false);
      setAuth("");
      navigate(`/`);
    },
  });

  useEffect(() => {
    setTitle("Reset Password");
    setBackLinkTo("/account-settings");
    setBottomNav(false);
    return () => {
      setBottomNav(true);
      setBackLinkTo("");
    };
    // eslint-disable-next-line
  }, []);

  const handleChange = (data) => {
    setPassword({
      ...passwords,
      ...data,
    });
  };

  const validatePassword = () => {
    const password = passwords.password;
    const confirmation = passwords.passwordConfirmation;
    const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;

    if (password === "" || confirmation === "") {
      handleChange({
        passwordConfirmationError: "Please enter a new password",
      });
      return false;
    }
    if (password !== confirmation) {
      handleChange({ passwordConfirmationError: "Passwords do not match" });
      return false;
    }
    if (!regExp.test(password)) {
      handleChange({
        passwordConfirmationError:
          "Password must contain at least one number and upper case letter",
      });
      return false;
    }
    if (password.length < 8) {
      handleChange({
        passwordConfirmationError:
          "Password must be at least 8 characters long",
      });
      return false;
    }

    handleChange({
      passwordConfirmationError: "",
    });
    return true;
  };

  const handleResetPassword = () => {
    const valid = validatePassword();
    if (!valid) return null;
    setDisabled(true);
    updatePassword({
      variables: {
        id: userId,
        currentPassword: auth,
        newPassword: passwords.password,
      },
    });
  };

  return (
    <Container>
      <Page>
        <FormContainer elevation={1}>
          <Content>
            <Form>
              <Header>
                {/* {matches &&  */}
                <HeaderText>Reset Password</HeaderText>
                {/* } */}
                <HeaderSubText>
                  Your new password must be at least 8 characters long and
                  contain an uppercase letter, lowercase letter and a number.
                </HeaderSubText>
              </Header>
              <Field>
                <FieldHeader required>New Password</FieldHeader>
                <StyledTextField
                  value={passwords.password}
                  onChange={(e) => handleChange({ password: e.target.value })}
                  error={passwords.passwordError !== ""}
                  helperText={passwords.passwordError}
                  fullWidth={false} //!matches}
                  type="password"
                />
              </Field>
              <Field>
                <FieldHeader required>Confirm New Password</FieldHeader>
                <StyledTextField
                  value={passwords.passwordConfirmation}
                  onChange={(e) =>
                    handleChange({
                      passwordConfirmation: e.target.value,
                    })
                  }
                  error={passwords.passwordConfirmationError !== ""}
                  helperText={passwords.passwordConfirmationError}
                  fullWidth={false} //!matches}
                  type="password"
                />
              </Field>
            </Form>
          </Content>
          {/* {matches && ( */}
          <Actions>
            <ProgressButton
              variant="contained"
              color="primary"
              onClick={handleResetPassword}
              disabled={disabled}
            >
              Reset Password
            </ProgressButton>
          </Actions>
          {/* )} */}
          {/* {!matches && (
            <FullWidthButton
              text="Reset Password"
              onClick={handleSave}
              disabled={disabled}
            />
          )} */}
        </FormContainer>
      </Page>
    </Container>
    //           )}
    //         </MediaQuery>
    //       );
    //     }}
    //   </Mutation>
  );
};

export default ResetPassword;
