// @ts-check
const { devices } = require('@playwright/test');
const testConfig = require("./testconfig")

/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  testDir: './tests/specs/crossbrowsertest',
  workers:2,
  retries:1,
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    timeout: 10000
  },
  reporter: [['list'],['allure-playwright']],
  use: {
    actionTimeout: 0,
    trace: 'retain-on-failure',
    screenshot: "only-on-failure",
    video:"retain-on-failure"   

  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Desktop Chrome Browser',
      use: {
        ...devices['Desktop Chrome'],
        baseURL:testConfig.url,
        headless:false,
      },
    },
    {
      name: 'Desktop Firefox Browser',
      use: {
        ...devices['Desktop Firefox'],
        baseURL:testConfig.url,
        headless:false,
      },
    },
    {
      name: 'Desktop Safari Browser',
      use: {
        ...devices['Desktop Safari'],
        baseURL:testConfig.url,
        headless:false,
      },
    },
    {
      name: 'Desktop Edge Browser',
      use: {
        ...devices['Desktop Edge'],
        baseURL:testConfig.url,
        headless:false,
      },
    },
    {
      name: 'Mobile Chrome Browser',
      use: {
        ...devices['Pixel 5'],
        baseURL:testConfig.url,
        headless:false,
      },
    },
    {
      name: 'Mobile Safari Browser',
      use: {
        ...devices['iPhone 13 Pro'],
        baseURL:testConfig.url,
        headless:false,
      },
    }
  ],

};

module.exports = config;
