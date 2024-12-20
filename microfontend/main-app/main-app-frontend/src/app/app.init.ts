import { KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService): () => Promise<boolean> {
    return () =>
        keycloak.init({
            config: {
                url: 'http://localhost:8080/auth',
                realm: 'octopus',
                clientId: 'angular-client',
            },
            initOptions: {
                 checkLoginIframe: true,
                 checkLoginIframeInterval: 25,
              //onLoad: 'login-required',
              flow: 'standard'
            },
            loadUserProfileAtStartUp: true
        });
}
