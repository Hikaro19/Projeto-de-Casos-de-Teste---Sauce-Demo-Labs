/** Page Object - Catálogo de produtos (/inventory.html) */
class InventoryPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.sortSelect = page.getByTestId('product-sort-container');
    this.activeSortOption = page.getByTestId('active-option');
    this.items = page.getByTestId('inventory-item');
    this.itemNames = page.getByTestId('inventory-item-name');
    this.itemPrices = page.getByTestId('inventory-item-price');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
  }

  async goto() {
    await this.page.goto('/inventory.html');
  }

  /** @param {'az'|'za'|'lohi'|'hilo'} option */
  async sortBy(option) {
    await this.sortSelect.selectOption(option);
  }

  async getNames() {
    return this.itemNames.allInnerTexts();
  }

  async getPrices() {
    const prices = await this.itemPrices.allInnerTexts();
    return prices.map((p) => Number(p.replace('$', '')));
  }

  addToCartButton(slug) {
    return this.page.getByTestId(`add-to-cart-${slug}`);
  }

  removeButton(slug) {
    return this.page.getByTestId(`remove-${slug}`);
  }

  async addToCart(slug) {
    await this.addToCartButton(slug).click();
  }

  async openProduct(productName) {
    await this.itemNames.filter({ hasText: productName }).click();
  }

  async openCart() {
    await this.cartLink.click();
  }
}

module.exports = { InventoryPage };
