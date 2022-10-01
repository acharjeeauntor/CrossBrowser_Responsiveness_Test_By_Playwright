const{request} = require("@playwright/test")
class Common{

async getLoginToken(mail,password){
    const apiContext = await request.newContext()
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login/", {
        data: {userEmail: mail, userPassword: password}
    })
    const loginResponseJson = await loginResponse.json()
   let token = loginResponseJson.token
   return token
}

async setTokenInLocalStroage(page,token){
    page.addInitScript(value => {
        window.localStorage.setItem("token", value)
    }, token)
}


}

module.exports = Common;
