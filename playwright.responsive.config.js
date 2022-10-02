// @ts-check
const testConfig = require("./testconfig")

/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  testDir: './tests/specs/responsivenesstest',
  //testMatch:'vp1024x1366.spec.js',
  workers:2,
  retries:1,
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    timeout: 10000
  },
  reporter: [['list'],['html'],['allure-playwright']],
  use: {
    actionTimeout: 0,
    trace: 'retain-on-failure',
    screenshot: "only-on-failure",
    video:"retain-on-failure"   

  },

  /* Configure projects for major viewport size */
  projects: [
      {
        name:"Responsiveness Test on Chromium Browser",
        use: {
          browserName: `chromium`,
          baseURL:testConfig.url,
          headless: !true,
          ignoreHTTPSErrors: true,
          screenshot: `only-on-failure`,
          video: `retain-on-failure`,
          trace: `retain-on-failure`,
          launchOptions: {
            slowMo: 0
          }
        }
    },
  //   {
  //     name:"Responsiveness Test on Firefox Browser",
  //     use: {
  //       browserName: `firefox`,
  //       baseURL:testConfig.url,
  //       headless: !true,
  //       ignoreHTTPSErrors: true,
  //       screenshot: `only-on-failure`,
  //       video: `retain-on-failure`,
  //       trace: `retain-on-failure`,
  //       launchOptions: {
  //         slowMo: 0
  //       }
  //     }
  // },
    
  ],

};

module.exports = config;
