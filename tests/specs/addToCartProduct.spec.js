// @ts-check
const { test, expect } = require('@playwright/test');
const LoginPage = require("../pageobjects/loginpage")
const DashboardPage = require("../pageobjects/dashboardpage")
const loginData = require("../testdata/logindata.json")
const productData = require("../testdata/productdata.json")

let loginPage,dashboardPage

test.describe('Product Add to cart and verify all functionality',async()=>{
  test('Login To The application and Product Add to cart', async ({ page }) => {
    loginPage = new LoginPage(page)
    dashboardPage = new DashboardPage(page)
    await loginPage.accessLoginPage("/client")
    await loginPage.enterEmail(loginData.ValidLoginData.Email)
    await loginPage.enterPassword(loginData.ValidLoginData.Password)
    await loginPage.clickLoginButton()
    await dashboardPage.clickAddToCartProductButton(productData.productName)
    expect(await dashboardPage.getCartLabelLocator()).toBe("1")
  });
})

