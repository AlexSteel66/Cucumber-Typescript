import '@badeball/cypress-cucumber-preprocessor/commands';
import 'cypress-wait-until';
import 'cypress-mochawesome-reporter/register';
import "cypress-cucumber-attach-screenshots-to-failed-steps";
import './commands';
import './hooks.ts';

const COOKIE_NAME = "cookie_notice";
// The value meaning that user has accepted the cookie policy
const COOKIE_VALUE = "ACCEPTED";

Cypress.on("window:before:load", window => {
  window.document.cookie = `${COOKIE_NAME}=${COOKIE_VALUE}`;
});








