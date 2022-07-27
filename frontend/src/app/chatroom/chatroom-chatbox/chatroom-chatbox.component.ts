import { Component, OnInit, Input, ViewChild, ViewChildren, ElementRef, QueryList, AfterViewChecked } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { updateProfilPictureLive } from 'src/app/utils/helpers';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { convertAliasToEmojis, convertLocalEmojis } from 'src/app/utils/emojis';
import { UserInformation } from 'src/app/Interfaces/User';
import { MessagesHistory } from 'src/app/Interfaces/Message';

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
  load: boolean = false;
  writing: boolean = false;
  @Input() uuid!: string | null;
  @Input() users!: any;
  @Input() me!: any;
  @ViewChild('input') inp!: ElementRef;
  @ViewChildren('profilPicture') profilPicture!: QueryList<ElementRef>;
  @ViewChild('msgBox') private msgBox!: ElementRef;
  api: string = environment.api;

  constructor(private socket: Socket, private route: Router) { }

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

    /* When the room is destroyed after 30mn, redirect all the users in the homepage */
    this.socket.on('destroyed-room', () => {
      this.route.navigateByUrl(`/`);
    });

    /* Receive a message */
    this.socket.on('message-sent', (message: string, author: UserInformation, picture: boolean) => {
      if (!picture) picture = false;
      if (picture && author.uuid === this.me.uuid) this.load = false;
      
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

    /* Clear all your chat history (only to the one who've asked for it) */
    this.socket.on('clear', () => {
      this.history = [];
    })

    /* Update the profile picture to all the connected users */
    this.socket.on('picture-updated', (uuid: string) => {
      updateProfilPictureLive(uuid, this.profilPicture);
    });

    /* Update the username to all the connected users */
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
    this.load = true;
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      const b64 = reader.result?.toString()?.trim();
      this.socket.emit('message', this.uuid, b64, true);
    }
  }

  writeMessage(event: any): void {
    if (event.which === 13) {
      event.preventDefault();
      this.send();
    } else {
      this.message = event.target.innerHTML?.trim();
      if (!this.writing && this.message.length > 0) {
        this.writing = true;
        this.socket.emit('user-writing', this.me.uuid);
      } else if (this.writing && this.message.length === 0) {
        this.writing = false;
        this.socket.emit('user-stop-writing', this.me.uuid);
      }
    }
  };

  scrollToBottom(): void {
    try {
        this.msgBox.nativeElement.scrollTop = this.msgBox.nativeElement.scrollHeight + 400000;
    } catch(e) {
      console.log(e);
    }                 
  };

  send() {
    if (this.load) return;
    const localEmojis = localStorage.getItem('emoji');
    this.message = this.message?.trim();
    this.message = this.message.replace('&nbsp;', '');
    if (this.message.substring(0, 6) === '/clear') {
      this.history = [];
      this.inp.nativeElement.innerText = '';
      this.message = '';
      return;
    }
    if (localEmojis) this.message = convertLocalEmojis(this.message, JSON.parse(localEmojis));
    this.message = convertAliasToEmojis(this.message);
    if (this.message.length === 0) return;
    
    this.socket.emit('user-stop-writing', this.me.uuid);
    this.socket.emit('message', this.message.replace('&nbsp;', ' '), false);
    this.inp.nativeElement.innerText = '';
    this.message = '';
    this.writing = false;
  };

}
