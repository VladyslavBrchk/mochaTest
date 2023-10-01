class CheckoutPage {

    get form(){
        return $('form')
    }
    get firstNameInput() {
        return $('input#first-name')
    }
    async setFirstName (value){
        await this.firstNameInput.addValue(value)
    }
    get firstNameVal (){
        return this.firstNameInput.getValue()
    }
    get lastNameInput() {
        return $('input#last-name')
    }
    async setLastName (value){
        await this.lastNameInput.addValue(value)
    }
    get lastNameVal (){
        return this.lastNameInput.getValue()
    }
    get postalCodeInput() {
        return $('input#postal-code')
    }
    async setPostalCode (value){
        await this.postalCodeInput.addValue(value)
    }
    get postalCodeVal (){
        return this.postalCodeInput.getValue()
    }
    async clickContinueButton(){
        await $('#continue').click()
    }
}

module.exports = new CheckoutPage()