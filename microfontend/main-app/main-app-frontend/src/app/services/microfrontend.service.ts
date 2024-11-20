import { loadRemoteModule } from '@angular-architects/module-federation';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export interface MicroFrontend {
  baseUrl: string;
  moduleName: string;
  remoteEntry: string;
  remoteName: string;
  exposedModule: string;
}
@Injectable({
  providedIn: 'root'
})

export class MicrofrontendService {
  private microFrontendsSubject = new BehaviorSubject<MicroFrontend[]>([]);
  microFrontends$ = this.microFrontendsSubject.asObservable();

  constructor(private router: Router) {
    this.microFrontendsSubject.next([
      {
        baseUrl: 'add-new-connection',
        moduleName: 'ExposedModule',
        remoteEntry: 'http://localhost:31059/remoteEntry.js',
        remoteName: 'mysql_connector',
        exposedModule: './ExposedModule',
      },
      {
        baseUrl: 'alerting',
        moduleName: 'AlertingModule',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        remoteName: 'alerting',
        exposedModule: './Module',
      },
    ]);
  }
  getMicroFrontends(): MicroFrontend[] {
    return this.microFrontendsSubject.getValue();
  }
  addMicroFrontend(mf: MicroFrontend) {
    const currentMicroFrontends = this.microFrontendsSubject.getValue();
    const newMicroFrontends = [...currentMicroFrontends, mf];
    this.microFrontendsSubject.next(newMicroFrontends);
    this.updateRoutes(newMicroFrontends);
  }
  updateRoutes(microFrontends: MicroFrontend[]) {
    const routes = [
      ...microFrontends.map(mf => ({
        path: mf.baseUrl,
        loadChildren: () =>
          loadRemoteModule({
            remoteEntry: mf.remoteEntry,
            remoteName: mf.remoteName,
            exposedModule: mf.exposedModule,
          }).then(m => m[mf.moduleName])
      })),

    ];

    this.router.resetConfig(routes);
  }

   }
