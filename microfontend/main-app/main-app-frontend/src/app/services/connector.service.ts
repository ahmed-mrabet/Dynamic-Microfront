import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectorService {
  CONNECTOR_URL:any="http://localhost:100/connectors"
  constructor(private httpClient:HttpClient) {
    //send request to create a connector
    
   }
   addConnector(Connector:any):Observable<any>{
    return this.httpClient.post(this.CONNECTOR_URL,Connector)   };

  getConnectors():Observable<any>{
    return this.httpClient.get(this.CONNECTOR_URL);
  }
  checkConnectorExists(connectorName: string): Observable<boolean> {
    return this.getConnectors().pipe(
      map(connectors => connectors.some((connector: { name: string; }) => connector.name === connectorName))
    );
  }
  deleteConnector(id:any){
    return this.httpClient.delete(this.CONNECTOR_URL+'/'+id);
  }
}
