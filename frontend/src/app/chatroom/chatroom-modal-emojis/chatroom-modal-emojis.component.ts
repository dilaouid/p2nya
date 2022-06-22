import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface Emoji {
  alias: string;
  base64: string;
}

@Component({
  selector: 'app-chatroom-modal-emojis',
  templateUrl: './chatroom-modal-emojis.component.html',
  styleUrls: ['./chatroom-modal-emojis.component.css']
})
export class ChatroomModalEmojisComponent implements OnInit {

  emojis!: Emoji[];
  displayAlert: boolean = false;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    const lSEmojis = localStorage.getItem('emoji');
    if (lSEmojis) this.emojis = JSON.parse(lSEmojis);
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  removeEmoji(index: number) {
     this.emojis.splice(index, 1);
  }

  addEmoji() {
    this.emojis.push({alias: '', base64: './assets/img/emojis/template.webp'});
  }

  

}
