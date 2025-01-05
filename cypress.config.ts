import { defineConfig } from 'cypress';
import { on } from 'process';

module.exports = defineConfig({
reporter: 'cypress-mochawesome-reporter',

  e2e: {
    baseUrl: "https://todo.qacart.com",
    pageLoadTimeout: 120000,
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
    require('cypress-mochawesome-reporter/plugin')(on);
  
    },
  },
});   