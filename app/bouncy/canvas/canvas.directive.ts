import {Directive, ElementRef} from 'angular2/core';
import * as _ from 'lodash';
import {Ball, ICoordinates} from "./ball/ball";
import {BallCollection} from "./ball/ballCollection";

@Directive({
    selector: '[bouncyCanvas]'
})

export class BouncyCanvasDirective {

    private canvas:HTMLCanvasElement;
    private context:CanvasRenderingContext2D;

    private ballCollection:BallCollection;

    constructor(el: ElementRef) {

        this.canvas = el.nativeElement;
        this.canvas.style.backgroundColor = 'red';

        this.ballCollection = new BallCollection();

        this.canvas.addEventListener('click', (evt:MouseEvent)  => {
            let mousePosition = this.getMousePosition(evt);

            let ball = new Ball(mousePosition);
            this.ballCollection.push(ball);

        }, false);

        this.context = this.canvas.getContext("2d");

        this.render();

    }

    private getMousePosition(evt:MouseEvent):ICoordinates {
        var rect = this.canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    private render(timestamp?:number):void {

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ballCollection.redraw(this.context, timestamp);

        window.requestAnimationFrame(this.render.bind(this));
    }

}