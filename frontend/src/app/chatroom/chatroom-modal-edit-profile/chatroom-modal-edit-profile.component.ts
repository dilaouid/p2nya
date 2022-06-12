import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { EditUser, GetMe } from '../../API/Users';

interface AlertModal {
  display: boolean;
  message: string;
  success: boolean;
}

@Component({
  selector: 'app-chatroom-modal-edit-profile',
  templateUrl: './chatroom-modal-edit-profile.component.html',
  styleUrls: ['./chatroom-modal-edit-profile.component.css']
})
export class ChatroomModalEditProfileComponent implements OnInit, AfterViewInit {

  @Input() me: any | undefined;
  @Input() username!: string;
  @ViewChild('usernameEdit') p!: ElementRef;
  profilePicture!: string;

  api: string;
  alert: AlertModal;

  constructor(private modalService: NgbModal) {
    this.api = environment.api;
    this.alert = { display: false, message: '', success: false };
  }

  changeUsername(username: any) {
    if (username.innerText.length < 18) this.username = username.innerText?.trim();
  };

  async submit() {
    await EditUser({username: this.username, picture: ''}).then( async d => {
      this.alert.success = true;
      this.alert.display = true;
      this.alert.message = d.message;
      this.me.username = this.username;
    }).catch(e => {
      this.alert.success = false;
      this.alert.display = true;
      this.alert.message = e.response.data.message;
    });
  };

  ngAfterViewInit(){
    this.p.nativeElement.innerText = this.me.username;
  } 

  closeModal() {
    this.modalService.dismissAll();
  }

  ngOnInit(): void {
    
  }

}
