const path = require('path');
const fs = require('fs');
const configJsonPath = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configJsonPath, 'utf-8'));


const port = config.Port || 4202;
// Path to angular.json
const angularJsonPath = path.join(__dirname, 'angular.json');

// Read angular.json
const angularJson = JSON.parse(fs.readFileSync(angularJsonPath, 'utf-8'));

// Set the publicHost dynamically
angularJson.projects['mongo-connector-frontend'].architect.serve.options.publicHost = `http://localhost:${port}`;

// Write the updated angular.json back to the file system
fs.writeFileSync(angularJsonPath, JSON.stringify(angularJson, null, 2));

console.log(`Updated publicHost to http://localhost:${port}`);

