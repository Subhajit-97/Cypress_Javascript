import { describe } from "mocha";
import loginpage from "../PageObjects/login.js";
const login = new loginpage();
const tagFilter = Cypress.env("TAG");

describe("Login Test Using Excel Data", () => {
  const excelFilePath = "cypress/fixtures/data.xlsx"; // Path to your Excel file
  const sheetName = "login"; // Name of the sheet with login data

  before(() => {
    // Fetch Excel data before running tests
    cy.task("readExcelData", { filePath: excelFilePath, sheetName }).then(
      (data) => {
        cy.wrap(data).as("loginData");
      }
    );
  });
  beforeEach(function () {
    if (
      tagFilter &&
      !this.currentTest.invocationDetails.tags.includes(tagFilter)
    ) {
      this.skip();
    }
  });
  it("Logs in using data from Excel file", { tags: ["smoke"] }, function () {
    cy.get("@loginData").then((loginData) => {
      loginData.forEach((data) => {
        // Replace with your login page URL
        // steps
        login.openURL();
        cy.title().should("eq", "OrangeHRM"); // title verification
        login.typeUserName(data.uName);
        login.typePassWord(data.uPw);
        login.submitBtn();
        cy.get("span").contains("Admin"); //assertion
      });
    });
  });
});
