import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

interface AlertModal {
  display: boolean;
  message: string;
}

@Component({
  selector: 'app-chatroom-modal-edit-profile',
  templateUrl: './chatroom-modal-edit-profile.component.html',
  styleUrls: ['./chatroom-modal-edit-profile.component.css']
})
export class ChatroomModalEditProfileComponent implements OnInit {

  @Input() me: any | undefined;
  api: string;
  alert: AlertModal;

  constructor() {
    this.api = environment.api;
    this.alert = { display: false, message: '' };
  }

  ngOnInit(): void {

  }

}
