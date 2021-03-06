import { SyntheticEvent } from 'react';
import {
  createEffect,
  createEvent,
  createStore,
  createStoreObject,
  combine,
  Store
} from 'effector';

import { createFetching } from 'lib/fetching';
import { emailValidator, passwordValidator } from 'lib/validators';
import { history } from 'lib/routing';
import { tokenChange, trimEvent } from 'features/common';
import { sessionAPI, CreateResponse } from 'api/session';

export interface LoginData {
  email: string;
  password: string;
}

export const emailChange = createEvent<SyntheticEvent<HTMLInputElement>>();
export const passwordChange = createEvent<SyntheticEvent<HTMLInputElement>>();
export const formSubmitted = createEvent<void>();
export const captchaPassed = createEvent<void>();

export const loginProcessing = createEffect<LoginData, CreateResponse>();

export const loginFetching = createFetching(loginProcessing);

/* Email */
export const $emailField = createStore<string>('');
export const $emailError = $emailField.map(email => emailValidator(email));
const $isEmailCurrent = $emailError.map(email => email === null);

/* Password */
export const $passwordField = createStore<string>('');
export const $passwordError: Store<
  string | null
> = $passwordField.map(password => passwordValidator(password));
const $isPasswordCurrent: Store<boolean> = $passwordError.map(
  password => password === null
);

/* Captcha */
export const $captcha = createStore<boolean>(false);

/* Form */
export const $form = createStoreObject({
  email: $emailField,
  password: $passwordField
});

const $isFormValid = combine(
  $isEmailCurrent,
  $isPasswordCurrent,
  $captcha,
  (email, password, captcha) => email && password && captcha
);

export const $isFormDisabled = loginFetching.isLoading;

export const $isSubmitEnabled = combine(
  $isFormValid,
  $isFormDisabled,
  (isFormValid, isFormDisabled) => isFormValid && !isFormDisabled
);

$emailField.on(emailChange.map(trimEvent), (_, email) => email);
$passwordField.on(passwordChange.map(trimEvent), (_, password) => password);

$captcha.on(captchaPassed, () => true);

formSubmitted.watch(() => {
  if (!$isSubmitEnabled.getState()) return;

  const form = $form.getState();
  loginProcessing(form);
});

loginProcessing.use(sessionAPI.create);

loginProcessing.done.watch(({ result: { token } }) => {
  tokenChange(token);
  history.push('/');
});
