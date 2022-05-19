import { Component } from '@angular/core';
import { InputValidation } from '../models/home-modal-validation';

@Component({
  selector: 'app-home-modal-create',
  templateUrl: './home-modal-create.component.html',
  styleUrls: ['./home-modal-create.component.css']
})
export class HomeModalCreateComponent {

  enabledButton: boolean;
  displayAlert: boolean;
  
  username!: InputValidation;
  password!: InputValidation;


  constructor() {
    this.enabledButton = false;
    this.displayAlert = false;
    this.username = new InputValidation('', false, false);
    this.password = new InputValidation('', false, false);
  }

  checkLength() {
    return this.username?.value?.length > 2 && this.password?.value?.length > 2;
  }

  changeUsername(username: any) {
    this.username.value = username?.value?.trim();
    if (this.username.value.length <= 2 || this.username.value.length > 18) {
      this.username.wrong = this.username.value?.length > 0 ? true : false;
      this.username.valid = false;
    } else {
      this.username.valid = true;
      this.username.wrong = false;
    }
    this.enabledButton = this.checkLength();
  }

  changePassword(password: any) {
    this.password.value = password?.value?.trim();
    if (this.password.value.length <= 2 || this.password.value.length > 18) {
      this.password.wrong = this.password.value?.length > 0 ? true : false;;
      this.password.valid = false;
    } else {
      this.password.valid = true;
      this.password.wrong = false;
    }
    this.enabledButton = this.checkLength();
  }

  submit() {
    if ( !this.checkLength() ) {
      this.displayAlert = true;
    } else this.displayAlert = false;
  }

}
