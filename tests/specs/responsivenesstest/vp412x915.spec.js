// @ts-check
const test= require("../../utils/basetest")
const { expect } = require("@playwright/test") 
const productData = require("../../testdata/productdata.json")
const loginData = require("../../testdata/logindata.json")
const dashboardData=require("../../testdata/dashboarddata.json")
const Common = require("../../utils/common")

let common,token
common = new Common()

test.describe('Responsiveness test for ViewPort Size:( 412 x 915 )',async()=>{
    test.use({ viewport: { width: 412, height: 915 } });
    test.beforeAll(async () => {
      token = await common.getLoginToken(loginData.ValidLoginData.Email, loginData.ValidLoginData.Password)
    })
    test('Verify for ViewPort Size:( 412 x 915 ) the mail will be hide from the page', async ({ loginPage }) => {
      await loginPage.accessLoginPage("/client")
      expect(await loginPage.emailAddressLocator(),'Email Address is showing in the top header').toBeHidden()
    });
  
    test('Verify Register button is working properly for all screen size', async ({ loginPage,registerPage }) => {
      await loginPage.accessLoginPage("/client")
      await loginPage.clickRegisterButton()
      expect(await registerPage.getRegisterBtnLocator()).toHaveValue("Register")
      expect(await registerPage.getRegisterBtnLocator(),'Register button is not showing').toBeVisible()
    });
  
    test('Verify Forget Password is working properly for all screen size', async ({ loginPage,forgetPassPage }) => {
      await loginPage.accessLoginPage("/client")
      await loginPage.clickForgetPasswordButton()
      expect(await forgetPassPage.getNewPasswordCardTitleLocator()).toHaveText("Enter New Password")
      expect(await forgetPassPage.getNewPasswordCardTitleLocator(),'Enter New Password text is not showing').toBeVisible()
    });
  
    test('Verify user can not login to the app using invalid credential for all screen size', async ({ loginPage }) => {
      await loginPage.accessLoginPage("/client")
      await loginPage.enterEmail(loginData.InvalidLoginData.Email)
      await loginPage.enterPassword(loginData.InvalidLoginData.Password)
      await loginPage.clickLoginButton()
      expect(await loginPage.getToastMsgLocator()).toHaveText("Incorrect email or password.")
  
    });
  
    test('Verify user can login to the app using valid credential for all screen size', async ({ loginPage }) => {
      await loginPage.accessLoginPage("/client")
      await loginPage.enterEmail(loginData.ValidLoginData.Email)
      await loginPage.enterPassword(loginData.ValidLoginData.Password)
      await loginPage.clickLoginButton()
      await loginPage.page.waitForNavigation()
      expect(await loginPage.getToastMsgLocator()).toHaveText("Login Successfully")
      
    });


    test('Verify for ViewPort Size:( 412 x 915 ) a menu icon will be visible instead of four options,  four options will be shown inside the menu icon', async ({ loginPage,dashboardPage }) => {
      common.setTokenInLocalStroage(loginPage.page, token)
      await loginPage.accessLoginPage("/client")
      expect(await dashboardPage.getMenuBtnLocator()).toBeVisible()
      await dashboardPage.clickMenuBtn()
      var navTabList = await dashboardPage.getNavTabList()
      expect(navTabList,'Navbar Tabs are not match').toEqual(dashboardData.tabs)
      expect(await navTabList.length,'Navbar Tabs count is not match').toBe(dashboardData.numberOfTabs)
      await dashboardPage.clickAddToCartProductButton(productData.productName)
      expect(await dashboardPage.getCartLabelLocator()).toBe("1")
    });

    test('Add to cart any product and verify its showing in cart label',async({loginPage,dashboardPage,mycartPage})=>{
      common.setTokenInLocalStroage(loginPage.page, token)
      await loginPage.accessLoginPage("/client")
      await dashboardPage.clickAddToCartProductButton(productData.productName)
      await dashboardPage.clickMenuBtn()
      expect(await dashboardPage.getCartLabelLocator()).toBe("1")
      await dashboardPage.clickCartBtn()
      expect(await mycartPage.getAddedProductLocator()).toHaveText(productData.productName)
    })



})

