import { IMap } from "./IMap.js";
import { IRover } from "./IRover.js";
import { IRoverState } from "./IRoverState.js";
import { Position } from "./Map.js";
import { Orientation, rotateLeft, rotateRight } from "./Orientation.js";

export class Rover implements IRover {
  private x: number;
  private y: number;
  private direction: Orientation;
  private readonly map: IMap;

  constructor(x: number, y: number, direction: Orientation, map: IMap) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.map = map;
  }

  private calculateNewPosition(
    direction: Orientation,
    step: number
  ): Position {
    let newX = this.x;
    let newY = this.y;

    switch (direction) {
      case Orientation.North:
        newY += step;
        break;
      case Orientation.East:
        newX += step;
        break;
      case Orientation.South:
        newY -= step;
        break;
      case Orientation.West:
        newX -= step;
        break;
    }

    const validatedPosition = this.map.getNextValidPosition(
      this.x,
      this.y,
      newX,
      newY
    );

    return { x: validatedPosition.x, y: validatedPosition.y };
  }

  private move(step: number): IRoverState {
    const nextPosition = this.calculateNewPosition(this.direction, step);
    const validatedPosition = this.map.getNextValidPosition(
      this.x,
      this.y,
      nextPosition.x,
      nextPosition.y
    );

    this.x = validatedPosition.x;
    this.y = validatedPosition.y;

    return this.getState(validatedPosition.obstacle);
  }

  public moveForward(): IRoverState {
    return this.move(1);
  }

  public moveBackward(): IRoverState {
    return this.move(-1);
  }

  public turnLeft(): IRoverState {
    this.direction = rotateLeft(this.direction);
    return this.getState(false);
  }

  public turnRight(): IRoverState {
    this.direction = rotateRight(this.direction);
    return this.getState(false);
  }

  public getPosition(): Position {
    return { x: this.x, y: this.y };
  }

  public getDirection(): Orientation {
    return this.direction;
  }

  private getState(obstacleDetected: boolean): IRoverState {
    return {
      getOrientation: () => this.direction,
      obstacleDetected: obstacleDetected,
    };
  }

  public executeCommands(commands: string): IRoverState {
    for (const command of commands) {
      const state = this.executeCommand(command); 
      if (state.obstacleDetected) {
        return state;
      }
    }
    return this.getState(false);
  }

  private executeCommand(command: string): IRoverState {
    switch (command) {
      case "F":
        return this.moveForward();
      case "B":
        return this.moveBackward();
      case "L":
        return this.turnLeft();
      case "R":
        return this.turnRight();
      default:
        throw new Error(`Commande invalide: ${command}`);
    }
  }
}
