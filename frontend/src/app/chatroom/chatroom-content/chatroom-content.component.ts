import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { GetRoomInfo } from 'src/app/API/Rooms';
import { GetMe } from 'src/app/API/Users';
import { Socket } from 'ngx-socket-io';

interface Me {
  id: number;
  uuid: string;
  username: string;
};

@Component({
  selector: 'app-chatroom-content',
  templateUrl: './chatroom-content.component.html',
  styleUrls: ['./chatroom-content.component.css']
})

export class ChatroomContentComponent implements OnInit {
  me: Me;
  username: string;
  uuid: string | null;
  users: string[];
  inCall: string[];
  userInCall: boolean;
  room: any;

  constructor(private route: ActivatedRoute, private router: Router, private socket: Socket) {
    this.uuid = '';
    this.users = [];
    this.userInCall = false;
    this.me = {id: 0, uuid: '', username: ''};
    this.inCall = [];
    this.username = '';
    this.route.paramMap.subscribe( (params) => { this.uuid = params.get('id') });
  };

  ngOnInit(): void {

    GetMe().then( (d) => {
      this.me = d.data;
      this.username = this.me.username;
    }).catch(e => {
      console.log(e);
      this.router.navigate(['/']);
    });

    GetRoomInfo(this.uuid + '').then(d => {
      this.room = d.data;
      this.users = this.room.users;
      this.inCall = this.room.usersInVocal
      this.userInCall = this.inCall.includes(this.users[0]);
      this.socket.emit('join', this.uuid);
    }).catch(e => {
      this.router.navigate(['/']);
    });

    this.socket.on('joined', (uuid: string) => {
      if (this.users.includes(uuid) === false)
        this.users.push(uuid);
    });

    this.socket.on('leave', (uuid: string) => {
      const i = this.users.indexOf(uuid);
      this.users.splice(i, 1);
    });

  };

}
