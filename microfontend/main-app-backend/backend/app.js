require('dotenv').config();
const mysql = require("mysql");
const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const keycloak = require('./keycloak');
const mongoose = require('mongoose');
const User = require('./models/user');
const Connector = require('./models/connector');
const Chart = require('./models/chart');
const UnauthorizedError = require('./handlers/unauthorized');
const PermissionDeniedError =require('./handlers/permission-denied');
const NotFoundError =require('./handlers/not-found');
const InternalServerError = require ('./handlers/internal-server');
const Error= require('./errorConst');
const { exec } = require('child_process');
const { v4: uuidv4 } = require('uuid'); // Import UUID generator
const allocatedPorts = new Set();
//mainAppDB : database name 
 mongoose.connect(process.env.DATABASE_URL);
// Enable CORS
app.use(cors());

// Configure app with bodyparser to send response => JSON 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const connection = mysql.createConnection({
  host: "mysql",
  port: 3307,
  user: "root",
  password: "1234",
  multipleStatements: true,
});

//get charts
app.get('/chart-data', async (req, res) => {
  try {
    const charts = await Chart.find();
    res.status(200).json(charts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve charts' });
  }
});
//connect to mysql
// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL:', err);
//     return;
//   }
//
// });
//getting values from mysql
app.get('/column-values', (req, res) => {
  const { database, tableName, column } = req.query;
  if (!database || !tableName || !column) {
    return res.status(400).json({ error: 'Missing parameters' });
  }
  chartdatabase = `\`${database}\``
  const query = `SELECT columnValue FROM ${chartdatabase}.${tableName} where columnKey='${column}'`;
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error executing SQL query:', error);
      return res.status(500).json({ error: 'Failed to fetch column values' });
    }
    // Extract column values from the query results
    const columnValues = results.map(row => row.columnValue);
    res.status(200).json(columnValues);
  });
});

// List users
app.get('/users', async (req, res) => {
  try {
    const {pageSize,pageNumber} = req.query
    if (pageSize<0 || pageNumber<0){
        res.status(400).json({error:Error.NegatifNumberErrorText,code:Error.NegatifNumberErrorCode})
    }
    if(pageNumber==0 ||pageNumber>2147483647){
        res.status(400).json({error:Error.OutOfBoundNumberErrorText,code:Error.OutOfBoundNumberErrorCode}) 
   }
      // Retrieve users from Keycloak
      const users = await keycloak.Client.users.find();
      
      // Simplify user data
      const simplifiedUsers = users.map(({ id, username,firstName,lastName,email }) => ({ id, username,firstName,lastName,email }));
      
      // Return success response
      res.status(200).json(simplifiedUsers);
  } catch (error) {
      // Handle errors
      if (error.statusCode == UnauthorizedError.statusCode) {
          res.status(401).json({ error: Error.UserUnauthorizedErrorText,code:Error.UserUnauthorizedErrorCode });
      } else if (error.statusCode == PermissionDeniedError.statusCode) {
          res.status(403).json({ error: Error.PermissionDeniedErrorText,code: Error.PermissionDeniedErrorCode });
      
      } else {
          res.status(500).json({ error: Error.InternalServerErrorText,code:Error.InternalServerErrorCode });
          
      }
  }
});
  // Create user
app.post('/users', async (req, res) => {
  try {
      // Extract user data from the request body
      const { username, firstName, lastName, email,role } = req.body;
      const validRoles = process.env.VALID_ROLES;
      if(!username){
        return res.status(400).json({error:Error.MissingUsernameErrorText,code:Error.MissingUsernameErrorCode});
      }
      if(!email){
        return res.status(400).json({error:Error.MissingEmailErrorText,code:Error.MissingEmailErrorCode});
      }
      if(!role){
        return res.status(400).json({error:Error.MissingRoleErrorText,code:Error.MissingRoleErrorCode});
      }

      // Check if email already exists
      const existingUser = await keycloak.Client.users.find({ email});
      if (existingUser.length > 0) {
          // Return error response if username already exists
          return res.status(400).json({ error: Error.EmailExistsErrorText,code:Error.EmailExistsErrorCode });
      }
      if(!validRoles.includes(role)){
        return res.status(400).json({error:Error.InvalidRoleErrorText,code:Error.InvalidRoleErrorCode});
      }
      
      // Create user in Keycloak
      const createdUser = await keycloak.Client.users.create({
          username,
          firstName,
          lastName,
          email
      });
      
      
      const userObj = new User({
          id: createdUser.id, 
          username,
          firstName,
          lastName,
          email,
          role
      });
         await userObj.save();
        
      res.status(201).json({id:createdUser.id,username:username,firstName:firstName,lastName:lastName,email:email,role:role});
    
      
  } catch (error) {
    // Handle errors
    if (error.statusCode == UnauthorizedError.statusCode) {
        res.status(401).json({ error: Error.UserUnauthorizedErrorText,code:Error.UserUnauthorizedErrorCode });
    } else if (error.statusCode == PermissionDeniedError.statusCode) {
        res.status(403).json({ error: Error.PermissionDeniedErrorText,code: Error.PermissionDeniedErrorCode });
    
    } else {
        res.status(500).json({ error: Error.InternalServerErrorText,code:Error.InternalServerErrorCode });
        
    }
}
});


  // Delete user
app.delete('/users/:id', async (req, res) => {
  let uid = req.params.id;

  try {
      // Delete user from your database
      await User.deleteOne({ id: uid });

      // Delete user from Keycloak
      await keycloak.Client.users.del({ id: uid });

      // Return success response
      res.status(204).json({});
  } catch (error) {
      // Handle errors
      if (error.statusCode == NotFoundError.statusCode) {
          res.status(404).json({ error: Error.UserNotFoundErrorText,code:Error.UserNotFoundErrorCode });
    } else if (error.statusCode == UnauthorizedError.statusCode) {
        res.status(401).json({ error: Error.UserUnauthorizedErrorText,code:Error.UserUnauthorizedErrorCode });
    } else if (error.statusCode == PermissionDeniedError.statusCode) {
        res.status(403).json({ error: Error.PermissionDeniedErrorText,code: Error.PermissionDeniedErrorCode });
    
    } else {
        res.status(500).json({ error: Error.InternalServerErrorText,code:Error.InternalServerErrorCode });
        
    }
  }
});

function getRandomPort() {
  return Math.floor(Math.random() * (32767 - 30000 + 1)) + 30000;
}

// Function to allocate a unique port
function allocatePort() {
  let port;
  do {
      port = getRandomPort();
  } while (allocatedPorts.has(port));
  allocatedPorts.add(port);
  return port;
}
// Function to deploy MySQLConnector microservice and create/update the corresponding service
async function deployConnector(connectorName,connectorType) {
  try {
    const INSTANCE_ID = uuidv4().slice(0, 8);
    // Allocate a unique port for the service
    const servicePort = allocatePort().toString();
    const servicePortFront =allocatePort().toString();
      const command = `helm install ${connectorType}-connector-${INSTANCE_ID}-backend ./${connectorType}-connector-backend-helm --set INSTANCE_ID=${INSTANCE_ID} --set SERVICE_PORT=${servicePort}`;
      const commandfront = `helm install ${connectorType}-connector-${INSTANCE_ID}-frontend ./${connectorType}-connector-frontend-helm --set INSTANCE_ID=${INSTANCE_ID} --set SERVICE_PORT_FRONT=${servicePortFront} --set CONNECTOR_NAME=${connectorName} --set SERVICE_PORT=${servicePort} `;
      exec(command, (error, stdout, stderr) => {

          if (error) {
              throw error ;
          }
      });
      exec(commandfront, (error, stdout, stderr) => {
          if (error) {
              throw error ;
          }
      });



   
    return servicePortFront;
  } catch (error) {
    
    // Handle error or implement rollback logic here
    throw error;
  }

}
// API endpoint for adding MySQLConnector extension
app.post("/connectors", async (req, res) => {
  try {
    const  connectorName = req.body.connectorName;
    const connectorType = req.body.connectorType;
    if(!connectorName || !connectorType){
      res.status(400).send({error: Error.MISSING_CONNECTOR_NAME_ERROR_TEXT, code: Error.MISSING_CONNECTOR_NAME_ERROR_CODE});
    }
     
    else {
       //check if the connectorName exists
     const existingConnector = await Connector.find({name: connectorName});
      if(existingConnector.length >0){
      res.status(400).send({error: Error.CONNECTOR_NAME_EXISTS_ERROR_TEXT, code:Error.CONNECTOR_NAME_EXISTS_ERROR_CODE});
      }
      else{

      // Deploy Connector microservice and get the INSTANCE_ID
      const servicePortFront= await deployConnector(connectorName,connectorType);
      const url = `${process.env.CONNECTOR_PREFIX_URL}${servicePortFront}`
      const ConnectorObj = new Connector({name:connectorName,type:connectorType,url});
      await ConnectorObj.save();
      res.status(201).send(ConnectorObj);
      console.log("success")}

    }
   
  } catch (error) {
    // Handle errors
    if (error.statusCode == UnauthorizedError.statusCode) {
      res.status(401).json({ error: Error.UserUnauthorizedErrorText,code:Error.UserUnauthorizedErrorCode });
  } else if (error.statusCode == PermissionDeniedError.statusCode) {
      res.status(403).json({ error: Error.PermissionDeniedErrorText,code: Error.PermissionDeniedErrorCode });
  
  } else if (error.statusCode == InternalServerError.statusCode) {
      res.status(500).json({ error: Error.InternalServerErrorText,code:Error.InternalServerErrorCode });
      
  } else {
    res.status(500).send(process.env.DEPLOY_ERROR + error.message);
  } 
     
  }
});

// API endpoint for listing  all Connectors 
app.get('/connectors',(req,res)=>{
  try{
    Connector.find().then((connectors)=>{
      res.status(200).send(connectors);
      })

  }
  catch(error){
    // Handle errors
    if (error.statusCode == UnauthorizedError.statusCode) {
      res.status(401).json({ error: Error.UserUnauthorizedErrorText,code:Error.UserUnauthorizedErrorCode });
  } else if (error.statusCode == PermissionDeniedError.statusCode) {
      res.status(403).json({ error: Error.PermissionDeniedErrorText,code: Error.PermissionDeniedErrorCode });
  
  } else {
      res.status(500).json({ error: Error.InternalServerErrorText,code:Error.InternalServerErrorCode });
      
  }
  }
 
})

//API endpoint for getting connector by id :
app.get('/connectors/:id',(req,res)=>{
  try{
    let id = req.params.id;
    Connector.findOne({_id: id}).then((connector)=>{
      res.status(200).send(connector);
      })


  }
  catch(error){
     // Handle errors
     if (error.statusCode == UnauthorizedError.statusCode) {
      res.status(401).json({ error: Error.UserUnauthorizedErrorText,code:Error.UserUnauthorizedErrorCode });
  } else if (error.statusCode == PermissionDeniedError.statusCode) {
      res.status(403).json({ error: Error.PermissionDeniedErrorText,code: Error.PermissionDeniedErrorCode });}
    else if (error.statusCode == NotFoundError.statusCode) {
        res.status(404).json({ error: Error.CONNECTOR_NOT_FOUND_ERROR_TEXT,code: Error.CONNECTOR_NOT_FOUND_ERROR_CODE });
  
  } else {
      res.status(500).json({ error: Error.InternalServerErrorText,code:Error.InternalServerErrorCode });
      
  }
  }
})
//API to remove connector:
app.delete('/connectors/:id', async(req,res)=>{
  let id = req.params.id;
  try{
    await Connector.deleteOne({_id: id});
    res.status(204).json({});
  }
  catch(error) {
    if (error.statusCode == NotFoundError.statusCode) {
      res.status(404).json({ error: Error.CONNECTOR_NOT_FOUND_ERROR_TEXT,code:Error.CONNECTOR_NOT_FOUND_ERROR_CODE });
} else if (error.statusCode == UnauthorizedError.statusCode) {
    res.status(401).json({ error: Error.UserUnauthorizedErrorText,code:Error.UserUnauthorizedErrorCode });
} else if (error.statusCode == PermissionDeniedError.statusCode) {
    res.status(403).json({ error: Error.PermissionDeniedErrorText,code: Error.PermissionDeniedErrorCode });

} else {
    res.status(500).json({ error: Error.InternalServerErrorText,code:Error.InternalServerErrorCode });
    
}

  }
})
  module.exports = app;