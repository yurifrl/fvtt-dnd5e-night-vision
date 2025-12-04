import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 60000,
  retries: 0,
  use: {
    baseURL: 'http://localhost:30000',
    headless: true,
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'docker compose up',
    url: 'http://localhost:30000',
    timeout: 120000,
    reuseExistingServer: true,
  },
});
