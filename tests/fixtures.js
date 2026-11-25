const base = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

/**
 * Fixtures customizadas:
 *  - sauceUser: usuário do Sauce Demo usado no projeto (definido no playwright.config.js)
 *  - loginPage / inventoryPage / productPage / cartPage / checkoutPage: Page Objects
 *  - loggedIn: faz o login pela interface e garante a pré-condição
 *              "Usuário autenticado na página de catálogo (/inventory.html)"
 */
const test = base.test.extend({
  sauceUser: ['standard_user', { option: true }],

  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  inventoryPage: async ({ page }, use) => use(new InventoryPage(page)),
  productPage: async ({ page }, use) => use(new ProductPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),

  loggedIn: async ({ page, loginPage, sauceUser }, use) => {
    await loginPage.goto();
    await loginPage.login(sauceUser);
    await base.expect(page).toHaveURL(/\/inventory\.html/);
    await use(sauceUser);
  },
});

module.exports = { test, expect: base.expect };
