/**
 * Page Object - Fluxo de checkout
 *   Passo 1: /checkout-step-one.html  (Your Information)
 *   Passo 2: /checkout-step-two.html  (Overview)
 *   Final:   /checkout-complete.html  (Complete!)
 */
class CheckoutPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.title = page.getByTestId('title');
    // Passo 1
    this.firstName = page.getByTestId('firstName');
    this.lastName = page.getByTestId('lastName');
    this.postalCode = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
    this.cancelButton = page.getByTestId('cancel');
    this.error = page.getByTestId('error');
    // Passo 2
    this.items = page.getByTestId('inventory-item');
    this.subtotal = page.getByTestId('subtotal-label');
    this.tax = page.getByTestId('tax-label');
    this.total = page.getByTestId('total-label');
    this.finishButton = page.getByTestId('finish');
    // Conclusão
    this.completeHeader = page.getByTestId('complete-header');
    this.completeText = page.getByTestId('complete-text');
  }

  /**
   * Preenche o formulário "Your Information".
   * Campos com valor vazio ('') são deixados em branco.
   */
  async fillInformation({ firstName = '', lastName = '', postalCode = '' }) {
    if (firstName !== '') await this.firstName.fill(firstName);
    if (lastName !== '') await this.lastName.fill(lastName);
    if (postalCode !== '') await this.postalCode.fill(postalCode);
  }

  async continue() {
    await this.continueButton.click();
  }

  async finish() {
    await this.finishButton.click();
  }
}

module.exports = { CheckoutPage };
