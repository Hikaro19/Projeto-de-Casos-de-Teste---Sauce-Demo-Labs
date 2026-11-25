/**
 * Testes exploratórios automatizados (cenários negativos / classes de equivalência
 * inválidas) que vão além dos CTs da Entrega 2. Cada teste afirma o comportamento
 * ESPERADO; quando falha, a falha é a evidência da inconsistência (ver BUG-00X no
 * relatório de execução).
 *
 * Executados somente no projeto standard_user (npm run test:inconsistencias).
 */
const { test, expect } = require('./fixtures');
const { PRODUCTS, CUSTOMER } = require('../data/test-data');

test.describe('Inconsistências - RF-03 Checkout', () => {
  test.beforeEach(async ({ loggedIn }) => {});

  test('INC-001 - Não deve permitir finalizar compra com o carrinho vazio @inconsistencia', async ({ page, cartPage, checkoutPage }) => {
    test.info().annotations.push({ type: 'bug', description: 'BUG-001' });
    await cartPage.goto();
    await expect(cartPage.items).toHaveCount(0);

    // Esperado: botão Checkout desabilitado (ou fluxo bloqueado com mensagem)
    await expect.soft(cartPage.checkoutButton, 'Checkout deveria estar desabilitado com carrinho vazio').toBeDisabled({ timeout: 1000 });

    // Percorre o fluxo para verificar até onde o sistema permite avançar
    await cartPage.checkout();
    await checkoutPage.fillInformation(CUSTOMER);
    await checkoutPage.continue();
    await expect.soft(page, 'Não deveria chegar ao resumo do pedido sem itens').not.toHaveURL(/checkout-step-two/);

    if (/checkout-step-two/.test(page.url())) {
      await checkoutPage.finish();
      await expect.soft(checkoutPage.completeHeader, 'Pedido sem itens não deveria ser confirmado').not.toBeVisible();
    }
  });

  test.describe('Validação de formato dos campos (classes de equivalência inválidas)', () => {
    test.beforeEach(async ({ page, inventoryPage, cartPage }) => {
      await inventoryPage.addToCart(PRODUCTS.backpack.slug);
      await inventoryPage.openCart();
      await cartPage.checkout();
      await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
    });

    test('INC-002 - CEP com letras e símbolos deve ser rejeitado @inconsistencia', async ({ page, checkoutPage }) => {
      test.info().annotations.push({ type: 'bug', description: 'BUG-002' });
      await checkoutPage.fillInformation({ ...CUSTOMER, postalCode: 'ABC!@#' });
      await checkoutPage.continue();

      await expect(page, 'deveria permanecer na etapa de informações').toHaveURL(/\/checkout-step-one\.html$/, { timeout: 2000 });
      await expect(checkoutPage.error).toBeVisible();
    });

    test('INC-003 - Nome e sobrenome contendo apenas espaços devem ser rejeitados @inconsistencia', async ({ page, checkoutPage }) => {
      test.info().annotations.push({ type: 'bug', description: 'BUG-003' });
      await checkoutPage.fillInformation({ firstName: '   ', lastName: '   ', postalCode: CUSTOMER.postalCode });
      await checkoutPage.continue();

      await expect(page, 'deveria permanecer na etapa de informações').toHaveURL(/\/checkout-step-one\.html$/, { timeout: 2000 });
      await expect(checkoutPage.error).toBeVisible();
    });
  });
});

test.describe('Inconsistências - Navegação', () => {
  test.beforeEach(async ({ loggedIn }) => {});

  test('INC-004 - Acesso direto às páginas internas deve responder HTTP 200 @inconsistencia', async ({ page }) => {
    test.info().annotations.push({ type: 'bug', description: 'BUG-004' });
    for (const path of ['/inventory.html', '/cart.html', '/checkout-step-one.html']) {
      // Requisição HTTP direta (mesmo contexto/cookies do navegador)
      const response = await page.request.get(path);
      expect.soft(response.status(), `status HTTP de ${path}`).toBe(200);
    }
  });
});
