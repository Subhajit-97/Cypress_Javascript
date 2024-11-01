// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
// import "./commands";
import "cypress-mochawesome-reporter/register";
// import "cypress-plugin-snapshots/plugin";
import "node-xlsx";
import "xlsx";
// import "cypress-grep";
// cypress/support/e2e.js (or cypress/support/index.js)

import "./commands";
// import "cypress-split";

// Alternatively you can use CommonJS syntax:
require("./commands");
// To use xpath
require("cypress-xpath");
require("node-xlsx");
require("xlsx");
// require("cypress-grep");
// require("cypress-split");

// require("cypress-plugin-snapshots");
