import {Directive, ElementRef} from 'angular2/core';

export interface ICoordinate {
    x: number;
    y: number;
}

@Directive({
    selector: '[bouncyCanvas]'
})
export class BouncyCanvasDirective {

    private canvas:HTMLCanvasElement;
    private context:CanvasRenderingContext2D;

    constructor(el: ElementRef) {

        this.canvas = el.nativeElement;
        this.canvas.style.backgroundColor = 'red';

        this.canvas.addEventListener('click', (evt:MouseEvent)  => {
            let mousePosition = this.getMousePosition(evt);
            var message = 'Mouse position: ' + mousePosition.x + ',' + mousePosition.y;
            console.log(message);
        }, false);

        this.context = this.canvas.getContext("2d");

        var centerX = this.canvas.width / 2;
        var centerY = this.canvas.height / 2;
        var radius = 70;

        this.context.beginPath();
        this.context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        this.context.fillStyle = 'green';
        this.context.fill();
        this.context.lineWidth = 5;
        this.context.strokeStyle = '#003300';
        this.context.stroke();

    }

    private getMousePosition(evt:MouseEvent):ICoordinate {
        var rect = this.canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }



}