// each describe block may have multiple it block , and each it block represents each test
Spec file(cy.js) --> describe blocks (test suite) --> it blocks (testcase) --> test steps

npm -i init --> creates package.json file
npm install cypress --save -dev --> install cypress 
npx cypress open --> start cypress then from spec we have to run the test 
npx cypress run --headed --> run all the spec file with headed mode under e2e directly through terminal (by default it will run on electron browser)
npx cypress run --browser chrome --spec cypress\e2e\Test1.cy.js --headed --> run specific spec file with headed mode under e2e directly through terminal (by default it will run on electron browser)
npm install cypress-parallel --> To run parallel tests
npm run test-chrome-all --> Custom command 
node parallel-runner.js --> To run all the test cases in parallel mode
node generate-report.js --> To generate merge report
--------------------------------------------------------------------------------
Locators --> only supports css selector & Xpath (need to add plugin, if we want to use xpath)
css selector --> tag#id, tag.class, tag[attribute='value'], tag.class[attribute='value']

