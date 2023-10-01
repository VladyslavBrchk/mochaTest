class OverviewPage {

    get overviewTitleText(){
        return $('.title').getText()
    }
    get overviewItems(){
        return $$('.cart_item')
    }
    async getOverviewtemTitle(index){
        return this.overviewItems[index].$('.inventory_item_name').getText();
    }
    async getOverviewTotalPrice(){
        const text = await $('.summary_subtotal_label').getText();
        const val = await text.match(/\d+\.\d+/);
        return parseFloat(val[0]);
    }
    async clickFinishButton(){
        await $('#finish').click()
    }
    
}
module.exports = new OverviewPage()