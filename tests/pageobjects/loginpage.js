class LoginPage{

    emailInputSelector=`#userEmail`
    passwordInputSelector=`#userPassword`
    loginBtnSelector=`#login`

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



}
module.exports= LoginPage