// command feature is used for repeating task like "loginapp"

describe("Login Test Using Data from JSON File", () => {
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

  it(
    "Should log in successfully with credentials from JSON file",
    { tags: ["smoke"] },
    () => {
      cy.fixture("example").then((data) => {
        // Use the data from the fixture directly
        cy.loginapp(data.username, data.userpassword, data.expected);
      });
    }
  );
});
