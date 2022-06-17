import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-chatroom-modal-emojis',
  templateUrl: './chatroom-modal-emojis.component.html',
  styleUrls: ['./chatroom-modal-emojis.component.css']
})
export class ChatroomModalEmojisComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  

}
