import { test, expect } from '@playwright/test';
import { API_ENDPOINTS } from '../utils/apiendpoints';

test.describe('Server Readiness API Check', () => {
  test('Status Readiness check', async ({ request }) => {
    console.log('Starting Status Readiness check...');
    const response = await request.get(API_ENDPOINTS.HEALTH_CHECK);

    // Assert HTTP status
    expect(response.status()).toBe(200);

    // Parse and assert JSON response
    const body = await response.json();
    expect(body.status).toBe('up');
  });
});
