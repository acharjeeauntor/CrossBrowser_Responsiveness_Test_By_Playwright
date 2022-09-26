class ForgetPasswordPage{
    newPasswordTextSelector=`.card .card-title`

    constructor(page){
        this.page = page
    }

    async getNewPasswordCardTitleLocator(){
        return await this.page.locator(this.newPasswordTextSelector)
    }
}
module.exports= ForgetPasswordPage