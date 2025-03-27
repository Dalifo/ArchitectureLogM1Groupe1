import { IRover } from "../rover/IRover";
import { IRoverState } from "../rover/IRoverState";

export class RoverInterpreter {
  private rover: IRover;

  constructor(rover: IRover) {
    this.rover = rover;
  }

  public executeCommands(commands: string): IRoverState {
    let finalState: IRoverState = {
      getOrientation: () => this.rover.getOrientation(),
      obstacleDetected: false,
    };

    for (const command of commands) {
      if (!['F', 'B', 'L', 'R'].includes(command)) {
        throw new Error(`Commande invalide: ${command}`);
      }
      finalState = this.executeCommand(command);
      if (finalState.obstacleDetected) {
        return finalState;
      }
    }

    return finalState;
  }
  
  

  private executeCommand(command: string): IRoverState {
    switch (command) {
      case "F":
        return this.rover.moveForward();
      case "B":
        return this.rover.moveBackward();
      case "L":
        return this.rover.turnLeft();
      case "R":
        return this.rover.turnRight();
      default:
        throw new Error(`Commande invalide: ${command}`);
    }
  }
}
