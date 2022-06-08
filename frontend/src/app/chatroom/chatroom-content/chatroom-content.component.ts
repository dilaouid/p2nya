import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { IsInRoom } from 'src/app/API/Rooms';

@Component({
  selector: 'app-chatroom-content',
  templateUrl: './chatroom-content.component.html',
  styleUrls: ['./chatroom-content.component.css']
})
export class ChatroomContentComponent implements OnInit {

  uuid: string | null;

  constructor(private route: ActivatedRoute) {
    this.uuid = null;
    this.route.paramMap.subscribe( (params) => { this.uuid = params.get('id') });
  }

  ngOnInit(): void {
    console.log(this.uuid);
  }

}
