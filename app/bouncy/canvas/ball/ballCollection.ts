import {Ball} from "./ball";
import * as _ from 'lodash';

export class BallCollection extends Array {

    private lastTimestamp:number = 0;

    constructor(arrayLength?: number){
        super(arrayLength);
    }

    /**
     * Redraw the set of balls that have been created
     * @param context
     * @param timestamp
     */
    redraw(context:CanvasRenderingContext2D, timestamp:number):void {

        //calculate the time diff & track the timestamp for next loop
        let timestampDelta = timestamp - this.lastTimestamp;
        this.lastTimestamp = timestamp;

        _.each(this, (ball:Ball) => { //iterate through each ball, checking for collisions then rendering location
            ball.checkCollisions(context.canvas.width, context.canvas.height);
            ball.render(context, timestampDelta);
        });
    }
}