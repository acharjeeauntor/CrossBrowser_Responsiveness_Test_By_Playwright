// @ts-check
const { test, expect } = require('@playwright/test');
const LoginPage = require("../../pageobjects/loginpage")
const RegisterPage = require("../../pageobjects/registerpage")
// const DashboardPage = require("../../pageobjects/dashboardpage")
// const loginData = require("../../testdata/logindata.json")
// const productData = require("../../testdata/productdata.json")

let loginPage,registerPage

test.describe('Responsiveness test for ViewPort Size:( 360 x 640 )',async()=>{
    test.use({ viewport: { width: 360, height: 640 } });
  test('Verify for small screen(<1121) the mail address will not be visible', async ({ page }) => {
    loginPage = new LoginPage(page)
    registerPage=new RegisterPage(page)
    await loginPage.accessLoginPage("/client")
    expect(await loginPage.emailAddressLocator(),'Email Address is showing in the top header').not.toBeVisible()
    await loginPage.clickRegisterButton()
    expect(await registerPage.getRegisterBtnLocator()).toHaveValue("Register")
    expect(await registerPage.getRegisterBtnLocator(),'Register button is not showing').toBeVisible()
  });
})

