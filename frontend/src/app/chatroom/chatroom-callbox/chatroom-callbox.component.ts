import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Me } from 'src/app/Interfaces/User';
declare const Metered:any;


@Component({
  selector: 'app-chatroom-callbox',
  templateUrl: './chatroom-callbox.component.html',
  styleUrls: ['./chatroom-callbox.component.css']
})
export class ChatroomCallboxComponent implements OnInit {
  

  @Input() inCall: any[] | undefined;
  @Input() userInCall: boolean | undefined;
  @Input() me!: Me;
  @Input() uuid!: string | null;
  @Input() accessToken!: string | null;
  @ViewChild('audio') audio!: ElementRef;
  
  closeResult!: string;
  api: string;

  constructor(private modalService: NgbModal) {
    this.api = environment.api;
    
  }

  async join(): Promise<void> {
    const meeting = new Metered.Meeting();
    const info = await meeting.join({
      roomURL: environment.metered + this.uuid,
      accessToken: this.accessToken,
      name: this.me.username
    }).catch( (e:any) => {
      console.log(e);
    });
    console.log("Meeting joined", info);
    try {
      meeting.startAudio();
    } catch(exception) {
      console.log("Error occured", exception);
      alert("Vous ne pouvez pas rejoindre ce salon vocal");
    }
    meeting.on("participantJoined", (participant: any) => {
      console.log("Participant joined the room", participant);
    });
    meeting.on("remoteTrackStarted", (remote: any) => {
      console.log("track item", remote);
      var remoteTrack = remote.track;
      var remoteStream = new MediaStream([remoteTrack]);
      this.audio.nativeElement.src = remoteStream;
      this.audio.nativeElement.play();
    });
  }

  ngOnInit(): void {
  }

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
