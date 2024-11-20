require('dotenv').config();
const KcAdminClient = require('fix-esm').require("@keycloak/keycloak-admin-client").default;
const Client = new KcAdminClient();
Client.setConfig({
    baseUrl: process.env.BASE_URL,
    realmName: process.env.REALM_NAME,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
    });
    
    Client.auth({
        
         grantType: 'client_credentials',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
        
    }).then(async (token) => {
        
     
    }).catch((error) => {
        
    });
    exports.Client = Client;