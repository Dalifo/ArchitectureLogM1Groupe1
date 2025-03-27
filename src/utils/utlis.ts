import { WebSocket } from "ws";
import { Rover } from "../rover/Rover.js";
import { Map, Position } from "../rover/Map.js";
import { Orientation } from "../rover/Orientation.js";

export function generateRandomObstacles(width: number, height: number, count: number): { x: number, y: number }[] {
    const obstacles: { x: number, y: number }[] = [];
    while (obstacles.length < count) {
        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * height);

        if (!(x === 0 && y === 0) && !obstacles.some(pos => pos.x === x && pos.y === y)) {
            obstacles.push({ x, y });
        }
    }
    return obstacles;
}

export function generateMapString(rover: Rover, world: Map): string {
  const position = rover.getPosition();
  const direction = rover.getOrientation();
  let grid = "";

  const directionSymbols: Record<string, string> = {
    "N": " ↑ ",
    "E": " → ",
    "S": " ↓ ",
    "W": " ← "
  };

  for (let y = world.getHeight() - 1; y >= 0; y--) {
    for (let x = 0; x < world.getWidth(); x++) {
      if (x === position.x && y === position.y) {
        grid += directionSymbols[direction];
      } else if (world.hasDiscoveredObstacle(x, y)) {
        grid += " X ";
      } else {
        grid += " . ";
      }
    }
    grid += "\n";
  }

  return grid;
}


export function checkForObstacle(rover: Rover, world: Map, command: string): Position | null {
  const position: Position = rover.getPosition();
  const direction: Orientation = rover.getOrientation();
  let newPosition: Position = { ...position };

  switch (command) {
    case "F":
      if (direction === Orientation.North) newPosition.y += 1;
      else if (direction === Orientation.South) newPosition.y -= 1;
      else if (direction === Orientation.East) newPosition.x += 1;
      else if (direction === Orientation.West) newPosition.x -= 1;
      break;
    case "B":
      if (direction === Orientation.North) newPosition.y -= 1;
      else if (direction === Orientation.South) newPosition.y += 1;
      else if (direction === Orientation.East) newPosition.x -= 1;
      else if (direction === Orientation.West) newPosition.x += 1;
      break;
    case "L":
    case "R":
      return null;
  }

  if (world.isObstacle(newPosition.x, newPosition.y) || world.hasDiscoveredObstacle(newPosition.x, newPosition.y)) {
    world.discoverObstacle(newPosition.x, newPosition.y);
    return newPosition;
  }

  return null;
}


export function sendJsonResponse(ws: WebSocket, message: object) {
    ws.send(JSON.stringify(message));
}
