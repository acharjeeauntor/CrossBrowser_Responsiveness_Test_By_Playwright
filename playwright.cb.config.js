// @ts-check
const { devices } = require('@playwright/test');
const testConfig = require("./testconfig")

/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  testDir: './tests',
  workers:3,
  retries:1,
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    timeout: 10000
  },
  reporter: 'html',
  use: {
    actionTimeout: 0,
    trace: 'retain-on-failure',
    screenshot: "only-on-failure",
    video:"retain-on-failure"   

  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        baseURL:testConfig.url,
        headless:false,
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        baseURL:testConfig.url,
        headless:false,
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        baseURL:testConfig.url,
        headless:false,
      },
    },
    {
      name: 'edge',
      use: {
        ...devices['Desktop Edge'],
        baseURL:testConfig.url,
        headless:false,
      },
    },
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 5'],
        baseURL:testConfig.url,
        headless:false,
      },
    },
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPhone 13 Pro'],
        baseURL:testConfig.url,
        headless:false,
      },
    }
  ],

};

module.exports = config;
