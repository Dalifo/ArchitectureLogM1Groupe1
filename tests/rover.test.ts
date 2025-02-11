import { Rover } from "../src/models/Rover";
import { Orientation } from "../src/models/Orientation";
import { Map } from "../src/models/Map";

describe("Rover", () => {
    let map: Map;

    beforeEach(() => {
        map = new Map(5, 5);
    });

    test("should move forward", () => {
        const rover = new Rover(0, 0, Orientation.North, map);
        rover.MoveForward();
        
        const positionState = rover["position"].getState();
        expect(positionState).toEqual({ x: 0, y: 1, direction: Orientation.North });
    });

    test("should move forward twice", () => {
        const rover = new Rover(0, 0, Orientation.North, map);
        rover.MoveForward();
        rover.MoveForward();

        const positionState = rover["position"].getState();
        expect(positionState).toEqual({ x: 0, y: 2, direction: Orientation.North });
    });

    test("should turn left", () => {
        const rover = new Rover(0, 0, Orientation.North, map);
        rover.TurnLeft();

        const positionState = rover["position"].getState();
        expect(positionState.direction).toEqual(Orientation.West);
    });

    test("should turn right", () => {
        const rover = new Rover(0, 0, Orientation.North, map);
        rover.TurnRight();

        const positionState = rover["position"].getState();
        expect(positionState.direction).toEqual(Orientation.East);
    });

    test("should move backward and teleport to the other side on the Y axis", () => {
        const rover = new Rover(0, 0, Orientation.North, map);
        rover.MoveBackward();

        const positionState = rover["position"].getState();
        expect(positionState).toEqual({ x: 0, y: 4, direction: Orientation.North });
    });

    test("should turn right and move forward", () => {
        const rover = new Rover(0, 0, Orientation.North, map);
        rover.TurnRight();
        rover.MoveForward();

        const positionState = rover["position"].getState();
        expect(positionState).toEqual({ x: 1, y: 0, direction: Orientation.East });
    });

    test("should turn left and move forward and teleport to the other side on the X axis", () => {
        const rover = new Rover(0, 0, Orientation.North, map);
        rover.TurnLeft();
        rover.MoveForward();

        const positionState = rover["position"].getState();
        expect(positionState).toEqual({ x: 4, y: 0, direction: Orientation.West });
    });

    test("should go forward and teleport to the other side on Y axis", () => {
        const rover = new Rover(0, 0, Orientation.North, map);
        rover.MoveForward(); // y = 1
        rover.MoveForward(); // y = 2
        rover.MoveForward(); // y = 3
        rover.MoveForward(); // y = 4
        rover.MoveForward(); // y = 0

        const positionState = rover["position"].getState();
        expect(positionState).toEqual({ x: 0, y: 0, direction: Orientation.North });
    });
});
