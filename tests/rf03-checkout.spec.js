// RF-03 — Processo de Finalização de Compra (Checkout)
const { test, expect } = require('./fixtures');
const { PRODUCTS, CUSTOMER, toNumber } = require('../data/test-data');

test.describe('RF-03 - Processo de Finalização de Compra (Checkout)', () => {
  test.beforeEach(async ({ loggedIn, inventoryPage, cartPage }) => {
    // Pré-condição: Sauce Labs Backpack ($29.99) no carrinho
    await inventoryPage.addToCart(PRODUCTS.backpack.slug);
    await inventoryPage.openCart();
    await expect(cartPage.item(PRODUCTS.backpack.name)).toHaveCount(1);
  });

  test.describe('Cenário 3.1 - Finalização de compra com dados válidos (Caminho Feliz / E2E)', () => {
    test('CT-007 - Concluir pedido com preenchimento válido @regressao', async ({ page, cartPage, checkoutPage }) => {
      await cartPage.checkout();
      await expect(page).toHaveURL(/\/checkout-step-one\.html$/);

      await checkoutPage.fillInformation(CUSTOMER);
      await checkoutPage.continue();

      // Checkout: Overview
      await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
      await expect(checkoutPage.title).toHaveText('Checkout: Overview');
      await expect(checkoutPage.items.filter({ hasText: PRODUCTS.backpack.name })).toHaveCount(1);
      await expect(checkoutPage.subtotal).toHaveText('Item total: $29.99');
      await expect(checkoutPage.tax).toHaveText('Tax: $2.40');
      await expect(checkoutPage.total).toHaveText('Total: $32.39');

      // Coerência do cálculo: total = subtotal + imposto
      const subtotal = toNumber(await checkoutPage.subtotal.innerText());
      const tax = toNumber(await checkoutPage.tax.innerText());
      const total = toNumber(await checkoutPage.total.innerText());
      expect(Number((subtotal + tax).toFixed(2))).toBe(total);

      await checkoutPage.finish();
      await expect(page).toHaveURL(/\/checkout-complete\.html$/);
      await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
    });
  });

  test.describe('Cenário 3.2 - Validação de campos obrigatórios (Cenários Negativos)', () => {
    test.beforeEach(async ({ page, cartPage }) => {
      // Pré-condição: etapa Checkout: Your Information (/checkout-step-one.html)
      await cartPage.checkout();
      await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
    });

    test('CT-008 - Tentar avançar no checkout com "First Name" em branco @regressao', async ({ page, checkoutPage }) => {
      await checkoutPage.fillInformation({ lastName: CUSTOMER.lastName, postalCode: CUSTOMER.postalCode });
      await checkoutPage.continue();

      await expect(checkoutPage.error).toHaveText('Error: First Name is required');
      await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
    });

    test('CT-009 - Tentar avançar no checkout com "Zip/Postal Code" em branco @regressao', async ({ page, checkoutPage }) => {
      await checkoutPage.fillInformation({ firstName: CUSTOMER.firstName, lastName: CUSTOMER.lastName });
      await checkoutPage.continue();

      await expect(checkoutPage.error).toHaveText('Error: Postal Code is required');
      await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
    });
  });
});
