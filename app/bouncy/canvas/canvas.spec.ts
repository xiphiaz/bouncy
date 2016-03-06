import {BouncyCanvasDirective} from "./canvas.directive";
import {ElementRef} from "angular2/core";

describe('Canvas directive', () => {

    let elementRefMock:ElementRef = {
        nativeElement: document.createElement('canvas'),
    };

    describe('Initialization', () => {

        it('should be initialized with a canvas and context', () => {

            let directiveController:BouncyCanvasDirective = new BouncyCanvasDirective(elementRefMock);

            expect((<any>directiveController).canvas).not.toBe(undefined);
            expect((<any>directiveController).context).not.toBe(undefined);

        });

    });

});