const { defineConfig } = require("cypress");
const xlsx = require("xlsx");

module.exports = defineConfig({
  video: true,
  videoCompression: true,
  videoCompression: 15,
  screenshotOnRunFailure: true, // Enables screenshot capture on test failure
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: "Automation Report",
    reportDir: "cypress/Results",
    reportFilename: "[datetime]_AutomationResult",
    timestamp: "longDate",
    html: true,
    json: false,
    overwrite: false,
    code: false,
    autoOpen: false,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: true,
  },
  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);

      on("task", {
        readExcelData({ filePath, sheetName }) {
          const workbook = xlsx.readFile(filePath);
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

          const headers = jsonData[0];
          const data = jsonData.slice(1).map((row) => {
            const rowData = {};
            headers.forEach((header, index) => {
              rowData[header] = row[index];
            });
            return rowData;
          });

          return data;
        },
      });

      return config;
    },
  },
  env: {
    URL: "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    specPattern: "cypress/e2e/**/*.cy.js",
  },
});
