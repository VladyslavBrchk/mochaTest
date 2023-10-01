const assert = require('assert');
const mainPage = require('../pageobjects/main.page');
const inventoryPage = require('../pageobjects/inventory.page');
const cartPage = require('../pageobjects/cart.page');
const checkoutPage = require('../pageobjects/checkout.page');
const overviewPage = require('../pageobjects/overview.page');
const completePage = require('../pageobjects/complete.page');


describe('www.saucedemo.com page', () => {
    //Case 1
    it('Valid Login', async () => {
        browser.url('https://www.saucedemo.com/')
        browser.waitUntil(mainPage.passwordInput.isEnabled())
        //Step 1
        mainPage.setUsername('standard_user')
        browser.waitUntil(await mainPage.usernameVal != "")
        assert.strictEqual(await mainPage.usernameVal, 'standard_user', 'Логін не введений в поле')
        //Step 2
        mainPage.setPassword('secret_sauce')
        browser.waitUntil(await mainPage.passwordVal != "")
        assert.strictEqual(await mainPage.passwordVal, 'secret_sauce', 'Пароль не введений в поле')
        assert.strictEqual(await mainPage.passwordType, 'password', 'Введений пароль не відображений у вигляді точок')
        //Step 3
        mainPage.clickLogin()
        await browser.waitUntil(async () => {
            const currentURL = await browser.getUrl();
            return currentURL === 'https://www.saucedemo.com/inventory.html';
        }, {
            timeout: 10000,
            timeoutMsg: 'Не відбулось переходу на сторінку з продуктами'
        });
        assert.ok(await inventoryPage.inventory.length > 0, 'На сторінці немає продуктів');
        assert.ok(inventoryPage.cart.isDisplayed(), 'Корзина не відображається на сторінці');
    })
    //Case 2
    it('Login with invalid password', async () => {
        browser.url('https://www.saucedemo.com/')
        browser.waitUntil(mainPage.passwordInput.isEnabled())
        //Step 1
        mainPage.setUsername('standard_user')
        browser.waitUntil(await mainPage.usernameVal != "")
        assert.strictEqual(await mainPage.usernameVal, 'standard_user', 'Логін не введений в поле')
        //Step 2
        mainPage.setPassword('secret_saucep')
        browser.waitUntil(await mainPage.passwordVal != "")
        assert.strictEqual(await mainPage.passwordVal, 'secret_saucep', 'Пароль не введений в поле')
        assert.strictEqual(await mainPage.passwordType, 'password', 'Введений пароль не відображений у вигляді точок')
        //Step 3
        mainPage.clickLogin()
        await browser.pause(1000)
        assert.ok(mainPage.errorLogX, 'Позначка Х не з\'явилася поблизу поля вводу логіну');
        assert.ok(mainPage.errorPasX, 'Позначка Х не з\'явилася поблизу поля вводу пароля');
        const errLogCol = await $('input#user-name.input_error.form_input').getCSSProperty('border-bottom-color');
        assert.strictEqual(errLogCol.parsed.hex, "#e2231a")
        const errPasCol = await $('input#password.input_error.form_input').getCSSProperty('border-bottom-color');
        assert.strictEqual(errPasCol.parsed.hex, "#e2231a")
        assert.strictEqual(await mainPage.errorMessage, "Epic sadface: Username and password do not match any user in this service")
    })
    //Case 3
    it('Login with invalid login', async () => {
        browser.url('https://www.saucedemo.com/')
        browser.waitUntil(mainPage.passwordInput.isEnabled())
        //Step 1
        mainPage.setUsername('standarD_user')
        browser.waitUntil(await mainPage.usernameVal != "")
        assert.strictEqual(await mainPage.usernameVal, 'standarD_user', 'Логін не введений в поле')
        //Step 2
        mainPage.setPassword('secret_sauce')
        browser.waitUntil(await mainPage.passwordVal != "")
        assert.strictEqual(await mainPage.passwordVal, 'secret_sauce', 'Пароль не введений в поле')
        assert.strictEqual(await mainPage.passwordType, 'password', 'Введений пароль не відображений у вигляді точок')
        //Step 3
        mainPage.clickLogin()
        await browser.pause(1000)
        assert.ok(mainPage.errorLogX, 'Позначка Х не з\'явилася поблизу поля вводу логіну');
        assert.ok(mainPage.errorPasX, 'Позначка Х не з\'явилася поблизу поля вводу пароля');
        const errLogCol = await $('input#user-name.input_error.form_input').getCSSProperty('border-bottom-color');
        assert.strictEqual(errLogCol.parsed.hex, "#e2231a")
        const errPasCol = await $('input#password.input_error.form_input').getCSSProperty('border-bottom-color');
        assert.strictEqual(errPasCol.parsed.hex, "#e2231a")
        assert.strictEqual(await mainPage.errorMessage, "Epic sadface: Username and password do not match any user in this service")
    })
})

describe('www.saucedemo.com/inventory.html page', () => {
    //Precondition
    beforeEach(async () => {
        browser.url('https://www.saucedemo.com/');
        mainPage.setUsername('standard_user')
        mainPage.setPassword('secret_sauce')
        mainPage.clickLogin()
        await browser.pause(1000)
    });
    //Case 4
    it('Logout', async () => {
        browser.url('https://www.saucedemo.com/inventory.html');
        //Step 1
        await inventoryPage.clickInventoryBurger();
        browser.waitUntil(inventoryPage.inventorySidebar.isDisplayed(), { timeoutMsg: 'Випадаюче меню не з\'явилось' })
        assert.ok(await inventoryPage.inventorySidebarItems.length == 4, 'В меню нема 4 елементів');
        //Step 2
        await inventoryPage.clickLogoutButton();
        await browser.waitUntil(async () => {
            const currentURL = await browser.getUrl();
            return currentURL === 'https://www.saucedemo.com/';
        }, {
            timeout: 10000,
            timeoutMsg: 'Не відбулось переходу на головну сторінку'
        });
        assert.strictEqual(await mainPage.usernameVal, '')
        assert.strictEqual(await mainPage.passwordVal, '')
    });
    //Case 5 
    it('Saving the cart after Logout', async () => {
        browser.url('https://www.saucedemo.com/inventory.html');
        let items_quantity = 0;
        //STEP 1
        const item_0_name = await inventoryPage.getInventoryItemTitle(0)
        console.log("Назва продукту: " + item_0_name)
        inventoryPage.clickInventoryItemAddButton(0)
        items_quantity++;
        browser.waitUntil(inventoryPage.cartBadge == items_quantity, { timeoutMsg: 'Додавання товару не відображається' })
        browser.waitUntil(!(inventoryPage.existInventoryItemAddButton(0)), { timeoutMsg: 'Кнопка додавання товару не змінилась' })
        //STEP 2
        await inventoryPage.clickInventoryBurger();
        browser.waitUntil(inventoryPage.inventorySidebar.isDisplayed(), { timeoutMsg: 'Випадаюче меню не з\'явилось' })
        assert.ok(await inventoryPage.inventorySidebarItems.length == 4, 'В меню нема 4 елементів');
        //STEP 3
        await inventoryPage.clickLogoutButton();
        await browser.waitUntil(async () => {
            const currentURL = await browser.getUrl();
            return currentURL === 'https://www.saucedemo.com/';
        }, {
            timeout: 10000,
            timeoutMsg: 'Не відбулось переходу на головну сторінку'
        });
        assert.strictEqual(await mainPage.usernameVal, '')
        assert.strictEqual(await mainPage.passwordVal, '')
        //STEP 4
        mainPage.setUsername('standard_user')
        mainPage.setPassword('secret_sauce')
        mainPage.clickLogin()
        await browser.waitUntil(async () => {
            const currentURL = await browser.getUrl();
            return currentURL === 'https://www.saucedemo.com/inventory.html';
        }, {
            timeout: 10000
        });
        //STEP 5
        inventoryPage.clickCartButton()
        await browser.waitUntil(async () => {
            const currentURL = await browser.getUrl();
            return currentURL === 'https://www.saucedemo.com/cart.html';
        }, {
            timeout: 10000,
            timeoutMsg: 'Не відбулось переходу на сторінку корзини'
        });
        assert.strictEqual(item_0_name, await cartPage.getInventoryItemTitle(0));
        //STEP 6 (MAKE IT ALL DEFAULT)
        cartPage.clickCartItemRemoveButton(0)
        await browser.pause(100)
    });
    //Case 6
    it('Sorting', async () => {
        browser.url('https://www.saucedemo.com/inventory.html');
        //STEP 1
        inventoryPage.clickFilterButton()
        inventoryPage.clickAZFilter()
        browser.waitUntil(inventoryPage.isSortedAZ(inventoryPage.getInventoryItemTitleArray()))
        //STEP 2
        inventoryPage.clickFilterButton()
        inventoryPage.clickZAFilter()
        browser.waitUntil(inventoryPage.isSortedZA(inventoryPage.getInventoryItemTitleArray()))
        //STEP 3
        inventoryPage.clickFilterButton()
        inventoryPage.clickLoHiFilter()
        browser.waitUntil(inventoryPage.isSortedLoHi(inventoryPage.getInventoryItemTitleArray()))
        //STEP 4
        inventoryPage.clickFilterButton()
        inventoryPage.clickHiLoFilter()
        browser.waitUntil(inventoryPage.isSortedHiLo(inventoryPage.getInventoryItemTitleArray()))
    })
    //Case 7
    it('Footer Links', async () => {
        browser.url('https://www.saucedemo.com/inventory.html');
        let windows;
        //Step 1
        inventoryPage.clickTwitterLink();
        await browser.waitUntil(async () => {
            windows = await browser.getWindowHandles();
            await browser.switchToWindow(windows[1]);
            const currentURL = await browser.getUrl();
            return currentURL === 'https://twitter.com/saucelabs';
        }, {
            timeout: 10000,
            timeoutMsg: 'Не відбувся перехід на Twitter'
        });
        await browser.closeWindow();
        await browser.switchToWindow(windows[0]);
        //Step 2
        inventoryPage.clickFacebookLink();
        await browser.waitUntil(async () => {
            windows = await browser.getWindowHandles();
            await browser.switchToWindow(windows[1]);
            const currentURL = await browser.getUrl();
            return currentURL === 'https://www.facebook.com/saucelabs';
        }, {
            timeout: 10000,
            timeoutMsg: 'Не відбувся перехід на Facebook'
        });
        await browser.closeWindow();
        await browser.switchToWindow(windows[0]);
        //Step 3
        inventoryPage.clickLinkedInLink();
        await browser.waitUntil(async () => {
            windows = await browser.getWindowHandles();
            await browser.switchToWindow(windows[1]);
            const currentURL = await browser.getUrl();
            return currentURL === 'https://www.linkedin.com/company/sauce-labs/';
        }, {
            timeout: 10000,
            timeoutMsg: 'Не відбувся перехід на LinkedIn'
        });
        await browser.closeWindow();
        await browser.switchToWindow(windows[0]);
    });
    //Case 8
    it('Valid Checkout', async () => {
        browser.url('https://www.saucedemo.com/inventory.html');
        let items_quantity = 0;
        //STEP 1
        const item_0_name = await inventoryPage.getInventoryItemTitle(0)
        const item_0_price = await inventoryPage.getInventoryItemPrice(0)
        console.log("Назва продукту 0: " + item_0_name + " Ціна продукту 0: " + item_0_price)
        inventoryPage.clickInventoryItemAddButton(0)
        items_quantity++;
        browser.waitUntil(inventoryPage.cartBadge == items_quantity, { timeoutMsg: 'Додавання товару не відображається' })
        browser.waitUntil(!(inventoryPage.existInventoryItemAddButton(0)), { timeoutMsg: 'Кнопка додавання товару не змінилась' })
        const item_1_name = await inventoryPage.getInventoryItemTitle(1)
        const item_1_price = await inventoryPage.getInventoryItemPrice(1)
        console.log("Назва продукту 1: " + item_1_name + " Ціна продукту 1: " + item_1_price)
        inventoryPage.clickInventoryItemAddButton(1)
        items_quantity++;
        browser.waitUntil(inventoryPage.cartBadge == items_quantity, { timeoutMsg: 'Додавання товару не відображається' })
        browser.waitUntil(!(inventoryPage.existInventoryItemAddButton(1)), { timeoutMsg: 'Кнопка додавання товару не змінилась' })
        let total_inventory_price = item_0_price + item_1_price
        //STEP 2
        inventoryPage.clickCartButton()
        await browser.waitUntil(async () => {
            const currentURL = await browser.getUrl();
            return currentURL === 'https://www.saucedemo.com/cart.html';
        }, {
            timeout: 10000,
            timeoutMsg: 'Не відбулось переходу на сторінку корзини'
        });
        assert.strictEqual(item_0_name, await cartPage.getInventoryItemTitle(0));
        assert.strictEqual(item_1_name, await cartPage.getInventoryItemTitle(1));
        //STEP 3
        cartPage.clickCheckoutButton()
        browser.waitUntil(checkoutPage.form.isDisplayed(), { timeoutMsg: 'Форма Checkout не відображається' })
        //STEP 4
        checkoutPage.setFirstName('Jack')
        browser.waitUntil(checkoutPage.firstNameVal == 'Jack')
        //STEP 5
        checkoutPage.setLastName('Sparrow')
        browser.waitUntil(checkoutPage.lastNameVal == 'Sparrow')
        //Step 6
        checkoutPage.setPostalCode('14000')
        browser.waitUntil(checkoutPage.postalCodeVal == '14000')
        //Step 7
        checkoutPage.clickContinueButton()
        await browser.waitUntil(async () => {
            const currentURL = await browser.getUrl();
            return currentURL === 'https://www.saucedemo.com/checkout-step-two.html';
        }, {
            timeout: 10000,
            timeoutMsg: 'Не відбулось переходу на наступну сторінку Checkout'
        });
        assert.strictEqual(await overviewPage.overviewTitleText, 'Checkout: Overview')
        assert.strictEqual(item_0_name, await overviewPage.getOverviewtemTitle(0));
        assert.strictEqual(item_1_name, await overviewPage.getOverviewtemTitle(1));
        assert.strictEqual(await overviewPage.getOverviewTotalPrice(), total_inventory_price);
        //Step 8
        overviewPage.clickFinishButton()
        await browser.waitUntil(async () => {
            const currentURL = await browser.getUrl();
            return currentURL === 'https://www.saucedemo.com/checkout-complete.html';
        }, {
            timeout: 10000,
            timeoutMsg: 'Не відбулось переходу на сторінку завершення'
        });
        assert.strictEqual(await completePage.completeFinishMessageText, 'Thank you for your order!');
        //Step 9
        completePage.clickBackToProductsButton()
        await browser.waitUntil(async () => {
            const currentURL = await browser.getUrl();
            return currentURL === 'https://www.saucedemo.com/inventory.html';
        }, {
            timeout: 10000,
            timeoutMsg: 'Не відбулось переходу на сторінку з продуктами'
        });
        assert.ok(await inventoryPage.inventory.length > 0, 'На сторінці немає продуктів');
        assert.ok(isNaN(inventoryPage.cartBadge));
    });
    //Case 9
    it('Checkout without products', async () => {
        browser.url('https://www.saucedemo.com/inventory.html');
        //STEP 1
        let cart_icon_quantity = 0;
        isNaN(inventoryPage.cartBadge) ? cart_icon_quantity = 0 : cart_icon_quantity = inventoryPage.cartBadge
        inventoryPage.clickCartButton()
        await browser.waitUntil(async () => {
            const currentURL = await browser.getUrl();
            return currentURL === 'https://www.saucedemo.com/cart.html';
        }, {
            timeout: 10000,
            timeoutMsg: 'Не відбулось переходу на сторінку корзини'
        });
        assert.ok(await cartPage.cartItems.length == cart_icon_quantity);
        //Step 2
        cartPage.clickCheckoutButton()
        await browser.pause(500)
        await browser.waitUntil(async () => {
            const currentURL = await browser.getUrl();
            return currentURL === 'https://www.saucedemo.com/cart.html';
        }, {
            timeout: 10000,
            timeoutMsg: 'Не відбулось переходу на сторінку корзини'
        });
        assert.strictEqual(await cartPage.cartErrorMessageText, "Cart is empty")
    });
})