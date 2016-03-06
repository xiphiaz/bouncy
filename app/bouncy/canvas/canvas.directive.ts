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

        //register the canvas bindings
        this.canvas = el.nativeElement;
        this.canvas.style.backgroundColor = '#4c4c4c';
        this.context = this.canvas.getContext("2d");

        //create a new collection for the clicked balls
        this.ballCollection = new BallCollection();

        //add a click listener to the canvas element.
        //On click create a new ball at the click position and push it into the collection
        this.canvas.addEventListener('click', (evt:MouseEvent)  => {
            let mousePosition = this.getMousePosition(evt);

            let ball = new Ball(mousePosition);
            this.ballCollection.push(ball);

        }, false);

        //kick off the render loop
        this.render();

    }

    /**
     * Given a mouse event, calculate the mouse position based on the boundaries of the canvas element
     * @param evt
     * @returns {{x: number, y: number}}
     */
    private getMousePosition(evt:MouseEvent):ICoordinates {
        var rect = this.canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    /**
     * Render loop, uses requestAnimationFrame to maximise the performance
     * @param timestamp
     */
    private render(timestamp?:number):void {

        //clear the screen
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        //redraw the whole collection of balls
        this.ballCollection.redraw(this.context, timestamp);

        //bind this method to requestAnimationFrame to await next available animation loop
        window.requestAnimationFrame(this.render.bind(this));
    }

}