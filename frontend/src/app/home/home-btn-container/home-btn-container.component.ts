import { Component, OnInit } from '@angular/core';
import { HomeBtn } from '../models/home-btn.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home-btn-container',
  templateUrl: './home-btn-container.component.html',
  styleUrls: ['./home-btn-container.component.css']
})
export class HomeBtnContainerComponent implements OnInit {

  closeResult: string = '';
  createBtn!: HomeBtn;
  joinBtn!: HomeBtn;
  
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.createBtn = new HomeBtn(
      "Créer un salon",
      "primary",
      'flip-left',
      0
    );

    this.joinBtn = new HomeBtn(
      "Rejoindre un salon",
      "info",
      'flip-right',
      100
    );
  }

  
  open(content: any) {
    this.modalService.open(content).result.then((result) => {
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
