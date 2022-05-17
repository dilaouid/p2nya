import { Component, OnInit, Input } from '@angular/core';
import { HomeBtn } from '../models/home-btn.model';

@Component({
  selector: 'app-home-btn',
  templateUrl: './home-btn.component.html',
  styleUrls: ['./home-btn.component.css']
})
export class HomeBtnComponent implements OnInit {
  @Input() homeBtn!: HomeBtn;

  constructor() { }

  ngOnInit(): void {
  }

}
