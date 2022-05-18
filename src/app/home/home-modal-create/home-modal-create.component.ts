import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-home-modal-create',
  templateUrl: './home-modal-create.component.html',
  styleUrls: ['./home-modal-create.component.css']
})
export class HomeModalCreateComponent implements OnInit {

  disabledButton: boolean;
  displayAlert: boolean;
  
  username!: string;
  password!: string;

  constructor() {
    this.disabledButton = true;
    this.displayAlert = false;
  }

  ngOnInit(): void {
    
  }

}
