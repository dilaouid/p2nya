import { Component, OnInit } from '@angular/core';
import { HomeBtn } from '../models/home-btn.model';

@Component({
  selector: 'app-home-btn-container',
  templateUrl: './home-btn-container.component.html',
  styleUrls: ['./home-btn-container.component.css']
})
export class HomeBtnContainerComponent implements OnInit {

  createBtn!: HomeBtn;
  joinBtn!: HomeBtn;
  
  constructor() { }

  ngOnInit(): void {
    this.createBtn = new HomeBtn(
      "Créer un salon",
      "primary",
      "#create",
      'flip-left',
      0
    );

    this.joinBtn = new HomeBtn(
      "Rejoindre un salon",
      "info",
      "#join",
      'flip-right',
      100
    );
  }

}
