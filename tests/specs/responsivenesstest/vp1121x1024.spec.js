// @ts-check
const test= require("../../utils/basetest")
const { expect } = require("@playwright/test") 
const productData = require("../../testdata/productdata.json")
const loginData = require("../../testdata/logindata.json")
const Common = require("../../utils/common")

let common,token

common = new Common()

test.describe('Responsiveness test for ViewPort Size:( 1121 x 1024 )',async()=>{
    test.use({ viewport: { width: 1121, height: 1024 } });
    test.beforeAll(async () => {
      token = await common.getLoginToken(loginData.ValidLoginData.Email, loginData.ValidLoginData.Password)
    console.log(token)
    })
  test('Verify for large screen(>=1121) the mail address will be visible', async ({loginPage,registerPage }) => {
    await loginPage.accessLoginPage("/client")
    expect(await loginPage.emailAddressLocator(),'Email Address is not showing in the top header').toBeVisible()
    await loginPage.clickRegisterButton()
    expect(await registerPage.getRegisterBtnLocator()).toHaveValue("Register")
    expect(await registerPage.getRegisterBtnLocator(),'Register button is not showing').toBeVisible()
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


  
  test('For large screen four tab will be visible properly', async ({ loginPage,dashboardPage }) => {
    common.setTokenInLocalStroage(loginPage.page, token)
    await loginPage.accessLoginPage("/client")
    var navTabList = await dashboardPage.getNavTabList()
    expect(navTabList,'Navbar Tabs are not match').toEqual(['HOME', 'ORDERS', 'Cart', 'Sign Out' ])
    expect(await navTabList.length,'Navbar Tabs count is not match').toBe(4)
    expect(await dashboardPage.getMenuBtnLocator()).toBeHidden()
  });


  test('Add to cart any product and verify its showing in cart label',async({loginPage,dashboardPage,mycartPage})=>{
    
    common.setTokenInLocalStroage(loginPage.page, token)
    await loginPage.accessLoginPage("/client")
    await dashboardPage.clickAddToCartProductButton(productData.productName)
    expect(await dashboardPage.getCartLabelLocator()).toBe("1")
    await dashboardPage.clickCartBtn()
    expect(await mycartPage.getAddedProductLocator()).toHaveText(productData.productName)

  })

})

