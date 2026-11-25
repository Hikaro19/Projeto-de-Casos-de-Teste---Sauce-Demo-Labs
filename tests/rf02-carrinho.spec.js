// RF-02 — Gerenciamento do Carrinho de Compras
const { test, expect } = require('./fixtures');
const { PRODUCTS, ALL_PRODUCTS } = require('../data/test-data');

test.describe('RF-02 - Gerenciamento do Carrinho de Compras', () => {
  test.beforeEach(async ({ loggedIn, inventoryPage }) => {
    // Pré-condição: usuário autenticado em /inventory.html com o carrinho vazio
    await expect(inventoryPage.cartBadge).toHaveCount(0);
  });

  test.describe('Cenário 2.1 - Adição de produtos ao carrinho', () => {
    test('CT-004 - Adicionar um produto ao carrinho pelo catálogo @regressao', async ({ page, inventoryPage, cartPage }) => {
      const product = PRODUCTS.backpack;
      await inventoryPage.addToCart(product.slug);

      await expect(inventoryPage.removeButton(product.slug)).toHaveText('Remove');
      await expect(inventoryPage.cartBadge).toHaveText('1');

      await inventoryPage.openCart();
      await expect(page).toHaveURL(/\/cart\.html$/);
      const row = cartPage.item(product.name);
      await expect(row).toHaveCount(1);
      await expect(row.getByTestId('item-quantity')).toHaveText('1');
      await expect(row.getByTestId('inventory-item-price')).toHaveText(product.price);
    });

    test('CT-005 - Adicionar múltiplos produtos ao carrinho (Valor Limite) @regressao', async ({ inventoryPage, cartPage }) => {
      for (const product of ALL_PRODUCTS) {
        await inventoryPage.addToCart(product.slug);
      }

      await expect(inventoryPage.cartBadge).toHaveText(String(ALL_PRODUCTS.length)); // 6
      await inventoryPage.openCart();
      await expect(cartPage.items).toHaveCount(ALL_PRODUCTS.length);
      const names = await cartPage.getItemNames();
      expect(names.sort()).toEqual(ALL_PRODUCTS.map((p) => p.name).sort());
    });
  });

  test.describe('Cenário 2.2 - Remoção de produtos do carrinho', () => {
    test('CT-006 - Remover produto diretamente na tela do carrinho @regressao', async ({ inventoryPage, cartPage }) => {
      const product = PRODUCTS.backpack;
      // Pré-condição: 1 produto (Sauce Labs Backpack) no carrinho
      await inventoryPage.addToCart(product.slug);
      await inventoryPage.openCart();
      await expect(cartPage.item(product.name)).toHaveCount(1);

      await cartPage.remove(product.slug);

      await expect(cartPage.items).toHaveCount(0);
      await expect(cartPage.cartBadge).toHaveCount(0); // contador desaparece
    });
  });
});
