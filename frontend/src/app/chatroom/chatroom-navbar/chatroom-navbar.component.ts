import { Component, OnInit, Input, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Socket } from 'ngx-socket-io';
import { updateProfilPictureLive } from '../../utils/helpers'

interface Me {
  id: number;
  uuid: string;
  username: string;
};

@Component({
  selector: 'app-chatroom-navbar',
  templateUrl: './chatroom-navbar.component.html',
  styleUrls: ['./chatroom-navbar.component.css']
})
export class ChatroomNavbarComponent implements OnInit {

  closeResult = '';
  api: string;
  isWriting: string[] = [];

  @Input() users: any[] | undefined;
  @Input() username!: string;
  @ViewChildren('userlist') userlist!: QueryList<ElementRef>;
  @Input() me: Me | undefined;

  constructor(private modalService: NgbModal, private socket: Socket) {
    this.api = environment.api;
  }

  ngOnInit(): void {
    this.socket.on('picture-updated', (uuid: string) => {
      updateProfilPictureLive(uuid, this.userlist);
    });
    this.socket.on('username-updated', (uuid: string, username: string) => {
      this.users?.map( (el, i: number) => {
        if (el.uuid === uuid) el.username = username;
      });
    });
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  };

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  };

  public updateProfilPicture(uuid: any) {
    updateProfilPictureLive(uuid, this.userlist);
  }

}
