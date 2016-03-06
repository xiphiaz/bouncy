export interface ICoordinates {
    x: number;
    y: number;
}

export class Vector {

    constructor(public coordinates:ICoordinates, //pixels
                public speed:number, //pixels/second
                public direction:number //radians
    ) {}

    /**
     * Find the next expected position (used to caculate the acceleration vector)
     * @param timestampDelta
     * @returns {{x: number, y: number}}
     */
    public nextPosition(timestampDelta:number):ICoordinates {
        let distance = timestampDelta / 1000 * this.speed;

        return {
            x: this.coordinates.x + Math.cos(this.direction) * distance,
            y: this.coordinates.y + Math.sin(this.direction) * distance,
        };
    }

    /**
     * Update the coordinates with the change in time
     * @param timestampDelta
     * @returns {Vector}
     */
    public applyTimeDelta(timestampDelta:number):void {
        this.coordinates = this.nextPosition(timestampDelta);
    }

    /**
     * Apply a reflection to the vector given a normal bearing
     * @param wallNormal
     */
    public reflect(wallNormal:number):void {
        this.direction = 2 * wallNormal - this.direction;
    }

}

export class Ball {

    private vector:Vector;
    private static MAX_SPEED:number = 1000;
    private static COLLISION_DECAY_FACTOR:number = 0.9;
    private radius:number = 20;
    private fillStyle:string = '#FFc200';

    constructor(coordinates:ICoordinates = {x:0, y:0}, speed:number = Ball.randomSpeed(), direction:number = Ball.randomDirection()) {
        this.vector = new Vector(coordinates, speed, direction);
    }

    /**
     * Get a random speed, maximum is MAX_SPEED
     * @returns {number}
     */
    private static randomSpeed():number {
        return Math.random() * Ball.MAX_SPEED;
    }

    /**
     * Get a random direction (in radians -Pi to +Pi)
     * @returns {number}
     */
    private static randomDirection():number {
        return Math.random() * 2 * Math.PI - Math.PI;
    }

    /**
     * Calculate position and draw the ball
     * @param context
     * @param timestampDelta
     */
    public render(context:CanvasRenderingContext2D, timestampDelta:number):void {
        this.recalculatePosition(timestampDelta, context.canvas.height);
        this.draw(context);
    }

    /**
     * Draw the ball on the canvas
     * @param context
     */
    public draw(context:CanvasRenderingContext2D):void {
        //draw the circle
        context.beginPath();
        context.arc(this.vector.coordinates.x, this.vector.coordinates.y, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle = this.fillStyle;
        context.fill();
        context.lineWidth = 5;
        context.strokeStyle = '#a76d04';
        context.stroke();

        //draw the ball vector
        context.strokeStyle = '#FFFFFF';
        context.beginPath();
        context.moveTo(this.vector.coordinates.x, this.vector.coordinates.y);
        context.lineTo(this.vector.speed / 10 * Math.cos(this.vector.direction) + this.vector.coordinates.x, this.vector.speed / 10 * Math.sin(this.vector.direction) + this.vector.coordinates.y);
        context.stroke();

    }

    /**
     * Recalculate the position, disabling the recalculations when the ball is stopped
     * @param timestampDelta
     * @param height
     */
    private recalculatePosition(timestampDelta:number, height:number):void {
        //console.log(this.vector.speed);
        if (this.vector.speed < 10 && this.vector.coordinates.y - 10 > height - this.radius) {
            this.fillStyle = '#4c4c4c';
        } else {
            this.applyGravity(timestampDelta);
            this.vector.applyTimeDelta(timestampDelta);
        }
    }

    /**
     * Check for wall collisions, applying a reflection vector when detected
     * @param width
     * @param height
     */
    public checkCollisions(width:number, height:number):void {

        let reflectionNormal:number;

        if (this.vector.coordinates.x <= this.radius) { //left wall
            reflectionNormal = -Math.PI / 2; //east
        }

        if (this.vector.coordinates.x >= (width - this.radius)) { //right wall
            reflectionNormal = Math.PI / 2; //west
        }

        if (this.vector.coordinates.y <= this.radius) { //ceiling
            reflectionNormal = -Math.PI; //south
        }

        if (this.vector.coordinates.y >= (height - this.radius)) { //floor
            reflectionNormal = Math.PI; //north
        }

        if (typeof reflectionNormal !== "undefined") {
            this.vector.reflect(reflectionNormal);

            this.vector.speed *= Ball.COLLISION_DECAY_FACTOR; //apply a speed penalty for colliding, simulating elastic loss
        }

    }

    /**
     * Apply acceleration due to gravity by predicting the next location and moving the vector based on that prediction
     * @param timestampDelta
     */
    private applyGravity(timestampDelta:number):void {
        let nextPosition = this.vector.nextPosition(timestampDelta);

        let time = timestampDelta / 1000;

        let gravityMovement = (1000 * time * time); //get the predicted movement over that time

        nextPosition.y += gravityMovement; //apply it to the predicted location

        let x = this.vector.coordinates.x - nextPosition.x; //normalise to origin
        let y = this.vector.coordinates.y - nextPosition.y;

        this.vector.speed = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) / time; //calulate the new distance then new speed
        this.vector.direction = Math.atan2(y, x) - Math.PI; //calculate the new directing to update the vector

    }

}