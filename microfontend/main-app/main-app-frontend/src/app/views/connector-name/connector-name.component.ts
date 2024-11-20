import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import {ConnectorService} from 'src/app/services/connector.service'
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConnectorDeployedDialogComponent } from '../connector-deployed-dialog/connector-deployed-dialog.component';
import RemoteEntries from '../../../../remote-entries.json'
import { loadRemoteModule } from '@angular-architects/module-federation';
import { DefaultLayoutComponent } from 'src/app/containers/default-layout/default-layout.component';
@Component({
  selector: 'app-connector-name',
  templateUrl: './connector-name.component.html',
  styleUrls: ['./connector-name.component.scss']
})
export class ConnectorNameComponent implements OnInit {
  connectorUrl:any
  NameExists:any = false
  connectorForm!: FormGroup;
  LABEL='Enter a name for your connector:';
  NEW_CONNECTION_CONNECTOR_NAME='New Connection';
  NAME_REQUIRED='Name is required';
  MIN_LENGTH_ERROR ='Name must have at least 3 characters';
  MAX_LENGTH_ERROR ='Name must have at most 50 characters';
  NEXT_BUTTON='Next';
  PERVIOUS_BUTTON='Previous';
  PREVIOUS_PATH = 'new-connection-database';
  TypeParam:any
  constructor(private route: ActivatedRoute,private router:Router, private formBuilder: FormBuilder,private dialog: MatDialog, private ConnectorService:ConnectorService) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{ this.TypeParam = params['type']})
    this.connectorForm = this.formBuilder.group({
      name: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(50)]]})

  }
  onSubmit() {
    if (this.connectorForm.valid) {
      // Extract data from the form
      let Req: any = document.getElementById('name');
      const connectorName: any = Req.value;
      const data: any = { connectorName: connectorName, connectorType: this.TypeParam };
      console.log("Submitting data:", data);

      // Call the service to add a new connector
      this.ConnectorService.addConnector(data).subscribe(connector => {
        this.connectorUrl = connector.url;
        console.log('Connector created:', connector);

        let newMicroFrontend: any;

        // Determine the micro frontend configuration based on type
        switch (this.TypeParam) {
          case 'mysql':
            newMicroFrontend = {
              "baseUrl": "add-new-connection",
              "moduleName": "ExposedModule",
              "remoteEntry": `${this.connectorUrl}/remoteEntry.js`,
              "remoteName": "mysql_connector",
              "exposedModule": "./ExposedModule"
            };
            break;
          case 'mongo':
            newMicroFrontend = {
              "baseUrl": "mongo",
              "moduleName": "ExposeModule",
              "remoteEntry": `${this.connectorUrl}/remoteEntry.js`,
              "remoteName": "mongo_connector",
              "exposedModule": "./ExposeModule"
            };
            break;
          default:
            console.error('Unknown connector type');
            return; // Exit if an unknown type is encountered
        }
        console.log('New micro frontend configuration:', newMicroFrontend);

        // Add the new micro frontend to the list of remote entries
        RemoteEntries.push(newMicroFrontend);

        // Open a dialog to indicate the connector has been deployed
        this.dialog.open(ConnectorDeployedDialogComponent, { width: '300px' });

        // Create a dynamic route for the new micro frontend
        const dynamicRoute = {
          path: newMicroFrontend.baseUrl,
          loadChildren: () =>
            loadRemoteModule({
              remoteEntry: newMicroFrontend.remoteEntry,
              remoteName: newMicroFrontend.remoteName,
              exposedModule: newMicroFrontend.exposedModule,
            }).then(m => m[newMicroFrontend.moduleName])
              .catch(err => {
                console.error('Failed to load MFE module:', err);
                return null;
              })
        };

        // Find the route configuration for DefaultLayoutComponent
        const defaultLayoutRoute = this.router.config.find(route => route.component === DefaultLayoutComponent);

        if (defaultLayoutRoute) {
          if (!defaultLayoutRoute.children) {
            defaultLayoutRoute.children = [];
          }
          // Add the dynamic route to the children of DefaultLayoutComponent
          defaultLayoutRoute.children.push(dynamicRoute);
          // Update the router configuration
          this.router.resetConfig(this.router.config);
          console.log('Updated Router Config:', this.router.config);
        } else {
          console.error('DefaultLayoutComponent route not found.');
        }
      }, error => {
        // Handle any errors from the ConnectorService
        console.error('Error adding connector:', error);
      });
    } else {
      console.warn('Form is invalid. Please check the form fields.');
    }
  }




  Previous(){
    this.router.navigate([this.PREVIOUS_PATH])
  }
  getConnectorUrl(connector:any){

    this.connectorUrl = connector.url;
  }


}
