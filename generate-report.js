const { exec } = require("child_process");

exec(
  "npx mochawesome-merge cypress/Results/.jsons/*.json > cypress/Results/merged-output.json",
  (error, stdout, stderr) => {
    if (error) {
      console.error("Error merging reports:", error);
      return;
    }
    console.log("Merged report generated:", stdout);

    exec(
      "npx marge cypress/Results/merged-output.json --reportDir cypress/Results --inline --assetsDir cypress/Results",
      (error, stdout, stderr) => {
        if (error) {
          console.error("Error generating HTML report:", error);
          return;
        }
        console.log("HTML report generated:", stdout);
      }
    );
  }
);
