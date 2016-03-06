import {BallCollection} from "./ballCollection";
import {Ball} from "./ball";
describe('Ball collection', () => {

    let newBall = new Ball();

    it('should be able to push a ball into the collection', () => {

        let ballCollection = new BallCollection();

        ballCollection.push(newBall);

        expect(ballCollection).toContain(newBall);
        expect(ballCollection.length).toBe(1);
    });

});