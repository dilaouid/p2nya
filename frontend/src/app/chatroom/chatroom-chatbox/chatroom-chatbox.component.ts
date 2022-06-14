import { Component, OnInit, Input, ViewChild, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { updateProfilPictureLive } from 'src/app/utils/helpers';
import { environment } from 'src/environments/environment';

interface UserInformation {
  uuid: string;
  username: string;
};

interface MessageStack {
  date: string;
  content: string;
  picture: boolean;
};

interface MessagesHistory {
  author: UserInformation;
  stack: MessageStack[];
};

@Component({
  selector: 'app-chatroom-chatbox',
  templateUrl: './chatroom-chatbox.component.html',
  styleUrls: ['./chatroom-chatbox.component.css']
})
export class ChatroomChatboxComponent implements OnInit {

  stack: any[] = [];
  message: string = '';
  history: MessagesHistory[] = [];
  @Input() uuid!: string | null;
  @Input() users!: any;
  @ViewChild('input') inp!: ElementRef;
  @ViewChildren('profilPicture') profilPicture!: QueryList<ElementRef>;
  api: string = environment.api;

  constructor(private socket: Socket) { }

  ngOnInit(): void {
    this.socket.on('message-sent', (message: string, author: UserInformation, picture: boolean) => {
      if (!picture) picture = false;
      
      const length = this.history.length;

      // Formating date
      const d = new Date();
      const h = ('0'+d.getHours()  ).slice(-2);
      const min = ('0'+d.getMinutes()  ).slice(-2);

      const stackElement = {
        date: `${d.toLocaleDateString("fr", {year: "2-digit", month: 'numeric', day: "numeric"})} ${h}:${min}`,
        content: message,
        picture: picture
      };
      const authorElement = {
        uuid: author.uuid,
        username: author.username
      };

      // If the last author is this actual one, add to his stack the received message
      if (length > 0 && this.history[length - 1].author.uuid === author.uuid) {
        this.history[length - 1].stack.push(stackElement);
      } else {
        // Otherwise, push a new element to history
        this.history.push({
          author: authorElement,
          stack: [stackElement]
        });
      }
    });

    this.socket.on('picture-updated', (uuid: string) => {
      updateProfilPictureLive(uuid, this.profilPicture);
    });

  };

  writeMessage(event: any): void {
    this.message = event.target.innerText?.trim();
  };

  send() {
    this.message = this.message?.trim();
    if (this.message.length === 0) return;
    
    // Need to store emojis :-°
    this.socket.emit('message', this.uuid, this.message);
    this.inp.nativeElement.innerText = '';
    this.message = '';
  };

}
