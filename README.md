# Entrega 3 — Automação de Testes E2E · Sauce Demo Labs (Swag Labs)

**Aluno:** Hikaro Lázaro · **Sistema:** https://www.saucedemo.com/ · **Ferramenta:** Playwright (JavaScript)

Automação dos casos de teste projetados na Entrega 2 (CT-001 a CT-009), organizados por requisito:

| Requisito | Arquivo | Casos |
|---|---|---|
| RF-01 — Ordenação e Visualização do Catálogo | `tests/rf01-catalogo.spec.js` | CT-001, CT-002, CT-003 |
| RF-02 — Gerenciamento do Carrinho | `tests/rf02-carrinho.spec.js` | CT-004, CT-005, CT-006 |
| RF-03 — Finalização de Compra (Checkout) | `tests/rf03-checkout.spec.js` | CT-007, CT-008, CT-009 |
| Inconsistências encontradas | `tests/inconsistencias.spec.js` | INC-001 a INC-004 |

## Resultado da execução

Execução oficial com Playwright 1.65.1 (Chromium) contra https://www.saucedemo.com em 24/11/2026:

| Comando | Resultado |
|---|---|
| `npm run test:ct` (CT-001 a CT-009, standard_user) | **9 passed, 0 failed** |

O relatório HTML gerado pelo Playwright nessa execução está em
[`evidencias/relatorio-playwright/`](evidencias/relatorio-playwright/) — baixe a pasta e abra o `index.html`
no navegador (ou rode `npx playwright show-report evidencias/relatorio-playwright`).

O relatório completo da entrega (requisitos, casos de teste, resultados, defeitos e evidências)
está no documento "Relatório de Automação de Testes E2E - Sauce Demo Labs (Entrega 3)".

## Estrutura (Page Object Model)

```
pages/            Page Objects (LoginPage, InventoryPage, ProductPage, CartPage, CheckoutPage)
data/             Massa de dados (produtos, preços, cliente)
tests/fixtures.js Fixtures: Page Objects + login (pré-condição "usuário autenticado")
tests/*.spec.js   Casos de teste por requisito
playwright.config.js  Projetos standard_user e problem_user, relatório HTML, screenshots
```

Os seletores usam o atributo `data-test` do próprio site (`testIdAttribute: 'data-test'`),
o que deixa os testes estáveis e independentes de textos/estilos.

## Como executar

Pré-requisito: Node.js 18+.

```bash
npm install
npx playwright install chromium

npm run test:ct               # CT-001..CT-009 com standard_user (execução oficial)
npm run test:inconsistencias  # INC-001..INC-004 (falham de propósito: evidenciam os defeitos)
npm run test:problem_user     # CT-001..CT-009 com problem_user (regressão)
npm test                      # tudo
npm run report                # abre o relatório HTML (playwright-report/)
```

Tags: `@regressao` (casos da Entrega 2) e `@inconsistencia` (testes que comprovam defeitos).
Os testes de inconsistência afirmam o comportamento **esperado**; por isso, enquanto o defeito
existir, eles aparecem como **failed** no relatório — essa falha é a evidência do BUG.
