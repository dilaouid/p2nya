import { Component } from '@angular/core';

@Component({
  selector: 'app-home-modal-create',
  templateUrl: './home-modal-create.component.html',
  styleUrls: ['./home-modal-create.component.css']
})
export class HomeModalCreateComponent {

  enabledButton: boolean;
  displayAlert: boolean;
  
  username!: string;
  password!: string;


  constructor() {
    this.enabledButton = false;
    this.displayAlert = false;
  }

  checkLength() {
    return this.username?.length > 2 && this.password?.length > 2;
  }

  changeUsername(username: any) {
    this.username = username?.value?.trim();
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
