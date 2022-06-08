import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { GetRoomInfo } from 'src/app/API/Rooms';

@Component({
  selector: 'app-chatroom-content',
  templateUrl: './chatroom-content.component.html',
  styleUrls: ['./chatroom-content.component.css']
})
export class ChatroomContentComponent implements OnInit {

  uuid: string | null;
  room: any;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.uuid = '';
    this.route.paramMap.subscribe( (params) => { this.uuid = params.get('id') });
  };

  ngOnInit(): void {
    GetRoomInfo(this.uuid + '').then(d => {
      this.room = d.data;
      console.log(this.room);
    }).catch(e => {
      this.router.navigate(['/']);
    });
  };

}
