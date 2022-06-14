import { Component, OnInit, Input, Output, AfterViewInit, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { EditUser } from '../../API/Users';
import { ChatroomNavbarComponent } from '../chatroom-navbar/chatroom-navbar.component';
import { Socket } from 'ngx-socket-io';

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

  @ViewChild(ChatroomNavbarComponent, { static: false }) child!: ChatroomNavbarComponent;

  @Input() me: any | undefined;
  @Input() username!: string;
  @Input() navbar!: any;
  @Output() updateProfilPicture = new EventEmitter<any>();

  @ViewChild('usernameEdit') p!: ElementRef;
  @ViewChild('avatar') img!: ElementRef;
  profilePicture!: string | undefined | null;

  api: string;
  alert: AlertModal;
  timestamp!: number;

  constructor(private modalService: NgbModal, private socket: Socket) {
    this.api = environment.api;
    this.timestamp = new Date().getTime();
    this.alert = { display: false, message: '', success: false };
  }

  changeUsername(event: any) {
    let input = event.target.value;
    this.username = input?.trim();
  };

  async submit() {
    if (!this.username && !this.profilePicture) return;
    await EditUser({username: this.username, picture: this.profilePicture}).then( async d => {
      this.alert.success = true;
      this.alert.display = true;
      this.alert.message = d.message;
      this.me.username = this.username;
      this.updateProfilPicture.emit(this.me.uuid);
      this.img.nativeElement.src = environment.api + '/api/users/picture/' + this.me.uuid + '?t=' + new Date().getTime();
      this.username = '';
      this.socket.emit('update-picture', this.me.uuid);
      this.profilePicture = '';
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
    this.updateProfilPicture.emit(this.me.uuid);
    this.modalService.dismissAll();
  }

  updateAvatarPreview(files: any) {
    if (files.length === 0)
      return;
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.profilePicture = reader.result?.toString();
      this.img.nativeElement.src = reader.result; 
    }
  }

  ngOnInit(): void { }

}
