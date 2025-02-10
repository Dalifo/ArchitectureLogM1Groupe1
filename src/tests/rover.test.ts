import { Rover } from '../models/Rover';
import { Orientation } from '../models/Orientation';
import { Map } from '../models/Map';

describe('Rover', () => {
    let rover: Rover;
    let world: Map;
  
    beforeEach(() => {
      world = new Map(5, 5);
      rover = new Rover(0, 0, Orientation.North, world);
    });

    test('should move forward', () => {
        rover.MoveForward();
        expect(rover.getPosition()).toEqual({ x: 0, y: 1 });
    });

    test('should move forward twice', () => {
        rover.MoveForward();
        rover.MoveForward();
        expect(rover.getPosition()).toEqual({ x: 0, y: 2 });
    });

    test('should turn left', () => {
        rover.TurnLeft();
        expect(rover.getDirection()).toEqual(Orientation.West);
    });

    test('should turn right', () => {
        rover.TurnRight();
        expect(rover.getDirection()).toEqual(Orientation.East);
    });

    test('should move backward and teleport to the other side on the Y axis', () => {
        rover.MoveBackward();
        expect(rover.getPosition()).toEqual({ x: 0, y: 4 });
    });

    test('should turn right and move forward', () => {
        rover.TurnRight();
        rover.MoveForward();
        expect(rover.getPosition()).toEqual({ x: 1, y: 0 });
    });




    test('should turn left and move forward and teleport to the other side on the X axis', () => {
        rover.TurnLeft();
        rover.MoveForward();
        expect(rover.getPosition()).toEqual({ x: 4, y: 0 });
    });

    test('should go forward and teleport to the other side on Y axis', () => {
        rover.MoveForward(); // y = 1
        rover.MoveForward(); // y = 2
        rover.MoveForward(); // y = 3
        rover.MoveForward(); // y = 4
        rover.MoveForward(); // y = 0
        expect(rover.getPosition()).toEqual({ x: 0, y: 0 });
    })
});
