import { Component, OnInit, Input  } from '@angular/core';
import { environment } from 'src/environments/environment';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

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

  @Input() users: any[] | undefined;
  @Input() username!: string;
  @Input() me: Me | undefined;

  constructor(private modalService: NgbModal) {
    this.api = environment.api;
  }

  ngOnInit(): void { }

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

}
