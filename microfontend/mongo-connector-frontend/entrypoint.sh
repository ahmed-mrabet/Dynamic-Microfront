#!/bin/bash
# Check if the environment variable is set
if [ -z "$BACKEND_BASE_URL" ]; then
  echo "API_URL environment variable is not set."
  exit 1
fi
# Create the JSON string with the API URL and CONNECTOR NAME 
JSON="{ \"ApiUrl\": \"$BACKEND_BASE_URL\", \"ConnectorName\": \"$CONNECTOR_NAME\",\"Port\": \"$SERVICE_PORT_FRONT\" }"
# Write the JSON string to a file
echo $JSON > config.json
echo "Config JSON file generated successfully with API URL: $BACKEND_BASE_URL" and CONNECTOR NAME : $CONNECTOR_NAME
echo "the port is" : $SERVICE_PORT_FRONT
node set-public-host.js
# Serve the Angular application
ng serve --host 0.0.0.0 --port $SERVICE_PORT_FRONT