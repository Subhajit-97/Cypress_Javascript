const fs = require("fs");
const { exec } = require("child_process");
const readline = require("readline");

// Read the file configuration
let config;
try {
  config = JSON.parse(fs.readFileSync("file-config.json", "utf-8"));
} catch (err) {
  console.error("Error reading file-config.json:", err.message);
  process.exit(1);
}

// Filter the test files marked as "Yes"
const selectedFiles = config.testFiles
  .filter((test) => test.run === "Yes")
  .map((test) => test.file);

if (selectedFiles.length === 0) {
  console.log("No test files are marked to run.");
  process.exit(0);
}

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(query) {
  return new Promise((resolve) =>
    rl.question(query, (answer) => resolve(answer.trim()))
  );
}

// Function to split test files into batches
function splitIntoBatches(files, numInstances) {
  const batches = Array.from({ length: numInstances }, () => []);
  files.forEach((file, index) => {
    batches[index % numInstances].push(file);
  });
  return batches.filter((batch) => batch.length > 0);
}

async function main() {
  try {
    const runTestsAnswer = await askQuestion(
      "Do you want to run Cypress tests? (yes/no): "
    );
    if (runTestsAnswer.toLowerCase() !== "yes") {
      console.log("Test run cancelled.");
      rl.close();
      return;
    }

    const runParallelAnswer = await askQuestion(
      "Do you want to run tests in parallel? (yes/no): "
    );
    let numInstances = 1;

    if (runParallelAnswer.toLowerCase() === "yes") {
      const numInstancesAnswer = await askQuestion(
        "Enter the number of parallel instances: "
      );
      numInstances = parseInt(numInstancesAnswer, 10);

      if (!Number.isInteger(numInstances) || numInstances <= 0) {
        console.log(
          "Invalid number of instances. Please enter a valid number greater than 0."
        );
        rl.close();
        return;
      }
    }

    console.log(
      `Running tests in ${
        numInstances > 1
          ? `parallel across ${numInstances} instances`
          : "a single instance"
      }...`
    );

    const batches = splitIntoBatches(selectedFiles, numInstances);

    // Run Cypress for each batch in parallel
    batches.forEach((batch, index) => {
      if (batch.length > 0) {
        const command = `npx cypress run --spec "${batch.join(
          ","
        )}" --reporter cypress-mochawesome-reporter --browser chrome --headed`;

        exec(command, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error in instance ${index + 1}:`, error.message);
          } else {
            console.log(`Instance ${index + 1} output:\n${stdout}`);
          }
          if (stderr) {
            console.error(`Instance ${index + 1} errors:\n${stderr}`);
          }
        });
      }
    });

    rl.close();
  } catch (error) {
    console.error("An error occurred:", error);
    rl.close();
  }
}

// Run the main function to initiate the prompts
main();
