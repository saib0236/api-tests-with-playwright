// playwright.config.js
// See https://playwright.dev/docs/test-configuration for more options

/** @type {import('@playwright/test').PlaywrightTestConfig} */
import configData from './config.json';

const config = {
//  globalSetup: './tests/utils/global-setup.js',
  use: {
    browserName: 'chromium', // Use Chrome/Chromium only
    headless: true,
    baseURL: configData.QA.url,
    // ...other options
  },
  testDir: './tests',
  reporter: [
    ['list'],
    ['html', { outputFolder: 'test-results/html-report' }],
    ['allure-playwright']
  ],
  workers: 1,
  // Add more config options as needed
};

module.exports = config;
