import { Rover } from "../rover/Rover.js";

export class MissionControl {
  private readonly rover: Rover;

  constructor(rover: Rover) {
    this.rover = rover;
  }

  public executeCommands(commands: string) {
    const result = this.rover.executeCommands(commands);
    if (result.obstacleDetected) {
      return {
        type: "error",
        message: `Obstacle rencontré à la position (${this.rover.getPosition().x}, ${this.rover.getPosition().y})`
      };
    }

    return {
      type: "success",
      message: "Commandes exécutées avec succès"
    };
  }
}
