import { Rover } from "./models/Rover";
import { Orientation } from "./models/Orientation";
import { Map } from "./models/Map";

const world = new Map(10, 10);  // Carte 10x10
const rover = new Rover(0, 0, Orientation.North, world);

console.log(`Initial Position: (${rover.getPosition().x}, ${rover.getPosition().y}) Facing ${rover.getDirection()}`);

rover.MoveForward();
console.log(`After Moving Forward: (${rover.getPosition().x}, ${rover.getPosition().y}) Facing ${rover.getDirection()}`);

rover.TurnRight();
console.log(`After Turning Right: (${rover.getPosition().x}, ${rover.getPosition().y}) Facing ${rover.getDirection()}`);

rover.MoveForward();
console.log(`After Moving Forward: (${rover.getPosition().x}, ${rover.getPosition().y}) Facing ${rover.getDirection()}`);

rover.TurnLeft();
console.log(`After Turning Left: (${rover.getPosition().x}, ${rover.getPosition().y}) Facing ${rover.getDirection()}`);
