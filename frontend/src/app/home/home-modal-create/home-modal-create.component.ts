import { Component } from '@angular/core';
import { InputValidation } from '../models/home-modal-validation';
import * as APIRoom from '../../API/Rooms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-modal-create',
  templateUrl: './home-modal-create.component.html',
  styleUrls: ['./home-modal-create.component.css']
})
export class HomeModalCreateComponent {

  enabledButton: boolean;
  displayAlert: boolean;
  
  password!: InputValidation;


  constructor(private modalService: NgbModal) {
    this.enabledButton = false;
    this.displayAlert = false;
    this.password = new InputValidation('', false, false);
  }

  checkLength() {
    return this.password?.value?.length > 2;
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

  close() {
    this.modalService.dismissAll();
  }
  
  createRoom() {
    APIRoom.CreateRoom(this.password.value).then(d => {
      console.log(d);
      this.close();
    }).catch(e => {
      console.log(e);
    })
  };

}
