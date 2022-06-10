import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { GetRoomInfo } from 'src/app/API/Rooms';
import { GetMe } from 'src/app/API/Users';

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
  uuid: string | null;
  users: string[];
  inCall: string[];
  userInCall: boolean;
  room: any;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.uuid = '';
    this.users = [];
    this.userInCall = false;
    this.me = {id: 0, uuid: '', username: ''};
    this.inCall = [];
    this.route.paramMap.subscribe( (params) => { this.uuid = params.get('id') });
  };

  ngOnInit(): void {

    GetMe().then( (d) => {
      this.me = d.data;
    }).catch(e => {
      console.log(e);
    });

    GetRoomInfo(this.uuid + '').then(d => {
      this.room = d.data;
      this.users = this.room.users;
      this.inCall = this.room.usersInVocal
      this.userInCall = this.inCall.includes(this.users[0]);
      console.log(this.room);
    }).catch(e => {
      this.router.navigate(['/']);
    });
  };

}
