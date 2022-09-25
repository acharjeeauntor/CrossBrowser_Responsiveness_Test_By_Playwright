// @ts-check
const { test, expect } = require('@playwright/test');
const LoginPage = require("../../pageobjects/loginpage")
const RegisterPage = require("../../pageobjects/registerpage")
// const DashboardPage = require("../../pageobjects/dashboardpage")
// const loginData = require("../../testdata/logindata.json")
// const productData = require("../../testdata/productdata.json")

let loginPage,registerPage

test.describe('Responsiveness test for ViewPort Size:( 1121 x 1024 )',async()=>{
    test.use({ viewport: { width: 1121, height: 1024 } });
  test('Verify for large screen(>=1121) the mail address will be visible', async ({ page }) => {
    loginPage = new LoginPage(page)
    registerPage=new RegisterPage(page)
    await loginPage.accessLoginPage("/client")
    expect(await loginPage.emailAddressLocator(),'Email Address is not showing in the top header').toBeVisible()
    await loginPage.clickRegisterButton()
    expect(await registerPage.getRegisterBtnLocator()).toHaveValue("Register")
    expect(await registerPage.getRegisterBtnLocator(),'Register button is not showing').toBeVisible()
  });
})

