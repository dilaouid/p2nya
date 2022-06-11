import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EditUser, GetMe } from '../../API/Users';

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
  @Input() username!: string;

  api: string;
  alert: AlertModal;

  constructor() {
    this.api = environment.api;
    this.alert = { display: false, message: '' };
  }

  changeUsername(username: any) {
    if (username.innerText.length < 18) this.username = username.innerText?.trim();
  }

  submit() {
    EditUser({username: this.username, picture: ''}).then( async d => {
      this.me = await GetMe().then(l => { return l.data });
      this.username = this.me.username;
    }).catch(e => {
      console.log(e);
    });
  }

  ngOnInit(): void {

  }

}
