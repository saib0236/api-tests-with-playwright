import { test, expect } from '@playwright/test';
import { API_ENDPOINTS } from '../utils/apiendpoints';
import fs from 'fs';
import configData from '../../config.json';
import bookData from '../data/book.json';
import { generateToken } from '../utils/testutils';
const baseURL = configData.QA.url
const invalidToken = 'invalid_token';
let validToken = fs.readFileSync('generatedtoken', 'utf-8');
let bookId = 1;
let invalid_id = "invalid_id";


test.describe('Verify Valid & Invalid Token API Tests', () => {

  // test.beforeAll(async ({request}) => {
  //         const tokenResp = await generateToken(request);
  //         validToken = tokenResp.token;
  //     });

  test('Add a book record with invalid token', async ({ request }) => {
    const response = await request.post(API_ENDPOINTS.ADD_NEW_BOOK, {
      headers: {
        Authorization: `Bearer ${invalidToken}`,
      },
      data: bookData.CreateBook
    });

    expect(response.status()).toBe(403);
    const body = await response.json();
    expect(body.detail).toBe('Invalid token or expired token');
  });

  test('Delete book record with invalid token', async ({ request }) => {
    const response = await request.delete(API_ENDPOINTS.GET_BOOK_ID(bookId), {
      headers: {
        Authorization: `Bearer ${invalidToken}`,
      },
    });

    expect(response.status()).toBe(403);
    const body = await response.json();
    expect(body.detail).toBe('Invalid token or expired token');
  });

  test('Get book with invalid ID', async ({ request }) => {

    const response = await request.get(API_ENDPOINTS.GET_BOOK_ID(invalid_id), {
      headers: {
        Authorization: `Bearer ${validToken}`, 
      },
    });

    expect(response.status()).toBe(422);
    const body = await response.json();
    expect(body.detail[0].msg).toBe('Input should be a valid integer, unable to parse string as an integer');
  });
});
