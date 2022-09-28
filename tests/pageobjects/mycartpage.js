class MyCartPage{
   addToCartProductSelector=`.cart h3`

    constructor(page){
        this.page = page
    }

    async getAddedProductLocator(){
        await this.page.locator(this.addToCartProductSelector).waitFor({state:'attached',timeout:5000})
        return await this.page.locator(this.addToCartProductSelector)
    }
}
module.exports= MyCartPage

