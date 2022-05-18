import { Component } from '@angular/core';

@Component({
  selector: 'app-home-modal-join',
  templateUrl: './home-modal-join.component.html',
  styleUrls: ['./home-modal-join.component.css']
})
export class HomeModalJoinComponent {

  enabledButton: boolean;
  displayAlert: boolean;
  
  roomID!: string;
  username!: string;
  password!: string;

  constructor() {
    this.enabledButton = false;
    this.displayAlert = false;
  }

  checkLength() {
    console.log(this.roomID);
    
    return this.username?.length > 2 && this.password?.length > 2 && this.roomID?.length >= 18;
  }

  changeUsername(username: any) {
    this.username = username?.value?.trim();
    this.enabledButton = this.checkLength();
  }

  changeRoom(room: any) {
    this.roomID = room?.value?.trim();
    this.enabledButton = this.checkLength();
  }

  changePassword(password: any) {
    this.password = password?.value?.trim();
    this.enabledButton = this.checkLength();
  }

  submit() {
    if ( !this.checkLength() ) {
      this.displayAlert = true;
    } else this.displayAlert = false;
  }


}
