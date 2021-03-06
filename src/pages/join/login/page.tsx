import React, { useEffect } from 'react';
import { useStore } from 'effector-react';

import {
  CenterContent,
  Container,
  Card,
  Input,
  ButtonLoader,
  ErrorBox,
  Link
} from 'ui';
import { Row, Col } from 'lib/styled-components';
import {
  $emailField,
  $passwordField,
  $passwordError,
  $emailError,
  $isSubmitEnabled,
  $isFormDisabled,
  emailChange,
  passwordChange,
  formSubmitted,
  loginFetching,
  captchaPassed
} from './model';
import { Captcha } from 'lib/captcha';
import { routesPath } from 'pages';

export const LoginPage: React.FunctionComponent = () => {
  useEffect(() => {
    document.title = 'Login';
  }, []);

  return (
    <CenterContent>
      <Container justify="center" align="center">
        <Col width="370px" gap="1rem">
          <Card>
            <LoginForm />
          </Card>
          <Navigation />
        </Col>
      </Container>
    </CenterContent>
  );
};

const Navigation = () => (
  <Row justify="space-between">
    <Link to={routesPath.home}>Return back</Link>
    <Link to={routesPath.join.registration}>Account registration</Link>
  </Row>
);

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  formSubmitted();
};

const LoginForm = () => {
  const isSubmitEnabled = useStore($isSubmitEnabled);
  const isFormDisabled = useStore($isFormDisabled);
  const formError = useStore(loginFetching.error);

  return (
    <Col onSubmit={handleSubmit} tag="form" gap="1rem">
      <h1 style={{ fontSize: '1.3rem' }}>Shortcut-Link</h1>
      {formError && <ErrorBox>{formError}</ErrorBox>}
      <Email />
      <Password />
      <Captcha onChange={captchaPassed} />
      <ButtonLoader
        type="submit"
        disabled={!isSubmitEnabled}
        loader={isFormDisabled}
      >
        Continue
      </ButtonLoader>
    </Col>
  );
};

const Email = () => {
  const emailField = useStore($emailField);
  const emailError = useStore($emailError);
  const isFormDisabled = useStore($isFormDisabled);

  return (
    <Input
      type="email"
      name="email"
      autoComplete="on"
      label="Email"
      error={emailField && emailError}
      value={emailField}
      onChange={emailChange}
      disabled={isFormDisabled}
    />
  );
};

const Password = () => {
  const passwordField = useStore($passwordField);
  const passwordError = useStore($passwordError);
  const isFormDisabled = useStore($isFormDisabled);

  return (
    <Input
      type="password"
      name="password"
      autoComplete="on"
      label="Password"
      error={passwordField && passwordError}
      value={passwordField}
      onChange={passwordChange}
      disabled={isFormDisabled}
    />
  );
};
