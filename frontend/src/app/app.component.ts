import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { InitUser } from './API/Users';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    api: string = environment.api
    title: any;
    
    constructor() {
      InitUser();
    }
    
};