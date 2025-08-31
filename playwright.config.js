// playwright.config.js
// See https://playwright.dev/docs/test-configuration for more options

/** @type {import('@playwright/test').PlaywrightTestConfig} */
import configData from './config.json';

const config = {
  //  globalSetup: './tests/utils/global-setup.js',
  globalSetup: require.resolve('./global-setup'),
  globalTeardown: require.resolve('./global-teardown'),
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
