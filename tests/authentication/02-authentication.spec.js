// tests/accounts.spec.js

import { test, expect } from '@playwright/test';
import { API_ENDPOINTS } from '../utils/apiendpoints';
import { request } from 'playwright';
import { getSignUpPayload, generateToken } from '../utils/testutils';
import configData from '../../config.json';
import fs from 'fs';

test.describe.serial('Authentication API Tests', () => {
    let userPayload;
    let token;

    test('Sign up a new user', async ({ request }) => {
        userPayload = getSignUpPayload();

        console.log('signup user details:', userPayload);
        const response = await request.post(API_ENDPOINTS.SIGN_UP, {
            data: userPayload
        });

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.message).toBe('User created successfully');
    });

    test('Verify Signed user login and Token Generation', async ({ request }) => {

        const tokenResp = await generateToken(request, userPayload);

        expect(tokenResp.response.status()).toBe(200);
        fs.writeFileSync('generatedtoken', tokenResp.token, 'utf-8');

        expect(tokenResp.token).toBeTruthy();
        
    });

    test('Sign up with existing email', async ({ request }) => {
        const response = await request.post(API_ENDPOINTS.SIGN_UP, {
            data: userPayload
        });

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody.detail).toBe('Email already registered');
    });

    test('Login with incorrect password', async ({ request }) => {
        const payload = {
            email: 'incorrect@example.com',
            password: 'incorrectPassword'
        };

        const response = await request.post(API_ENDPOINTS.LOGIN, {
            data: payload
        });

        console.log('Incorrect Password Login Request:', payload);
        console.log('Incorrect Password Login Response:', await response.text());

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody.detail).toBe('Incorrect email or password');
    });

    test('Login with incorrect email', async ({ request }) => {
        const payload = {
            ...userPayload,
            email: 'invalid@example.com'
        };

        const response = await request.post(API_ENDPOINTS.LOGIN, {
            data: payload
        });

        console.log('Wrong Email Login Request:', payload);
        console.log('Wrong Email Login Response:', await response.text());

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody.detail).toBe('Incorrect email or password');
    });
});
