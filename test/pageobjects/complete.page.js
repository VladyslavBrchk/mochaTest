class CompletePage {

    get completeFinishMessageText(){
        return $('.complete-header').getText()
    }
    async clickBackToProductsButton(){
        await $('#back-to-products').click()
    }
    
}
module.exports = new CompletePage()