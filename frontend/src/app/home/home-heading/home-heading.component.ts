import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-heading',
  templateUrl: './home-heading.component.html',
  styleUrls: ['./home-heading.component.css']
})
export class HomeHeadingComponent implements OnInit {
  
  /* How many opened room */
  room!: number;

  constructor() { }

  ngOnInit(): void {
    this.room = 0;
  }

}
