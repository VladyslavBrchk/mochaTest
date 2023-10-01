class CartPage {

    get cartItems(){
        return $$('.cart_item')
    }
    async getInventoryItemTitle(index){
        return this.cartItems[index].$('.inventory_item_name').getText();
    }
    get cartItemRemoveButton(){
        return $$('.cart_item .btn')
    }
    async clickCartItemRemoveButton(index){
        await this.cartItemRemoveButton[index].click();
    }
    async clickCheckoutButton(){
        await $('#checkout').click()
    }
    get cartErrorMessageText(){
        return $('.error-message-container').getText()
    }
}

module.exports = new CartPage()