class MainPage {
    get usernameInput() {
        return $('input#user-name')
    }
    get passwordInput() {
        return $('input#password')
    }
    get loginButton() {
        return $('input#login-button')
    }
    get errorMessage(){
        return $('.error-message-container').getText()
    }
    async setUsername (value){
        await this.usernameInput.addValue(value)
    }
    get usernameVal (){
        return this.usernameInput.getValue()
    }
    async setPassword (value){
        await this.passwordInput.addValue(value)
    }
    get passwordVal (){
        return this.passwordInput.getValue()
    }
    get passwordType (){
        return this.passwordInput.getAttribute('type')
    }
    async clickLogin(){
        await this.loginButton.click()
    }
    get errorLogX(){
        return $('input#user-name + svg.error_icon').isExisting()
    }
    get errorPasX(){
        return $('input#password + svg.error_icon').isExisting()
    }

}

module.exports = new MainPage()