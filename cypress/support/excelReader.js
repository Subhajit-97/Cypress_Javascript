// // const { initPlugin } = require("cypress-plugin-snapshots/plugin");

// // const xlsx = require("xlsx");

// // module.exports = (on, config) => {
// //   initPlugin(on, config);
// //   on("task", {
// //     generateJSONFromExcel: generateJSONFromExcel,
// //   });
// //   return config;
// // };
// // // Excel to Json
// // function generateJSONFromExcel(args) {
// //   const workbook = xlsx.readFile(args.excelFilePath, { dateNF: "mm/dd/yyyy" });
// //   const ws = workbook.Sheets[args.sheetName];
// //   return xlsx.utils.sheet_to_json(ws, { raw: false });
// // }
// // cypress/support/excelReader.js
// // const XLSX = require("xlsx");

// // function readExcelFile(filePath, sheetName) {
// //   const workbook = XLSX.readFile(filePath);

// //   // Check if the specified sheet exists
// //   if (!workbook.Sheets[sheetName]) {
// //     throw new Error(`Sheet named "${sheetName}" does not exist.`);
// //   }

// //   const sheet = workbook.Sheets[sheetName];
// //   const data = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Convert to JSON

// //   // Check if we have at least two rows
// //   if (data.length < 2) {
// //     throw new Error("The sheet must contain at least two rows.");
// //   }

// //   const headers = data[0]; // First row contains headers
// //   const values = data[1]; // Second row contains values
// //   const result = {};

// //   headers.forEach((header, index) => {
// //     result[header] = values[index]; // Create key-value pairs
// //   });

// //   return result;
// // }

// // module.exports = { readExcelFile };
// // cypress/support/excelReader.js
// // cypress/support/excelReader.js
// const xlsx = require("xlsx");

// function readExcelData(filePath, sheetName) {
//   const workbook = xlsx.readFile(filePath);
//   const worksheet = workbook.Sheets[sheetName];

//   // Convert sheet to JSON with headers
//   const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

//   const headers = jsonData[0];
//   const rows = jsonData.slice(1);

//   // Convert rows to JSON using headers
//   return rows.map((row) => {
//     const rowData = {};
//     headers.forEach((header, index) => {
//       rowData[header] = row[index];
//     });
//     return rowData;
//   });
// }

// module.exports = { readExcelData };
