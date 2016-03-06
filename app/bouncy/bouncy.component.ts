import {Component, ElementRef} from 'angular2/core';
import {BouncyCanvasDirective} from "./canvas/canvas.directive";
@Component({
    selector: 'bouncy',
    templateUrl: `/app/bouncy/bouncy.tpl.html`,
    directives: [BouncyCanvasDirective]
})
export class BouncyComponent {

    constructor(element:ElementRef) {

        console.log(element.nativeElement);
    }

}