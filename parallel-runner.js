const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const readline = require("readline");

// Directory containing spec files
const specsDir = "./cypress/e2e";
const allSpecs = fs
  .readdirSync(specsDir)
  .map((file) => path.join(specsDir, file));

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
    const specsPerInstance = Math.ceil(allSpecs.length / numInstances);

    for (let i = 0; i < numInstances; i++) {
      const specs = allSpecs.slice(
        i * specsPerInstance,
        (i + 1) * specsPerInstance
      );
      const command = `npx cypress run --spec "${specs.join(
        ","
      )}" --browser chrome --headed --reporter cypress-mochawesome-reporter`;

      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error in instance ${i + 1}:`, error.message);
        } else {
          console.log(`Instance ${i + 1} output:\n${stdout}`);
        }
        if (stderr) {
          console.error(`Instance ${i + 1} errors:\n${stderr}`);
        }
      });
    }

    rl.close(); // Close the readline interface when done
  } catch (error) {
    console.error("An error occurred:", error);
    rl.close();
  }
}

// Run the main function to initiate the prompts
main();
