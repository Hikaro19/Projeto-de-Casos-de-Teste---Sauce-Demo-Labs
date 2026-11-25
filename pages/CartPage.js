/** Page Object - Carrinho de compras (/cart.html) */
class CartPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.items = page.getByTestId('inventory-item');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.checkoutButton = page.getByTestId('checkout');
    this.continueShoppingButton = page.getByTestId('continue-shopping');
  }

  async goto() {
    await this.page.goto('/cart.html');
  }

  /** Linha do carrinho referente a um produto */
  item(productName) {
    return this.items.filter({ hasText: productName });
  }

  async getItemNames() {
    return this.items.getByTestId('inventory-item-name').allInnerTexts();
  }

  async remove(slug) {
    await this.page.getByTestId(`remove-${slug}`).click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };
