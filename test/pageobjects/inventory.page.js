class InventoryPage {

    get inventory(){
        return $$('.inventory_item')
    }
    async getInventoryItemTitle(index){
        return this.inventory[index].$('.inventory_item_name').getText();
    }
    async getInventoryItemTitleArray(){
        const arr = []
        for (let i=0; i<this.inventory.length; i++){
            arr.push(await this.getInventoryItemTitle(i))
        }
        return arr
    }
    async getInventoryItemPrice(index){
        const inventoryItem = this.inventory[index]
        const inventoryItemText = await inventoryItem.$('.inventory_item_price').getText();
        return parseFloat(inventoryItemText.replace(/\$/g, ""));
    }
    get inventoryItemAddButton(){
        return $$('.inventory_item .btn')
    }
    async clickInventoryItemAddButton(index){
        await this.inventoryItemAddButton[index].click();
    }
    async existInventoryItemAddButton(index){
        await this.inventoryItemAddButton[index].isExisting();
    }
    get cart(){
        return $('.shopping_cart_container')
    }
    get cartBadge(){
        return Number(this.cart.getText())
    }
    async clickCartButton(){
        await this.cart.click()
    }
    async clickInventoryBurger(){
        await $('#react-burger-menu-btn').click()
    }
    get inventorySidebar(){
        return $('nav.bm-menu-list')
    }
    get inventorySidebarItems(){
        return $$('.bm-item')
    }
    async clickLogoutButton(){
        await $('#logout_sidebar_link').click()
    }
    async clickFilterButton(){
        await $('.product_sort_container').click()
    }
    async clickAZFilter(){
        await $('[value="az"]').click()
    }
    async isSortedAZ(texts){
        for (let i = 1; i < texts.length; i++) {
            if (texts[i] < texts[i - 1]) {
                return false;
            }
        }
        return true;
    }
    async clickZAFilter(){
        await $('[value="za"]').click()
    }
    async isSortedZA(texts){
        for (let i = 1; i < texts.length; i++) {
            if (texts[i] > texts[i - 1]) {
                return false;
            }
        }
        return true;
    }
    async clickLoHiFilter(){
        await $('[value="lohi"]').click()
    }
    async isSortedLoHi(prices){
        for (let i = 1; i < prices.length; i++){
            const curPrice = parseFloat(prices[i].replace('$', ''));
            const prevPrice = parseFloat(prices[i - 1].replace('$', ''));
            if (curPrice < prevPrice){
              return false;
            }
          }
          return true;
    }
    async clickHiLoFilter(){
        await $('[value="hilo"]').click()
    }
    async isSortedHiLo(prices){
        for (let i = 1; i < prices.length; i++){
            const curPrice = parseFloat(prices[i].replace('$', ''));
            const prevPrice = parseFloat(prices[i - 1].replace('$', ''));
            if (curPrice > prevPrice){
              return false;
            }
          }
          return true;
    }
    async clickTwitterLink(){
        await $('.footer [href="https://twitter.com/saucelabs"]').click()
    }
    async clickFacebookLink(){
        await $('.footer [href="https://www.facebook.com/saucelabs"]').click()
    }
    async clickLinkedInLink(){
        await $('.footer [href="https://www.linkedin.com/company/sauce-labs/"]').click()
    }
}

module.exports = new InventoryPage()