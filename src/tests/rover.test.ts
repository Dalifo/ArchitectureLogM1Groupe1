import { Rover } from '../models/Rover';
import { Orientation } from '../models/Orientation';
import { Map } from '../models/Map';

describe('Rover', () => {

  

    test('should move forward', () => {
        const map: Map = new Map(5, 5);
        const rover: Rover = new Rover(0, 0, Orientation.North, map);

        rover.MoveForward();
        expect(rover.getPosition()).toEqual({ x: 0, y: 1 });
    });

    test('should move forward twice', () => {
        const map: Map = new Map(5, 5);
        const rover: Rover = new Rover(0, 0, Orientation.North, map);

        rover.MoveForward();
        rover.MoveForward();
        expect(rover.getPosition()).toEqual({ x: 0, y: 2 });
    });

    test('should turn left', () => {
        const map: Map = new Map(5, 5);
        const rover: Rover = new Rover(0, 0, Orientation.North, map);

        rover.TurnLeft();
        expect(rover.getDirection()).toEqual(Orientation.West);
    });

    test('should turn right', () => {
        const map: Map = new Map(5, 5);
        const rover: Rover = new Rover(0, 0, Orientation.North, map);

        rover.TurnRight();
        expect(rover.getDirection()).toEqual(Orientation.East);
    });

    test('should move backward and teleport to the other side on the Y axis', () => {
        const map: Map = new Map(5, 5);
        const rover: Rover = new Rover(0, 0, Orientation.North, map);

        rover.MoveBackward();
        expect(rover.getPosition()).toEqual({ x: 0, y: 4 });
    });

    test('should turn right and move forward', () => {
        const map: Map = new Map(5, 5);
        const rover: Rover = new Rover(0, 0, Orientation.North, map);

        rover.TurnRight();
        rover.MoveForward();
        expect(rover.getPosition()).toEqual({ x: 1, y: 0 });
    });




    test('should turn left and move forward and teleport to the other side on the X axis', () => {
        const map: Map = new Map(5, 5);
        const rover: Rover = new Rover(0, 0, Orientation.North, map);

        rover.TurnLeft();
        rover.MoveForward();
        expect(rover.getPosition()).toEqual({ x: 4, y: 0 });
    });

    test('should go forward and teleport to the other side on Y axis', () => {
        const map: Map = new Map(5, 5);
        const rover: Rover = new Rover(0, 0, Orientation.North, map);
        
        rover.MoveForward(); // y = 1
        rover.MoveForward(); // y = 2
        rover.MoveForward(); // y = 3
        rover.MoveForward(); // y = 4
        rover.MoveForward(); // y = 0
        expect(rover.getPosition()).toEqual({ x: 0, y: 0 });
    })
});
