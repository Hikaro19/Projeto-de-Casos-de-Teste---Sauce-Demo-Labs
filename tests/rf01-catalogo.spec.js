// RF-01 — Ordenação e Visualização do Catálogo de Produtos
const { test, expect } = require('./fixtures');
const { PRODUCTS } = require('../data/test-data');

test.describe('RF-01 - Ordenação e Visualização do Catálogo de Produtos', () => {
  test.beforeEach(async ({ loggedIn }) => {
    // Pré-condição: usuário autenticado na página de catálogo (/inventory.html)
  });

  test.describe('Cenário 1.1 - Ordenação de produtos no catálogo', () => {
    test('CT-001 - Ordenar produtos por preço crescente (Low to High) @regressao', async ({ inventoryPage }) => {
      await inventoryPage.sortBy('lohi');

      await expect(inventoryPage.activeSortOption).toHaveText('Price (low to high)');
      const prices = await inventoryPage.getPrices();
      const sorted = [...prices].sort((a, b) => a - b);
      expect(prices, 'preços devem estar em ordem crescente').toEqual(sorted);

      const names = await inventoryPage.getNames();
      expect(names[0]).toBe(PRODUCTS.onesie.name); // mais barato: $7.99
      expect(names[names.length - 1]).toBe(PRODUCTS.fleeceJacket.name); // mais caro: $49.99
      expect(prices[0]).toBe(7.99);
      expect(prices[prices.length - 1]).toBe(49.99);
    });

    test('CT-002 - Ordenar produtos por nome decrescente (Z to A) @regressao', async ({ inventoryPage }) => {
      await inventoryPage.sortBy('za');

      await expect(inventoryPage.activeSortOption).toHaveText('Name (Z to A)');
      const names = await inventoryPage.getNames();
      const sortedDesc = [...names].sort((a, b) => b.localeCompare(a));
      expect(names, 'nomes devem estar em ordem alfabética decrescente').toEqual(sortedDesc);
      expect(names[0]).toBe(PRODUCTS.redTShirt.name);
    });
  });

  test.describe('Cenário 1.2 - Visualização de detalhes de um produto', () => {
    test('CT-003 - Acessar página de detalhes do item @regressao', async ({ page, inventoryPage, productPage }) => {
      const product = PRODUCTS.backpack;
      await inventoryPage.openProduct(product.name);

      await expect(page).toHaveURL(new RegExp(`/inventory-item\\.html\\?id=${product.id}$`));
      await expect(productPage.name).toHaveText(product.name);
      await expect(productPage.description).not.toBeEmpty();
      await expect(productPage.price).toHaveText(product.price);
      await expect(productPage.addToCartButton).toHaveText('Add to cart');

      // A imagem deve existir e ter sido carregada (naturalWidth > 0)
      await expect(productPage.image).toBeVisible();
      const loaded = await productPage.image.evaluate((img) => img.complete && img.naturalWidth > 0);
      expect(loaded, 'imagem do produto deve carregar').toBe(true);
    });
  });
});
