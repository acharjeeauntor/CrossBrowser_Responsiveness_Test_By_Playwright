class LoginPage{

    emailInputSelector=`#userEmail`
    passwordInputSelector=`#userPassword`
    loginBtnSelector=`#login`
    emailAddressSelector=`.top-tab a`
    registerBtnSelector=`[routerlink*="/auth/register"]`
    forgetPasswordBtnSelector=`[href*="/client/auth/password-new"]`
    toastMsgSelector=`#toast-container`

    constructor(page){
        this.page = page
    }


    async accessLoginPage(url){
        await this.page.goto(url)
    }

    async enterEmail(email){
        await this.page.fill(this.emailInputSelector, email)
    }
    async enterPassword(pass){
        await this.page.fill(this.passwordInputSelector, pass)
    }
    async clickLoginButton(){
        await this.page.click(this.loginBtnSelector)
    }
    async emailAddressLocator(){
        return await this.page.locator(this.emailAddressSelector).nth(0)
    }
    async clickRegisterButton(){
        await this.page.click(this.registerBtnSelector)
    }
    async clickForgetPasswordButton(){
        await this.page.click(this.forgetPasswordBtnSelector)
    }
    async getToastMsgLocator(){
        const locator = await this.page.locator(this.toastMsgSelector)
        await locator.waitFor('visible');
        return locator
    }



}
module.exports= LoginPage