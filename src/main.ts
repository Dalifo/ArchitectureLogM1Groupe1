import { Rover } from "./rover/Rover.js";
import { Orientation } from "./rover/Orientation.js";
import { Map } from "./rover/Map.js";

const world = new Map(10, 10);
const rover = new Rover(0, 0, Orientation.North, world);

console.log(`Initial Position: (${rover.getPosition().x}, ${rover.getPosition().y}) Facing ${rover.getDirection()}`);

rover.moveForward();
console.log(`After Moving Forward: (${rover.getPosition().x}, ${rover.getPosition().y}) Facing ${rover.getDirection()}`);

rover.turnRight();
console.log(`After Turning Right: (${rover.getPosition().x}, ${rover.getPosition().y}) Facing ${rover.getDirection()}`);

rover.moveForward();
console.log(`After Moving Forward: (${rover.getPosition().x}, ${rover.getPosition().y}) Facing ${rover.getDirection()}`);

rover.turnLeft();
console.log(`After Turning Left: (${rover.getPosition().x}, ${rover.getPosition().y}) Facing ${rover.getDirection()}`);
