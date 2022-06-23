import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManageEmojis } from 'src/app/API/Users';

interface Emoji {
  alias: string;
  base64: string;
}

interface Alert {
  display: boolean;
  message: string;
  type: string;
}

@Component({
  selector: 'app-chatroom-modal-emojis',
  templateUrl: './chatroom-modal-emojis.component.html',
  styleUrls: ['./chatroom-modal-emojis.component.css']
})
export class ChatroomModalEmojisComponent implements OnInit {

  emojis!: Emoji[];
  lastEmojiElement: number = 0;
  alert: Alert = {display: false, message: '', type:'danger'};
  @ViewChildren('emojiPreview') emojiPreview!: QueryList<ElementRef>;
  @ViewChild('uploadEmoji') uploadEmoji!: ElementRef;
  load: boolean = false;
  editEmojiPictureIndex: number = 0;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    const lSEmojis = localStorage.getItem('emoji');
    if (lSEmojis) this.emojis = JSON.parse(lSEmojis);
    else this.emojis = [{alias: '', base64: './assets/img/emojis/template.webp'}];
    this.lastEmojiElement = lSEmojis?.length || 0;
  };

  closeModal() {
    this.modalService.dismissAll();
  };

  removeEmoji(index: number) {
     this.emojis.splice(index, 1);
     this.lastEmojiElement--;
  };

  addEmoji() {
    this.emojis.push({alias: '', base64: './assets/img/emojis/template.webp'});
    this.lastEmojiElement++;
  };

  updateEmojiPicture(index: number) {
    this.editEmojiPictureIndex = index >= 0 ? index : this.lastEmojiElement;
    this.uploadEmoji.nativeElement.click();
  }

  updatePreviewEmojiPicture(files: any) {
    if (files.length === 0)
      return;
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.emojis[this.editEmojiPictureIndex].base64 = reader.result?.toString() || '';
    }
  };

  updateAlias(index: number, e: any) {
    this.emojis[index].alias = e.target.value;
  };

  submit() {
    this.alert.display = false;
    this.load = true;
    ManageEmojis(this.emojis).then(d => {
      this.alert = {display: true, message: 'Les emojis ont bien été mis à jour !', type: 'success'}
      localStorage.removeItem('emoji');
      localStorage.setItem('emoji', JSON.stringify(d.data));
    }).catch(e => {
      this.alert = {display: true, message: 'Une erreur est survenue', type: 'danger'}
      console.log(e);
    });
    this.load = false;
  };

}
