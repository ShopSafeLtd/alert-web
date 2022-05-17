import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import validate from 'validate.js';
import BackIcon from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';
import { useLazyQuery } from '@apollo/react-hooks';

import logo from '../../images/icon-512.png';
import { FullWidthButton } from '../global/actions';
import { Field, FieldHeader } from '../global/forms';
import { ErrorText } from '../global/typography';
import Auth from '../../auth/Auth';
import Loading from '../global/Loading/Loading';
import { CurrentUser } from '../../graphql/users/queries';
import { useStoreActions } from '../../state';
import { useNavigate } from 'react-router-dom';

const auth = new Auth();

const LoginPage = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LoginContainer = styled.div`
  background: #fff;
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media (min-width: 1024px) {
    border-radius: 5px;
    max-width: 400px;
    max-height: 500px;
    position: relative;
  }
`;
const Logo = styled.img`
  width: 115px;
  @media (min-width: 1024px) {
    width: 90px;
  }
`;
const LoginHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px 0 0 0;
  @media (min-width: 1024px) {
    margin: 30px 0 0;
  }
`;
const LoginForm = styled.form`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ForgotPassword = styled(Typography)`
  text-align: center;
  cursor: pointer;
  margin-top: 1rem;
  color: #616161;
  padding-bottom: 20px;
  &:hover {
    text-decoration: underline;
  }
`;
const Text = styled(Typography)`
  text-align: center;
  margin: 10px 0 20px;
`;
const BackButton = styled(Button)`
  position: absolute !important;
  top: 10px;
  left: 10px;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #e0e0e0;
  direction: ltr;
  overflow: hidden;
  z-index: -1;
`;

const Svg = styled.svg`
  height: 100%;
  width: 100%;
  position: relative;
`;

const Form = styled.div`
  width: 100%;
  max-width: 80%;
`;

const Spacer = styled.div`
  flex: 1;
`;
const LoginTitle = styled.h1`
  font-family: Chalet;
  font-size: 50px;
  margin: 5px 0 0;
  text-align: center;
  color: #9e9e9e;
  font-weight: 400;
`;

const LOGIN = 'LOGIN';
const RESET = 'RESET';

const Login = () => {
  const navigate = useNavigate()
  const setCurrentUser = useStoreActions(actions => actions.user.setUser);
  const setCurrentScheme = useStoreActions(actions => actions.scheme.setScheme);

  // state
  const [loginForm, setLoginForm] = useState({
    emailAddress: '',
    emailAddressError: null,
    password: '',
    passwordError: null
  });
  const [page, setPage] = useState(LOGIN);
  const [status, setStatus] = useState({
    loggingIn: false,
    loginError: null
  });

  // queries
  const [getUser, { data }] = useLazyQuery(CurrentUser, {
    onCompleted: ({ currentUser }) => {
      if (!!currentUser) {
        setCurrentUser({
          email: currentUser.email,
          fullName: currentUser.fullName,
          id: currentUser.id,
          onboarded: !currentUser.newUser,
          organisation: currentUser.organisation
        });
        if (currentUser.schemes.length > 0) {
          setCurrentUser({ role: currentUser.schemes[0].role });
          setCurrentScheme({
            id: currentUser.schemes[0].scheme.id
          });
          window.localStorage.setItem(
            'currentScheme',
            currentUser.schemes[0].scheme.id
          );
        }
        navigate('/incidents');
      }
    },
    fetchPolicy: 'network-only'
  });

  // effects
  useEffect(() => {}, [data]);

  // functions
  const handleChange = (value, field) => {
    setLoginForm({
      ...loginForm,
      [field]: value
    });
  };

  const validateLogin = () =>
    new Promise((resolve, reject) => {
      const { emailAddress, password } = loginForm;

      const emailAddressValid =
        validate({ email: emailAddress }, { email: { email: true } }) ===
        undefined;
      const passwordValid = password !== '';

      setLoginForm({
        ...loginForm,
        emailAddressError: emailAddressValid
          ? null
          : 'Must be a valid email address',
        passwordError: passwordValid ? null : "Can't be blank"
      });

      if (emailAddressValid && passwordValid) {
        resolve();
      } else {
        reject();
      }
    });

  const validateReset = () =>
    new Promise((resolve, reject) => {
      const emailAddressValid =
        validate(
          { email: loginForm.emailAddress },
          { email: { email: true } }
        ) === undefined;

      if (!emailAddressValid) {
        setLoginForm({
          ...loginForm,
          emailAddressError: 'Must be a valid email address'
        });
      } else {
        setLoginForm({ ...loginForm, emailAddressError: '' });
      }

      if (emailAddressValid) {
        resolve();
      } else {
        reject();
      }
    });

  const onSubmit = async e => {
    e.preventDefault();

    if (page === LOGIN) {
      validateLogin()
        .then(() => {
          setStatus({
            ...status,
            loggingIn: true
          });
          auth.login({
            emailAddress: loginForm.emailAddress,
            password: loginForm.password,
            success: () => {
              setTimeout(() => {}, 10000);
              getUser();
            },
            errorCb: error => {
              setStatus({
                ...status,
                loginError: error.text,
                loggingIn: false
              });
            }
          });
        })
        .catch(() => {});
    } else if (page === RESET) {
      validateReset()
        .then(() => {
          setStatus({
            ...status,
            loggingIn: true
          });
          auth.resetPassword(
            loginForm.emailAddress,
            res => {
              setStatus({
                ...status,
                loginError: res,
                loggingIn: false
              });
              setPage(LOGIN);
            },
            e =>
              setStatus({
                ...status,
                loginError: e.text,
                loggingIn: false
              })
          );
        })
        .catch(() => {});
    }
  };

  return status.loggingIn ? (
    <Loading noHeight />
  ) : (
    <LoginPage>
      <Background>
        <Svg
          xmlns="https://www.w3.org/2000/svg"
          viewBox="0 0 1440 810"
          preserveAspectRatio="xMinYMin slice"
          aria-hidden="true"
        >
          <path
            fill="#efefee"
            d="M592.66 0c-15 64.092-30.7 125.285-46.598 183.777C634.056 325.56 748.348 550.932 819.642 809.5h419.672C1184.518 593.727 1083.124 290.064 902.637 0H592.66z"
          />
          <path
            fill="#f6f6f6"
            d="M545.962 183.777c-53.796 196.576-111.592 361.156-163.49 490.74 11.7 44.494 22.8 89.49 33.1 134.883h404.07c-71.294-258.468-185.586-483.84-273.68-625.623z"
          />
          <path
            fill="#f7f7f7"
            d="M153.89 0c74.094 180.678 161.088 417.448 228.483 674.517C449.67 506.337 527.063 279.465 592.56 0H153.89z"
          />
          <path
            fill="#fbfbfc"
            d="M153.89 0H0v809.5h415.57C345.477 500.938 240.884 211.874 153.89 0z"
          />
          <path
            fill="#ebebec"
            d="M1144.22 501.538c52.596-134.583 101.492-290.964 134.09-463.343 1.2-6.1 2.3-12.298 3.4-18.497 0-.2.1-.4.1-.6 1.1-6.3 2.3-12.7 3.4-19.098H902.536c105.293 169.28 183.688 343.158 241.684 501.638v-.1z"
          />
          <path
            fill="#e1e1e1"
            d="M1285.31 0c-2.2 12.798-4.5 25.597-6.9 38.195C1321.507 86.39 1379.603 158.98 1440 257.168V0h-154.69z"
          />
          <path
            fill="#e7e7e7"
            d="M1278.31,38.196C1245.81,209.874 1197.22,365.556 1144.82,499.838L1144.82,503.638C1185.82,615.924 1216.41,720.211 1239.11,809.6L1439.7,810L1439.7,256.768C1379.4,158.78 1321.41,86.288 1278.31,38.195L1278.31,38.196z"
          />
        </Svg>
      </Background>
      <LoginContainer>
        <LoginHeader>
          <Logo src={logo} />
          <LoginTitle>alert!</LoginTitle>
        </LoginHeader>
        {status.loginError !== null && (
          <ErrorText>{status.loginError}</ErrorText>
        )}
        <LoginForm onSubmit={onSubmit}>
          {page === LOGIN ? (
            <Form>
              <Field>
                <FieldHeader>Email Address</FieldHeader>
                <TextField
                  id="email-address"
                  value={loginForm.emailAddress}
                  onChange={e => {
                    handleChange(e.target.value, 'emailAddress');
                  }}
                  error={!!loginForm.emailAddressError}
                  helperText={loginForm.emailAddressError}
                  fullWidth
                />
              </Field>
              <Field>
                <FieldHeader>Password</FieldHeader>
                <TextField
                  id="password"
                  type="password"
                  value={loginForm.password}
                  onChange={e => handleChange(e.target.value, 'password')}
                  error={!!loginForm.passwordError}
                  helperText={loginForm.passwordError}
                  fullWidth
                />
              </Field>
              <ForgotPassword onClick={() => setPage(RESET)}>
                Don't remember your password?
              </ForgotPassword>
            </Form>
          ) : (
            <Form>
              <BackButton color="primary" onClick={() => setPage(LOGIN)}>
                <BackIcon />
                Back
              </BackButton>
              <Text>
                Please enter your email address, We will send you an email to
                reset your password.
              </Text>
              <Field>
                <FieldHeader>Email Address</FieldHeader>
                <TextField
                  id="email-address"
                  value={loginForm.emailAddress}
                  onChange={e => {
                    handleChange(e.target.value, 'emailAddress');
                  }}
                  error={loginForm.emailAddressError !== null}
                  helperText={loginForm.emailAddressError}
                  fullWidth
                />
              </Field>
            </Form>
          )}
          <Spacer />
          <FullWidthButton
            text={page === LOGIN ? 'Login' : 'Reset Password'}
            position="STATIC"
          />
        </LoginForm>
      </LoginContainer>
    </LoginPage>
  );
};

export default Login;
