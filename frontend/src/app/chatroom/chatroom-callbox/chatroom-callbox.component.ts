import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chatroom-callbox',
  templateUrl: './chatroom-callbox.component.html',
  styleUrls: ['./chatroom-callbox.component.css']
})
export class ChatroomCallboxComponent implements OnInit {

  @Input() inCall: any[] | undefined;

  constructor() { }

  ngOnInit(): void {
    
  }

}
