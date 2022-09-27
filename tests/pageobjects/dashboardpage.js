class DashboardPage {

    productItemSelector = `div .card`
    productNameSelector = `.card-body b`
    addToCartBtnSelector=`button:has-text("Add To Cart")`
    cartLabelSelector=`button label`
    toastMessageSelector=`#toast-container`
    navBtnSelector=`nav ul li button`



    constructor(page) {
        this.page = page
    }


    async clickAddToCartProductButton(pName) {
        let products = await this.page.locator(this.productItemSelector)
        let totalProduct = await products.count()
        for (var i = 0; i < totalProduct; i++) {
            let productName = await products.nth(i).locator(this.productNameSelector).textContent()
            if (pName === productName) {
                await products.nth(i).locator(this.addToCartBtnSelector).click()
                break
            }
        }

    }

    async getCartLabelLocator(){
       // await this.page.locator(this.cartLabelSelector).waitFor({timeout:15000})
       await this.page.waitForTimeout(5000)
        return await this.page.textContent(this.cartLabelSelector)
    }

    async getToastMessageLocator(){
        return await this.page.locator(this.toastMessageSelector)
    }

    async getNavTabList(){
        var tabNameList=[]
        let tabs = await this.page.locator(this.navBtnSelector)
        let totalTab = await tabs.count()
        for (var i = 0; i < totalTab; i++) {
            let tab = await tabs.nth(i).textContent()
            tabNameList.push(tab.trim())
        }

        return tabNameList
    }

}
module.exports = DashboardPage