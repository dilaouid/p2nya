import { Component } from '@angular/core';
import { InputValidation } from '../models/home-modal-validation';

@Component({
  selector: 'app-home-modal-join',
  templateUrl: './home-modal-join.component.html',
  styleUrls: ['./home-modal-join.component.css']
})
export class HomeModalJoinComponent {

  enabledButton: boolean;
  displayAlert: boolean;
  
  password!: InputValidation;
  roomID!: InputValidation;

  constructor() {
    this.enabledButton = false;
    this.displayAlert = false;
    this.password = new InputValidation('', false, false);
    this.roomID = new InputValidation('', false, false);
  }

  checkLength() {
    return this.password?.value?.length > 2 && this.roomID?.value?.length === 18;
  }

  changeRoom(room: any) {
    this.roomID.value = room?.value?.trim();
    this.enabledButton = this.checkLength();
    if (this.roomID.value.length !== 18) {
      this.roomID.wrong = this.roomID.value?.length > 0 ? true : false;;
      this.roomID.valid = false;
    } else {
      this.roomID.valid = true;
      this.roomID.wrong = false;
    }
  }

  changePassword(password: any) {
    this.password.value = password?.value?.trim();
    this.enabledButton = this.checkLength();
    if (this.password.value.length <= 2 || this.password.value.length > 18) {
      this.password.wrong = this.password.value?.length > 0 ? true : false;;
      this.password.valid = false;
    } else {
      this.password.valid = true;
      this.password.wrong = false;
    }
  }

  submit() {
    if ( !this.checkLength() ) {
      this.displayAlert = true;
    } else this.displayAlert = false;
  }


}
