import {Ball} from "./ball";
describe('Ball collection', () => {


    it('should be initialized with a random speed & direction', () => {

        let newBall = new Ball();

        expect((<any>newBall).vector.speed).toEqual(jasmine.any(Number));
        expect((<any>newBall).vector.direction).toEqual(jasmine.any(Number));

    });

});