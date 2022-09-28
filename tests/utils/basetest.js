const base = require("@playwright/test")
const LoginPage = require("../pageobjects/loginpage")
const ForgetPassPage = require("../pageobjects/forgetpasswordpage")
const RegisterPage =require("../pageobjects/registerpage")
const DashboardPage =require("../pageobjects/dashboardpage")
const MyCartPage =require("../pageobjects/mycartpage")


const test = base.test.extend({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page))
    },
    registerPage: async ({ page }, use) => {
        await use(new RegisterPage(page))
    },
    forgetPassPage:async({page},use)=>{
        await use(new ForgetPassPage(page))
    },
    dashboardPage:async({page},use)=>{
        await use(new DashboardPage(page))
    },
    mycartPage:async({page},use)=>{
        await use(new MyCartPage(page))
    }

})


module.exports = test