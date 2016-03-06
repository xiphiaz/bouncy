import {Ball} from "./ball";
import * as _ from 'lodash';



export class BallCollection extends Array {

    private lastTimestamp:number = 0;

    constructor(arrayLength?: number){
        super(arrayLength);
    }

    redraw(context:CanvasRenderingContext2D, timestamp:number):void {

        let timestampDelta = timestamp - this.lastTimestamp;
        this.lastTimestamp = timestamp;

        _.each(this, (ball:Ball) => {

            ball.checkCollisions(context.canvas.width, context.canvas.height);
            ball.render(context, timestampDelta);

        });
    }
}