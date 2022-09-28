// @ts-check
const test= require("../../utils/basetest")
const { expect } = require("@playwright/test") 
const productData = require("../../testdata/productdata.json")

test.describe('Responsiveness test for ViewPort Size:( 360 x 640 )',async()=>{
    test.use({ viewport: { width: 360, height: 640 } });
    test('For small screen the mail will be hide from the page', async ({ loginPage }) => {
      await loginPage.accessLoginPage("/client")
      expect(await loginPage.emailAddressLocator(),'Email Address is showing in the top header').not.toBeVisible()
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
  
    test('Verify user can’t login to the app using invalid credential for all screen size', async ({ loginPage }) => {
      await loginPage.accessLoginPage("/client")
      await loginPage.enterEmail("sdygsdhjydg@gmail.com")
      await loginPage.enterPassword("78687dshjdhjds")
      await loginPage.clickLoginButton()
      expect(await loginPage.getToastMsgLocator()).toHaveText("Incorrect email or password.")
  
    });
  
    test('Verify user can login to the app using valid credential for all screen size', async ({ loginPage }) => {
      await loginPage.accessLoginPage("/client")
      await loginPage.enterEmail("example1@gmail.com")
      await loginPage.enterPassword("Aa@18")
      await loginPage.clickLoginButton()
      await loginPage.page.waitForNavigation()
      expect(await loginPage.getToastMsgLocator()).toHaveText("Login Successfully")
      
    });



    test('For small screen a menu icon will be visible instead of four options,  four options will be shown inside the menu icon', async ({ loginPage,dashboardPage }) => {
      await loginPage.accessLoginPage("/client")
      await loginPage.enterEmail("example1@gmail.com")
      await loginPage.enterPassword("Aa@18")
      await loginPage.clickLoginButton()
      expect(await dashboardPage.getMenuBtnLocator()).toBeVisible()
      await dashboardPage.clickMenuBtn()
      var navTabList = await dashboardPage.getNavTabList()
      expect(navTabList,'Navbar Tabs are not match').toEqual(['HOME', 'ORDERS', 'Cart', 'Sign Out' ])
      expect(await navTabList.length,'Navbar Tabs count is not match').toBe(4)
      await dashboardPage.clickAddToCartProductButton(productData.productName)
      expect(await dashboardPage.getCartLabelLocator()).toBe("1")
    });

    test.only('Add to cart any product and verify its showing in cart label',async({loginPage,dashboardPage,mycartPage})=>{
      await loginPage.accessLoginPage("/client")
      await loginPage.enterEmail("example1@gmail.com")
      await loginPage.enterPassword("Aa@18")
      await loginPage.clickLoginButton()
      await dashboardPage.page.waitForTimeout(5000)
      await dashboardPage.clickAddToCartProductButton(productData.productName)
      await dashboardPage.clickMenuBtn()
      expect(await dashboardPage.getCartLabelLocator()).toBe("1")
      await dashboardPage.clickCartBtn()
      expect(await mycartPage.getAddedProductLocator()).toHaveText(productData.productName)
  
    })



})

