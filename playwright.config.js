// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Configuração do Playwright - Entrega 3 (Sauce Demo Labs)
 *
 * - testIdAttribute: o Swag Labs expõe o atributo "data-test" em todos os
 *   elementos relevantes, então usamos page.getByTestId('...') nos Page Objects.
 * - Dois projetos (perfis de execução):
 *     standard_user -> execução oficial dos casos de teste (CT-001 a CT-009)
 *                      + testes de inconsistências (INC-001 a INC-004)
 *     problem_user  -> reexecução dos mesmos CTs com o usuário "com problemas"
 *                      do Sauce Demo, para evidenciar defeitos (teste de regressão)
 */
module.exports = defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  retries: 0,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
    testIdAttribute: 'data-test',
    screenshot: 'on',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    locale: 'en-US',
  },
  projects: [
    {
      name: 'standard_user',
      use: { ...devices['Desktop Chrome'], sauceUser: 'standard_user' },
    },
    {
      name: 'problem_user',
      grep: /@regressao/,
      use: { ...devices['Desktop Chrome'], sauceUser: 'problem_user' },
    },
  ],
});
