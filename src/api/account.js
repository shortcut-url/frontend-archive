import { request } from 'lib/request';
import { accountError } from './account.errors';

/**
 * Create New Account
 * @param { { email: string, password: string } } body - User data
 * @returns {Promise<{ token: string, user: { email: string } }>}
 */
const createAccount = body =>
  request('POST', '/account', { body }).catch(accountError);

/**
 * Settings for created links
 * @param {*} body
 */
const optionsLink = body =>
  request('POST', '/account/linkSettings', { body }).catch(accountError);

export const accountAPI = { createAccount, optionsLink };
