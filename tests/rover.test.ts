import { Rover } from '../src/rover/Rover.js';
import { Orientation } from '../src/rover/Orientation.js';
import { Map } from '../src/rover/Map.js';

describe('Rover', () => {
    test('should move forward', () => {
        let map: Map;
        map = new Map(5, 5);

        let rover: Rover;
        rover = new Rover(0, 0, Orientation.North, map);

        const state = rover.moveForward();
        expect(rover.getPosition().x).toBe(0);
        expect(rover.getPosition().y).toBe(1);
        expect(state.obstacleDetected).toBe(false);
    });

    test('should move forward twice', () => {
        let map: Map;
        map = new Map(5, 5);

        let rover: Rover;
        rover = new Rover(0, 0, Orientation.North, map);

        rover.moveForward();
        rover.moveForward();
        expect(rover.getPosition().x).toBe(0);
        expect(rover.getPosition().y).toBe(2);
    });

    test('should turn left', () => {
        let map: Map;
        map = new Map(5, 5);

        let rover: Rover;
        rover = new Rover(0, 0, Orientation.North, map);

        const state = rover.turnLeft();
        expect(state.getOrientation()).toBe(Orientation.West);
    });

    test('should turn right', () => {
        let map: Map;
        map = new Map(5, 5);

        let rover: Rover;
        rover = new Rover(0, 0, Orientation.North, map);

        const state = rover.turnRight();
        expect(state.getOrientation()).toBe(Orientation.East);
    });

    test('should wrap around the Y-axis when moving backward', () => {
        let map: Map;
        map = new Map(5, 5);

        let rover: Rover;
        rover = new Rover(0, 0, Orientation.North, map);

        rover.moveBackward();
        expect(rover.getPosition().x).toBe(0);
        expect(rover.getPosition().y).toBe(4);
    });

    test('should wrap around the X-axis when moving left', () => {
        let map: Map;
        map = new Map(5, 5);

        let rover: Rover;
        rover = new Rover(0, 0, Orientation.West, map);

        rover.moveForward();
        expect(rover.getPosition().x).toBe(4);
        expect(rover.getPosition().y).toBe(0);
    });

    test('should stop when encountering an obstacle', () => {
        let map: Map;
        map = new Map(5, 5, [{ x: 0, y: 2 }]); 

        let rover: Rover;
        rover = new Rover(0, 0, Orientation.North, map);

        rover.moveForward();
        const state = rover.moveForward();

        expect(rover.getPosition().x).toBe(0);
        expect(rover.getPosition().y).toBe(1);
        expect(state.obstacleDetected).toBe(true);
    });

    test('should process commands until an obstacle is encountered', () => {
        let map: Map;
        map = new Map(5, 5, [{ x: 1, y: 1 }]);

        let rover: Rover;
        rover = new Rover(0, 0, Orientation.East, map);

        const state = rover.executeCommands('FLFF');

        expect(rover.getPosition().x).toBe(1);
        expect(rover.getPosition().y).toBe(0);
        expect(state.obstacleDetected).toBe(true);
    });

    test('should report the obstacle position when detected', () => {
        let map: Map;
        map = new Map(5, 5, [{ x: 3, y: 3 }]); 

        let rover: Rover;
        rover = new Rover(0, 0, Orientation.North, map);

        const state = rover.executeCommands('RFFFLFFFF');

        expect(rover.getPosition().x).toBe(3);
        expect(rover.getPosition().y).toBe(2);
        expect(state.obstacleDetected).toBe(true);
    });
});
