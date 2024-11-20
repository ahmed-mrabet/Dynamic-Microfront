import { Component } from '@angular/core';
import {MongoFormComponent} from './expose/mongo-form/mongo-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mongo-connector-frontend';
}
