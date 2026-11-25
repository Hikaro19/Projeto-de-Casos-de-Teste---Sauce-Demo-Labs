/** Page Object - Detalhes do produto (/inventory-item.html?id=N) */
class ProductPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.name = page.getByTestId('inventory-item-name');
    this.description = page.getByTestId('inventory-item-desc');
    this.price = page.getByTestId('inventory-item-price');
    this.image = page.locator('img.inventory_details_img');
    this.addToCartButton = page.getByTestId('add-to-cart');
    this.backButton = page.getByTestId('back-to-products');
  }
}

module.exports = { ProductPage };
