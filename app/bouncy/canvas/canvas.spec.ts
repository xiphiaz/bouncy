import {BouncyCanvasDirective} from "./canvas.directive";
import {ElementRef} from "angular2/core";

describe('Bouncy Ball Canvas directive', () => {

    let elementRefMock:ElementRef = {
        nativeElement: document.createElement('canvas'),
    },
    directiveController:BouncyCanvasDirective = new BouncyCanvasDirective(elementRefMock);

    describe('Initialization', () => {

        it('should be initialized with a canvas and context', () => {

            expect((<any>directiveController).canvas).not.toBe(undefined);
            expect((<any>directiveController).context).not.toBe(undefined);

        });

        it('should have an empty ball collection', () => {


            expect((<any>directiveController).ballCollection).toBeDefined();
        });

    });

});