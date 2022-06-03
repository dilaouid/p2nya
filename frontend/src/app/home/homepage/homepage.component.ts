import { Component, OnInit } from '@angular/core';
import { InitUser } from 'src/app/API/Users';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor() { 
    
  }

  ngOnInit(): void {
    InitUser();
  }

}
