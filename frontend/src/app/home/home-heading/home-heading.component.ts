import { Component, OnInit } from '@angular/core';
import { CountRooms } from 'src/app/API/Rooms';

@Component({
  selector: 'app-home-heading',
  templateUrl: './home-heading.component.html',
  styleUrls: ['./home-heading.component.css']
})
export class HomeHeadingComponent implements OnInit {
  
  /* How many opened room */
  loading: boolean = true;
  room!: number;

  constructor() { }

  async ngOnInit(): Promise<void> {
    const apiCountRooms = await CountRooms();
    this.room = apiCountRooms.data[0];
    this.loading = false;
  };

}
