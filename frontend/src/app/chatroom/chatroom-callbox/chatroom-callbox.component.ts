import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { loadExternalScript } from 'src/app/Services/load';

@Component({
  selector: 'app-chatroom-callbox',
  templateUrl: './chatroom-callbox.component.html',
  styleUrls: ['./chatroom-callbox.component.css']
})
export class ChatroomCallboxComponent implements OnInit {

  @Input() inCall: any[] | undefined;
  @Input() userInCall: boolean | undefined;
  closeResult!: string;
  api: string;

  constructor(private modalService: NgbModal) {
    this.api = environment.api;
    loadExternalScript("https://cdn.metered.ca/sdk/video/1.4.3/sdk.min.js");
  }

  ngOnInit(): void { }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {
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
