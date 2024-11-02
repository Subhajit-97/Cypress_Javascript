// each describe block may have multiple it block , and each it block represents each test
import loginpage from "../PageObjects/login.js";
const login = new loginpage();

describe("Fetch data fromJson file", () => {
  //Access through hooks for multiple it blocks
  before(() => {
    // Fetch json data before running tests
    cy.fixture("example").then((data) => {
      cy.wrap(data).as("loginData");
    });
  });
  const tagFilter = Cypress.env("TAG");

  // Skip tests based on the tag filter
  beforeEach(function () {
    // Check if the current test has the tags property
    const hasTags = this.currentTest && this.currentTest.tags;

    // Skip if the tag filter is set and the current test does not have the matching tag
    if (tagFilter && hasTags && !this.currentTest.tags.includes(tagFilter)) {
      this.skip(); // Skip this test if it does not match the tag
    }
  });
  it("Fetch Data From Json", { tags: ["regression"] }, () => {
    // steps
    login.openURL();
    cy.title().should("eq", "OrangeHRM"); // title verification
    cy.get("@loginData").then((loginData) => {
      login.typeUserName(loginData.username);
      login.typePassWord(loginData.userpassword);
      login.submitBtn();
      cy.get(
        "a[class='oxd-main-menu-item active']> span[class='oxd-text oxd-text--span oxd-main-menu-item--name']"
      ).contains(loginData.expected); //assertion
    });
  });
});
