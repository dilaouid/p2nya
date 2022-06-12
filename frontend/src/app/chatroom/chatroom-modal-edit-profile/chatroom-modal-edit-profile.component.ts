import { Component, OnInit, Input } from '@angular/core';
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
export class ChatroomModalEditProfileComponent implements OnInit {

  @Input() me: any | undefined;
  @Input() username!: string;
  profilePicture!: string;

  api: string;
  alert: AlertModal;

  constructor(private modalService: NgbModal) {
    this.api = environment.api;
    this.alert = { display: false, message: '', success: false };
  }

  changeUsername(username: any) {
    if (username.innerText.length < 18) this.username = username.innerText?.trim();
  }

  submit() {
    EditUser({username: this.username, picture: ''}).then( async d => {
      this.alert.success = true;
      this.alert.display = true;
      this.alert.message = d.message;
      this.me = await GetMe().then(l => { return l.data });
      this.username = this.me.username;
    }).catch(e => {
      this.alert.success = false;
      this.alert.display = true;
      this.alert.message = e.response.data.message;
    });
  }

  ngOnInit(): void {

  }

}
