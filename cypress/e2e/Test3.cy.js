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

//// The below code will fetch data from excel row wise, 2nd row , 3rd row like that.

// describe("Login Test Using Excel Data", () => {
//   const excelFilePath = "cypress/fixtures/loginData.xlsx"; // Path to your Excel file
//   const sheetName = "Sheet1"; // Name of the sheet with login data

//   before(() => {
//     // Fetch Excel data before running tests
//     cy.task("readExcelData", { filePath: excelFilePath, sheetName }).then(
//       (data) => {
//         cy.wrap(data).as("loginData");
//       }
//     );
//   });

//   it("Logs in using data from Excel file", function () {
//     cy.get("@loginData").then((loginData) => {
//       loginData.forEach((data) => {
//         // Replace with your login page URL
//         cy.visit("/login");

//         // Use selectors that match your login page’s HTML structure
//         cy.get('input[name="username"]').type(data.username);
//         cy.get('input[name="password"]').type(data.password);
//         cy.get('button[type="submit"]').click();

//         // Add assertions to verify login success
//         cy.url().should("contain", "/dashboard"); // Modify as needed
//         cy.go("back"); // Go back to the login page for the next test
//       });
//     });
//   });
// });
