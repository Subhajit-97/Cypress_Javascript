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
        // Use only the first data set (e.g., first row after the header)
        const firstDataSet = data.length > 0 ? data[0] : null;
        if (firstDataSet) {
          cy.wrap(firstDataSet).as("loginData");
        } else {
          throw new Error("No data found in the Excel sheet");
        }
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
    // Replace with your login page URL
    // steps

    cy.get("@loginData").then((data) => {
      login.openURL();
      cy.title().should("eq", "OrangeHRM"); // title verification
      login.typeUserName(data.uName);
      login.typePassWord(data.uPw);
      login.submitBtn();
      cy.get(
        "a[class='oxd-main-menu-item active']> span[class='oxd-text oxd-text--span oxd-main-menu-item--name']"
      ).should("have.text", data.expected); //assertion
    });
  });
});
