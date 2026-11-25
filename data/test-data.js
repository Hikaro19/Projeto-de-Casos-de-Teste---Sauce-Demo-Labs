/**
 * Massa de dados dos testes (mesmos dados definidos na Entrega 2).
 * A senha abaixo é a senha pública de demonstração exibida na própria
 * tela de login do https://www.saucedemo.com.
 */
const PASSWORD = 'secret_sauce';

const PRODUCTS = {
  backpack: { name: 'Sauce Labs Backpack', price: '$29.99', slug: 'sauce-labs-backpack', id: 4 },
  bikeLight: { name: 'Sauce Labs Bike Light', price: '$9.99', slug: 'sauce-labs-bike-light', id: 0 },
  boltTShirt: { name: 'Sauce Labs Bolt T-Shirt', price: '$15.99', slug: 'sauce-labs-bolt-t-shirt', id: 1 },
  fleeceJacket: { name: 'Sauce Labs Fleece Jacket', price: '$49.99', slug: 'sauce-labs-fleece-jacket', id: 5 },
  onesie: { name: 'Sauce Labs Onesie', price: '$7.99', slug: 'sauce-labs-onesie', id: 2 },
  redTShirt: { name: 'Test.allTheThings() T-Shirt (Red)', price: '$15.99', slug: 'test.allthethings()-t-shirt-(red)', id: 3 },
};

const ALL_PRODUCTS = Object.values(PRODUCTS);

const CUSTOMER = {
  firstName: 'Hikaro',
  lastName: 'Lazaro',
  postalCode: '29100-000',
};

/** Converte "$29.99" em 29.99 */
const toNumber = (price) => Number(String(price).replace(/[^0-9.]/g, ''));

module.exports = { PASSWORD, PRODUCTS, ALL_PRODUCTS, CUSTOMER, toNumber };
