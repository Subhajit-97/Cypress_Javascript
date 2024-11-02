const fs = require("fs");
const { exec } = require("child_process");

// Read the file configuration
const config = JSON.parse(fs.readFileSync("file-config.json", "utf-8"));

// Filter the test files marked as "Yes"
const selectedFiles = config.testFiles
  .filter((test) => test.run === "Yes")
  .map((test) => test.file);

// Run Cypress with the selected test files
if (selectedFiles.length > 0) {
  const command = `npx cypress run --spec "${selectedFiles.join(
    ","
  )}" --browser chrome --headed --reporter cypress-mochawesome-reporter`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error running tests: ${error.message}`);
      return;
    }
    console.log(stdout);
    if (stderr) {
      console.error(stderr);
    }
  });
} else {
  console.log("No test files are marked to run.");
}
