import { Rover } from "./models/Rover";
import { Orientation } from "./models/Orientation";
import { Map } from "./models/Map";

const world = new Map(10, 10);
const rover = new Rover(0, 0, Orientation.North, world);

rover.MoveForward();
rover.TurnRight();
rover.MoveForward();
rover.TurnLeft();
rover.MoveBackward();
