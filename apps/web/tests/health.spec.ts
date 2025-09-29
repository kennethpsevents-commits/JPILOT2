import { test, expect } from '@playwright/test';

test.describe('Health Endpoints', () => {
  test('should return live status', async ({ request }) => {
    const response = await request.get('/api/health/live');
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty('status', 'ok');
    expect(data).toHaveProperty('timestamp');
    expect(data).toHaveProperty('uptime');
  });

  test('should return version information', async ({ request }) => {
    const response = await request.get('/api/health/version');
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty('version');
    expect(data).toHaveProperty('name');
    expect(data).toHaveProperty('timestamp');
  });
});
