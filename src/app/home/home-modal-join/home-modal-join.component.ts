import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-modal-join',
  templateUrl: './home-modal-join.component.html',
  styleUrls: ['./home-modal-join.component.css']
})
export class HomeModalJoinComponent implements OnInit {

  disabledButton: boolean;
  displayAlert: boolean;
  
  roomID!: string;
  password!: string;

  constructor() {
    this.disabledButton = true;
    this.displayAlert = false;
  }

  ngOnInit(): void {
  }

}
