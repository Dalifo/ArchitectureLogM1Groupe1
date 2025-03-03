
import { IRover } from "../interfaces/IRover";

class MissionControl {
  private rover: IRover;

  constructor(rover: IRover) {
    this.rover = rover;
  }

  // Exécute une commande sur le rover
  public sendCommand(command: string) {
    switch (command) {
      case "F":
        return this.rover.moveForward();
      case "B":
        return this.rover.moveBackward();
      case "L":
        return this.rover.turnLeft();
      case "R":
        return this.rover.turnRight();
      case "POSITION":
        return this.rover.getPosition();
      default:
        throw new Error("Commande invalide");
    }
  }
}

export { MissionControl };
