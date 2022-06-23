import { Component, OnInit, Input, ViewChild, ViewChildren, ElementRef, QueryList, AfterViewChecked } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { updateProfilPictureLive } from 'src/app/utils/helpers';
import { environment } from 'src/environments/environment';
import { convertAliasToEmojis, convertLocalEmojis } from 'src/app/utils/emojis';

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

  ngAfterViewChecked() {        
    this.scrollToBottom();        
  };

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
      if (Notification.permission !== 'denied' && author.uuid !== this.me.uuid && document.visibilityState !== 'visible') {
        const favicon: any = document.querySelector('#favicon');
        favicon.href = './assets/img/favicon_notif.ico';
        const n = new Notification('Nouveau message de ' + author.username, { body: picture ? "A envoyé une image" : message, icon: environment.api + '/users/picture/' + author.uuid, silent: true });
        document.addEventListener('visibilitychange', function() {
          if (document.visibilityState === 'visible') {
            favicon.href = 'favicon.ico';
            n.close();
          }
        });
      }

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

    this.socket.on('clear', () => {
      this.history = [];
    })

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

  sendThumb(files: any) {
    if (files.length === 0)
      return;
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      alert('Votre fichier doit être une image');
      return;
    }
    else if (files[0].size / 1000000 > 5) {
      alert('Le fichier doit faire au maximum 5 MB');
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      const b64 = reader.result?.toString()?.trim();
      console.log(b64);
      
      this.socket.emit('message', this.uuid, b64, true);
    }
  }

  writeMessage(event: any): void {
    this.message = event.target.innerHTML?.trim();
  };

  scrollToBottom(): void {
    try {
        this.msgBox.nativeElement.scrollTop = this.msgBox.nativeElement.scrollHeight + 400000;
    } catch(e) {
      console.log(e);
    }                 
  };

  send() {
    const localEmojis = localStorage.getItem('emoji');
    this.message = this.message?.trim();
    this.message = this.message.replace('&nbsp;', '');
    if (this.message === '/clear') {
      this.history = [];
      return;
    }
    if (localEmojis) this.message = convertLocalEmojis(this.message, JSON.parse(localEmojis));
    this.message = convertAliasToEmojis(this.message);
    if (this.message.length === 0) return;
    
    // Need to store emojis :-°
    this.socket.emit('message', this.uuid, this.message.replace('&nbsp;', ' '), false);
    this.inp.nativeElement.innerText = '';
    this.message = '';
  };

}
