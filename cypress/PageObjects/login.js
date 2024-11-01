// import loginlocators from "../Locators/login_Locators";

class loginpage {
  username = "[name='username']";
  password = "[name='password']";
  submit = "[type='submit']";
  openURL() {
    cy.visit(Cypress.env("URL"));
  }
  typeUserName(Username) {
    const uname = cy.get(this.username);
    uname.clear();
    uname.type(Username);
    return this;
  }
  typePassWord(Password) {
    const pword = cy.get(this.password);
    pword.clear();
    pword.type(Password);
    return this;
  }
  submitBtn() {
    cy.get(this.submit).click();
  }
}

export default loginpage;
