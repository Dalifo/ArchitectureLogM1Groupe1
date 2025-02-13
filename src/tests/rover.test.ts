import { Rover } from '../models/Rover';
import { Orientation } from '../models/Orientation';
import { Map } from '../models/Map';

describe('Rover', () => {
    test('should move forward', () => {
        let map;
        map = new Map(5, 5);

        let rover;
        rover = new Rover(0, 0, Orientation.North, map);

        const state = rover.MoveForward();
        expect(state.GetPositionX()).toBe(0);
        expect(state.GetPositionY()).toBe(1);
        expect(state.ObstacleDetected).toBe(false);
    });

    test('should move forward twice', () => {
        let map;
        map = new Map(5, 5);

        let rover;
        rover = new Rover(0, 0, Orientation.North, map);

        rover.MoveForward();
        const state = rover.MoveForward();
        expect(state.GetPositionX()).toBe(0);
        expect(state.GetPositionY()).toBe(2);
    });

    test('should turn left', () => {
        let map;
        map = new Map(5, 5);

        let rover;
        rover = new Rover(0, 0, Orientation.North, map);

        const state = rover.TurnLeft();
        expect(state.GetOrientation()).toBe(Orientation.West);
    });

    test('should turn right', () => {
        let map;
        map = new Map(5, 5);

        let rover;
        rover = new Rover(0, 0, Orientation.North, map);

        const state = rover.TurnRight();
        expect(state.GetOrientation()).toBe(Orientation.East);
    });

    test('should wrap around the Y-axis when moving backward', () => {
        let map;
        map = new Map(5, 5);

        let rover;
        rover = new Rover(0, 0, Orientation.North, map);

        const state = rover.MoveBackward();
        expect(state.GetPositionX()).toBe(0);
        expect(state.GetPositionY()).toBe(4);
    });

    test('should wrap around the X-axis when moving left', () => {
        let map;
        map = new Map(5, 5);

        let rover;
        rover = new Rover(0, 0, Orientation.West, map);

        const state = rover.MoveForward();
        expect(state.GetPositionX()).toBe(4);
        expect(state.GetPositionY()).toBe(0);
    });

    test('should stop when encountering an obstacle', () => {
        let map;
        map = new Map(5, 5, [{ x: 0, y: 2 }]); // Obstacle en (0,2)

        let rover;
        rover = new Rover(0, 0, Orientation.North, map);

        rover.MoveForward(); // (0,1)
        const state = rover.MoveForward(); // Devrait s'arrêter à cause de l'obstacle

        expect(state.GetPositionX()).toBe(0);
        expect(state.GetPositionY()).toBe(1);
        expect(state.ObstacleDetected).toBe(true);
    });

    test('should process commands until an obstacle is encountered', () => {
        let map;
        map = new Map(5, 5, [{ x: 1, y: 1 }]); // Obstacle en (1,1)

        let rover;
        rover = new Rover(0, 0, Orientation.East, map);

        const state = rover.executeCommands('FLFF');

        expect(state.GetPositionX()).toBe(1);
        expect(state.GetPositionY()).toBe(0); // Devrait s'arrêter juste avant l'obstacle
        expect(state.ObstacleDetected).toBe(true);
    });

    test('should report the obstacle position when detected', () => {
        let map;
        map = new Map(5, 5, [{ x: 3, y: 3 }]); // Obstacle en (3,3)

        let rover;
        rover = new Rover(0, 0, Orientation.North, map);

        const state = rover.executeCommands('RFFFLFFFF'); // Se dirige vers (3,3)

        expect(state.GetPositionX()).toBe(3);
        expect(state.GetPositionY()).toBe(2); // Devrait s'arrêter avant (3,3)
        expect(state.ObstacleDetected).toBe(true);
    });
});
