// @ts-check
const test= require("../../utils/basetest")
const { expect } = require("@playwright/test") 
const loginData = require("../../testdata/logindata.json")
const productData = require("../../testdata/productdata.json")

test.describe('Product Add to cart and verify all functionality',async()=>{
  test('Login To The application and Product Add to cart', async ({ loginPage,dashboardPage }) => {
    await loginPage.accessLoginPage("/client")
    await loginPage.enterEmail(loginData.ValidLoginData.Email)
    await loginPage.enterPassword(loginData.ValidLoginData.Password)
    await loginPage.clickLoginButton()
    await dashboardPage.clickAddToCartProductButton(productData.productName)
    expect(await dashboardPage.getCartLabelLocator()).toBe("1")
  });
})

