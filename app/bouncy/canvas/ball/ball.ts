export interface ICoordinates {
    x: number;
    y: number;
}

export class Vector {

    constructor(public coordinates: ICoordinates, //pixels
                public speed:number, //pixels/second
                public direction:number //radians
    ) {
    }

    public applyTimeDelta(timestampDelta:number):Vector {

        let distance = timestampDelta / 1000 * this.speed;

        this.coordinates.x += Math.cos(this.direction) * distance;
        this.coordinates.y += Math.sin(this.direction) * distance;

        return this;
    }

    public reflect(wallNormal:number):void {

        this.direction = 2 * wallNormal - this.direction;

        this.applyTimeDelta(10); //apply immediate bump so it doesn't get "stuck" on the wall
    }

}

export class Ball {

    private vector:Vector;
    private static MAX_SPEED:number = 1000;
    private static COLLISION_DECAY_FACTOR:number = 0.9;
    private radius:number = 20;

    constructor(coordinates: ICoordinates, speed?:number = Ball.randomSpeed(), direction?:number = Ball.randomDirection()) {
        this.vector = new Vector(coordinates, speed, direction);
    }

    private static randomSpeed():number {
        return Math.random() * Ball.MAX_SPEED;
    }

    private static randomDirection():number {
        return Math.random() * 2 * Math.PI - Math.PI;
    }

    public render(context:CanvasRenderingContext2D, timestampDelta:number):void {
        this.recalculatePosition(timestampDelta);
        this.draw(context);
    }

    public draw(context:CanvasRenderingContext2D):void {
        context.beginPath();
        context.arc(this.vector.coordinates.x, this.vector.coordinates.y, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle = 'green';
        context.fill();
        context.lineWidth = 5;
        context.strokeStyle = '#003300';
        context.stroke();

        context.strokeStyle = '#FFFFFF';
        context.beginPath();
        context.moveTo(this.vector.coordinates.x, this.vector.coordinates.y);
        context.lineTo(this.vector.speed/10 * Math.cos(this.vector.direction) + this.vector.coordinates.x, this.vector.speed/10 * Math.sin(this.vector.direction) + this.vector.coordinates.y);
        context.stroke();

    }

    private recalculatePosition(timestampDelta:number):void {
        this.vector.applyTimeDelta(timestampDelta);
    }

    public checkCollisions(width:number, height:number):void {

        let reflectionNormal:number;

        if (this.vector.coordinates.x <= this.radius){ //left wall
            reflectionNormal = -Math.PI/2; //east
        }

        if (this.vector.coordinates.x >= (width - this.radius)){ //right wall
            reflectionNormal = Math.PI/2; //west
        }

        if (this.vector.coordinates.y <= this.radius){ //ceiling
            reflectionNormal = -Math.PI; //south
        }

        if (this.vector.coordinates.y >= (height - this.radius)){ //floor
            reflectionNormal = Math.PI; //north
        }

        if(typeof reflectionNormal !== "undefined"){
            this.vector.reflect(reflectionNormal);

            this.vector.speed *= Ball.COLLISION_DECAY_FACTOR;
        }


    }
}