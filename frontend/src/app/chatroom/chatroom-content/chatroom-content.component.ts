import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { GetRoomInfo, JoinRoom } from 'src/app/API/Rooms';
import { GetMe } from 'src/app/API/Users';
import { Socket } from 'ngx-socket-io';
import { UserInformation } from 'src/app/Interfaces/User';
import { Me } from 'src/app/Interfaces/User';


@Component({
  selector: 'app-chatroom-content',
  templateUrl: './chatroom-content.component.html',
  styleUrls: ['./chatroom-content.component.css']
})

export class ChatroomContentComponent implements OnInit {
  me: Me;
  username: string;
  uuid: string;
  users: UserInformation[];
  inCall: string[];
  userInCall: boolean;
  room: any;
  accessToken!: string;
  passwordRequired: boolean|null = null;

  constructor(private route: ActivatedRoute, private router: Router, private socket: Socket) {
    this.uuid = '';
    this.users = [];
    this.userInCall = false;
    this.me = {id: 0, uuid: '', username: ''};
    this.inCall = [];
    this.username = '';
    this.route.paramMap.subscribe( (params) => { this.uuid = params.get('id') || '' });
    Notification.requestPermission();
  };

  FillDataRoom(d: any) {
    this.passwordRequired = false;
    this.room = d.data;
    this.users = this.room.users;
    this.inCall = this.room.usersInVocal
    this.accessToken = this.room.accessToken;
    this.userInCall = this.inCall.includes(this.users[0].uuid);
    this.socket.emit('join', this.uuid);
  };

  askPassword(): void {

  }

  ngOnInit(): void {

    GetMe().then( (d) => {
      this.me = d.data;
      this.username = this.me.username;
    }).catch(e => {
      console.log(e);
      this.router.navigate(['/']);
    });

    GetRoomInfo(this.uuid + '').then(d => {
      if (d.message === 'NOTIN') {
        this.askPassword();
      } else if (d.data?.length > 0) {
        this.FillDataRoom(d);
      }
    }).catch(e => {
      this.router.navigate(['/']);
    });

    this.socket.on('joined', (uuid: string, username: string) => {
      const i = this.users.findIndex(o => {
        return o.uuid === uuid;
      });
      if (i < 0)
        this.users.push({uuid: uuid, username: username});
    });

    this.socket.on('notification', (type: string) => {
      this.playAudio('notification_' + type);
    });

    this.socket.on('leave', (uuid: string) => {
      const i = this.users.findIndex(o => {
        return o.uuid === uuid;
      });
      this.users.splice(i, 1);
    });

  };

  playAudio(name: string): void {
    const audio = new Audio();
    audio.src = './assets/sounds/' + name + '.mp3';
    audio.load();
    audio.play();
  };

}
