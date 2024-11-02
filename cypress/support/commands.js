// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Creating login custom command
import loginpage from "../PageObjects/login.js";
const login = new loginpage();
Cypress.Commands.add("loginapp", (username, password, expected) => {
  login.openURL();
  cy.title().should("eq", "OrangeHRM"); // title verification
  login.typeUserName(username);
  login.typePassWord(password);
  login.submitBtn();
  cy.get(
    "a[class='oxd-main-menu-item active']> span[class='oxd-text oxd-text--span oxd-main-menu-item--name']"
  ).should("have.text", expected); //assertion
});
