class RegisterPage{
    registerBtnSelector=`#login`

    constructor(page){
        this.page = page
    }

    async getRegisterBtnLocator(){
        return await this.page.locator(this.registerBtnSelector)
    }
}
module.exports= RegisterPage