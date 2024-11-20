const express = require("express");
const { spawn } = require("child_process");
// Import MySQL module to create a MySQL connection
const mysql = require("mysql");
const consul = require("consul");
const cors = require("cors");
const fs = require("fs");
const csv = require("csv-parser");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require('mongoose');
const { log } = require("console");
// For input validation
const { query, validationResult } = require("express-validator");
const CustomError= require('./errorConst');
// Enable CORS
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
//configure APP with bodyparser to send response => JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let INSTANCE_ID = process.env.INSTANCE_ID;
let servicePort = process.env.SERVICE_PORT;
let CONNECTORPREFIX = process.env.CONNECTORPREFIX;
let CONNECTORSUFFIX = process.env.CONNECTORSUFFIX;
let ENDPOINT = process.env.ENDPOINT;
let PROTOCOL = process.env.PROTOCOL;
let MESSAGE = process.env.MESSAGE;
mongoose.connect("mongodb://mongodb-service/mainAppDB");
// Important to know the port of the connector
console.log(INSTANCE_ID, servicePort);
const chartSchema = mongoose.Schema({
  id: String,
  tableName :String,
  axisX : String,
  axisY: String,
  labelX : String,
  labelY: String,
  chartName: String,
  selectedItem: String,
  database: String
}, { versionKey: false },{ _id : false }) ;
chartSchema.set('primaryKey','id');
const chart =mongoose.model("Chart",chartSchema);
app.post("/chart-data", async (req, res) => {
  const chartData = req.body;
  console.log("Received chart data:", chartData);
  chartData['database']=`${CONNECTORPREFIX}${INSTANCE_ID}`;
  const newChart = new chart(chartData);
  await newChart.save();
});
// Start the server
// const PORT = process.env.PORT || 3004;
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
/* Endpoint to connect to database, retrieve data and format it, connect to MySQL and create
database, save formated data*/
app.post("/connect", async (req, res) => {
  const host = req.body.host;
  const port = req.body.port;
  const user = req.body.user;
  const password = req.body.password;
  const database = req.body.database;
  async function connectiontoDB(){
    try{


    const mysqlconnector = await mysql.createConnection({
      host: host,
      port: port,
      user: user,
      password: password,
      database: database,
    });
    console.log('Database connected successfully');
    return connection;
   }catch (error){
    console.error(CustomError.CONNECTINGTOMYSQLERRORTEXT, error.message);
    res.status(500).send(CustomError.CONNECTINGTOMYSQLERRORTEXT + error.message);
    return;
   }
  }


  // Generic functions to insert and execute SQL queries using async/await
  async function executeQuery(connection, query) {
    return new Promise((resolve, reject) => {
      connection.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
  async function insertQuery(connection, query, data) {
    return new Promise((resolve, reject) => {
      connection.query(query, [data], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
  const queryTables = `SHOW TABLES FROM ${database}`;
  mysqlconnector.query(queryTables, async (queryErr, results) => {
    if (queryErr) {
      console.error(CustomError.FETCHINGTABLESERRORTEXT, queryErr.message);
      mysqlconnector.end();
      res.status(500).send(CustomError.FETCHINGTABLESERRORTEXT + queryErr.message);
      return;
    }
    // Process the list of tables
    const tables = results.map((row) => {
      return row[`Tables_in_${database}`];
    });
    const allResults = [];
    async function processDataExport(tables) {
      try {
        for (const table of tables) {
          const queryData = `SELECT * FROM ${table}`;
          // Wrap the query operation in a promise and await its resolution
          const result = await new Promise((resolve, reject) => {
            mysqlconnector.query(queryData, (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            });
          });
          // Format the query result for the current table
          const formattedResult = result.map((row) => {
            const formattedRow = {};
            // Iterate over each column in the row
            for (const columnKey of Object.keys(row)) {
              formattedRow[columnKey] = row[columnKey];
            }
            const firstColumnKey = Object.keys(row)[0];
            const rowIdValue = row[firstColumnKey];
            formattedRow.row_id = rowIdValue;
            // Construct an array of objects where each object represents a column key-value pair
            const columnData = Object.keys(formattedRow)
              .map((columnKey) => {
                if (columnKey !== "row_id") {
                  // Exclude 'row_id' from columnData
                  return {
                    columnKey,
                    columnValue: formattedRow[columnKey],
                    row_id: formattedRow.row_id,
                  };
                }
                return null;
              })
              .filter((columnItem) => columnItem !== null);
            return columnData;
          });
          const finalResult = formattedResult.flat();
          // Push the result into the array of all results
          allResults.push({ table, result: formattedResult });
        }
      } catch (error) {
        console.error(`${CustomError.EXECUTINGQUERYERRORTEXT}${table}':`, error);
        // Handle the error as needed (e.g., continue processing or terminate)
      }
      // Process or return all results as needed
      return {
        allResults,
        formattedResults: allResults.map((item) => item.result),
      };
    }
    tablesData = await processDataExport(tables);
    // Configuration for MySQL connection
    const connection = mysql.createConnection({
      host: process.env.HOST,
      port: process.env.PORT,
      user: process.env.USER,
      password: process.env.PASSWORD,
      multipleStatements: true,
    });
    // Connect to MySQL server
    connection.connect((err) => {
      if (err) {
        console.error(CustomError.CONNECTINGTOMYSQLERRORTEXT, err.message);
        res.status(500).send(CustomError.CONNECTINGTOMYSQLERRORTEXT + err.message);
        return;
      }
      // Create database
      const dbName = `${CONNECTORPREFIX}${INSTANCE_ID}`;
      connection.query(`CREATE DATABASE \`${dbName}\`;`, (createDbErr) => {
        if (createDbErr) {
          console.error(CustomError.CREATINGDATABASEERRORTEXT, createDbErr.message);
          res
            .status(500)
            .send(CustomError.CREATINGDATABASEERRORTEXT + createDbErr.message);
        }
        // Process each table in tablesData
        tablesData.allResults.forEach(async (tableData) => {
          const { table, result } = tableData;
          const createTableQuery = `
            USE \`${dbName}\`;
            CREATE TABLE \`${table}\` (
                id INT AUTO_INCREMENT PRIMARY KEY,
                columnKey VARCHAR(255),
                columnValue VARCHAR(255),
                row_id INT
            );
        `;
          await executeQuery(connection, createTableQuery);
          batchInsertQuery = `INSERT INTO \`${table}\` (columnKey, columnValue, row_id) VALUES ?;`;
          data = [];
          result.forEach((row) => {
            row.forEach(async (column) => {
              //update batchInsertQuery
              await insertQuery(connection, batchInsertQuery, [
                [column.columnKey, "" + column.columnValue, column.row_id],
              ]);
            });
          });
        });
      });
      res.status(200).json({"message": CustomError.CONNECTIONCREATEDSUCCESSFULLYTEXT});
    });
  });
});
const ERR_DELIMITER = "\x0a"
// Custom validator for checking if pageNumber is a negative number
const numberNegatif = value => {
  if (value <= 0) {
    throw new Error(`${CustomError.NEGATIVENUMBERERRORTEXT}${ERR_DELIMITER}${CustomError.NEGATIVENUMBERERRORCODE}`);
  }
  return true;
};
// Custom validator for checking if pageNumber is out of bound (greater than 2147483647)
const numberOutOfBound = value => {
  if (value > 2147483647) {
    throw new Error(`${CustomError.NUMBEROUTOFBOUNDERRORTEXT}${ERR_DELIMITER}${CustomError.NUMBEROUTOFBOUNDERRORCODE}`);
  }
  return true;
};
// Endpoint to get all tables or specific table by tableName if provided as query parameter
app.get(
  "/tables",
  query('pageNumber')
      .custom(numberNegatif)
      .custom(numberOutOfBound),
  query("pageSize")
    .custom(numberNegatif)
    .custom(numberOutOfBound),
  query("tableName").optional(),
  (req, res) => {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = errors.array().map(error => {
        const parts = error.msg.split(ERR_DELIMITER);
        return {
            error: parts[0],
            code: parts[1]
        };
    });
      return res.status(400).json(formattedErrors);
    }
    const dbName = `${CONNECTORPREFIX}${process.env.INSTANCE_ID}`; // Database name
    const connection = mysql.createConnection({
      host: process.env.HOST,
      port: process.env.PORT,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: dbName,
    });
    // Connect to the MySQL server
    connection.connect();
    // Check if tableName is provided as a query parameter
    const tableName = req.query.tableName;
    const pageNumber = req.query.pageNumber;
    const pageSize = req.query.pageSize;
    const offset = (pageNumber - 1) * pageSize;
    if (tableName) {
      // Fetch data for a specific table if tableName query param is present
      const selectQuery = `SELECT * FROM \`${tableName}\``;
      connection.query(selectQuery, (error, results) => {
        if (error) {
          console.error(`${CustomError.FETCHINGDATAFROMTABLEERRORTEXT}${tableName}`, error);
          if(error.code === 'ER_NO_SUCH_TABLE'){
            res.status(400).json({ error: CustomError.INVALIDTABLENAMETEXT, code: CustomError.INVALIDTABLENAMECODE });
            return;
          }
        }
        res.json({ tableName: tableName, data: results || [] });
      });
      return;
    }
    // If tableName is not provided, fetch data from all tables
    const query = `SHOW TABLES FROM \`${dbName}\``;
    connection.query(query, async (error, results, fields) => {
      if (error) {
        console.error(CustomError.FETCHINGTABLESERRORTEXT, error);
        res.status(500).json({ error: CustomError.FAILEDFETCHINGTABLESERRORTEXT });
        return;
      }
      const tables = results.map((row) => row[`Tables_in_${dbName}`]);
      // Paginate tables based on the offset and pageSize
      const paginatedTables = tables.slice(offset, offset + pageSize);
      // Fetch data from each table
      const tableDataPromises = paginatedTables.map((table) => {
        const selectQuery = `SELECT * FROM \`${table}\``;
        return new Promise((resolve, reject) => {
          connection.query(selectQuery, (error, results) => {
            if (error) {
              console.error(`${CustomError.FETCHINGDATAFROMTABLEERRORTEXT}${table}:`, error);
              reject(error);
            } else {
              resolve({ tableName: table, data: results });
            }
          });
        });
      });
      // Execute all table data retrieval promises
      const tableData = await Promise.all(tableDataPromises);
      connection.end();
      res.json({
        tables: tableData,
        pageNumber,
        pageSize,
        totalTables: tables.length,
      });
    });
  }
);
module.exports = app;