import configData from '../../config.json'
import { API_ENDPOINTS } from './apiendpoints';
import { request, expect } from '@playwright/test';

let defaultCredentials = {
  email: configData.QA.userEmail,
  password: configData.QA.password
};

export function getSignUpPayload(email = null, password = null) {
  return {
    email: email || `user_${Date.now()}@test.com`,
    password: password || 'StrongPassword123'
  };
}

export async function generateToken(request, credentials = defaultCredentials) {

  const response = await request.post(`${configData.QA.url}${API_ENDPOINTS.LOGIN}`, {
    data: credentials
  });

  const responseBody = await response.json();

  expect(response.status()).toBe(200);
  const token = responseBody.access_token;

  expect(token).toBeTruthy();

  return { token, response };
}