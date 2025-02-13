import { Rover } from '../models/Rover';
import { Orientation } from '../models/Orientation';
import { Map } from '../models/Map';

describe('Rover', () => {
    test('should move forward', () => {
        let map;
        map = new Map(5, 5);

        let rover;
        rover = new Rover(0, 0, Orientation.North, map);

        const state = rover.moveForward();
        expect(state.getPositionX()).toBe(0);
        expect(state.getPositionY()).toBe(1);
        expect(state.obstacleDetected).toBe(false);
    });

    test('should move forward twice', () => {
        let map;
        map = new Map(5, 5);

        let rover;
        rover = new Rover(0, 0, Orientation.North, map);

        rover.moveForward();
        const state = rover.moveForward();
        expect(state.getPositionX()).toBe(0);
        expect(state.getPositionY()).toBe(2);
    });

    test('should turn left', () => {
        let map;
        map = new Map(5, 5);

        let rover;
        rover = new Rover(0, 0, Orientation.North, map);

        const state = rover.turnLeft();
        expect(state.getOrientation()).toBe(Orientation.West);
    });

    test('should turn right', () => {
        let map;
        map = new Map(5, 5);

        let rover;
        rover = new Rover(0, 0, Orientation.North, map);

        const state = rover.turnRight();
        expect(state.getOrientation()).toBe(Orientation.East);
    });

    test('should wrap around the Y-axis when moving backward', () => {
        let map;
        map = new Map(5, 5);

        let rover;
        rover = new Rover(0, 0, Orientation.North, map);

        const state = rover.moveBackward();
        expect(state.getPositionX()).toBe(0);
        expect(state.getPositionY()).toBe(4);
    });

    test('should wrap around the X-axis when moving left', () => {
        let map;
        map = new Map(5, 5);

        let rover;
        rover = new Rover(0, 0, Orientation.West, map);

        const state = rover.moveForward();
        expect(state.getPositionX()).toBe(4);
        expect(state.getPositionY()).toBe(0);
    });

    test('should stop when encountering an obstacle', () => {
        let map;
        map = new Map(5, 5, [{ x: 0, y: 2 }]); // Obstacle en (0,2)

        let rover;
        rover = new Rover(0, 0, Orientation.North, map);

        rover.moveForward(); // (0,1)
        const state = rover.moveForward(); // Devrait s'arrêter à cause de l'obstacle

        expect(state.getPositionX()).toBe(0);
        expect(state.getPositionY()).toBe(1);
        expect(state.obstacleDetected).toBe(true);
    });

    test('should process commands until an obstacle is encountered', () => {
        let map;
        map = new Map(5, 5, [{ x: 1, y: 1 }]); // Obstacle en (1,1)

        let rover;
        rover = new Rover(0, 0, Orientation.East, map);

        const state = rover.executeCommands('FLFF');

        expect(state.getPositionX()).toBe(1);
        expect(state.getPositionY()).toBe(0); // Devrait s'arrêter juste avant l'obstacle
        expect(state.obstacleDetected).toBe(true);
    });

    test('should report the obstacle position when detected', () => {
        let map;
        map = new Map(5, 5, [{ x: 3, y: 3 }]); // Obstacle en (3,3)

        let rover;
        rover = new Rover(0, 0, Orientation.North, map);

        const state = rover.executeCommands('RFFFLFFFF'); // Se dirige vers (3,3)

        expect(state.getPositionX()).toBe(3);
        expect(state.getPositionY()).toBe(2); // Devrait s'arrêter avant (3,3)
        expect(state.obstacleDetected).toBe(true);
    });
});
