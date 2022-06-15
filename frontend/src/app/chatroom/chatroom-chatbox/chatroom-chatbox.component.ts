import { Component, OnInit, Input, ViewChild, ViewChildren, ElementRef, QueryList, AfterViewChecked } from '@angular/core';
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
export class ChatroomChatboxComponent implements OnInit, AfterViewChecked {

  stack: any[] = [];
  message: string = '';
  history: MessagesHistory[] = [];
  timestamp: number = new Date().getTime();
  @Input() uuid!: string | null;
  @Input() users!: any;
  @Input() me!: any;
  @ViewChild('input') inp!: ElementRef;
  @ViewChildren('profilPicture') profilPicture!: QueryList<ElementRef>;
  @ViewChild('msgBox') private msgBox!: ElementRef;
  api: string = environment.api;

  constructor(private socket: Socket) { }

  ngOnInit(): void {

    var ce = document.querySelector('[contenteditable]');
    ce?.addEventListener('paste', function (e:any) {
      e.preventDefault();
      var text = e.clipboardData.getData('text/plain');
      document.execCommand('insertText', false, text);
    });

    this.socket.on('message-sent', (message: string, author: UserInformation, picture: boolean) => {
      if (!picture) picture = false;
      
      const length = this.history.length;

      // Formating date
      const d = new Date();
      const h = ('0'+d.getHours()  ).slice(-2);
      const min = ('0'+d.getMinutes()  ).slice(-2);
      this.timestamp = new Date().getTime();

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
      this.scrollToBottom();
    });

    this.socket.on('picture-updated', (uuid: string) => {
      updateProfilPictureLive(uuid, this.profilPicture);
    });

    this.socket.on('username-updated', (uuid: string, username: string) => {
      if (this.me.uuid === uuid) this.me.username = username;
      this.history.map( (el, i: number) => {
        if (el.author.uuid === uuid) el.author.username = username;
      });
    });

  };

  writeMessage(event: any): void {
    this.message = event.target.innerText?.trim();
  };

  
  ngAfterViewChecked() {        
    this.scrollToBottom();        
  } ;

  scrollToBottom(): void {
    try {
        this.msgBox.nativeElement.scrollTop = this.msgBox.nativeElement.scrollHeight + 400000;
    } catch(e) {
      console.log(e);
    }                 
  }

  send() {
    this.message = this.message?.trim();
    if (this.message.length === 0) return;
    
    // Need to store emojis :-°
    this.socket.emit('message', this.uuid, this.message);
    this.inp.nativeElement.innerText = '';
    this.message = '';
  };

}
