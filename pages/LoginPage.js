const { PASSWORD } = require('../data/test-data');

/** Page Object - Tela de Login (/) */
class LoginPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.username = page.getByTestId('username');
    this.password = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-button');
    this.error = page.getByTestId('error');
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(user, password = PASSWORD) {
    await this.username.fill(user);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}

module.exports = { LoginPage };
