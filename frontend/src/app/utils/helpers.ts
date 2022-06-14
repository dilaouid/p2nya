import { ElementRef, QueryList } from "@angular/core";

export const updateProfilPictureLive = (uuid: any, list: QueryList<ElementRef>) => {
    let nd = new Date().getTime();
    var correctDOM: ElementRef[] = list.filter( t => t.nativeElement.attributes.user.value === uuid);
    for (let o = 0; o < correctDOM.length; o++) {
        correctDOM[o].nativeElement.src = correctDOM[o].nativeElement.src + '?t=' + nd;
    }
};