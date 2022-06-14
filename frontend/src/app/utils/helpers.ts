import { ElementRef, QueryList } from "@angular/core";

export const updateProfilPictureLive = (uuid: any, list: QueryList<ElementRef>) => {
    let nd = new Date().getTime();
    var correctDOM: ElementRef<any> = list.filter( t => t.nativeElement.attributes.user.value === uuid)[0];
    correctDOM.nativeElement.src = correctDOM.nativeElement.src + '?t=' + nd;
};