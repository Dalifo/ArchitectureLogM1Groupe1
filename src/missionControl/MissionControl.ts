import { RoverInterpreter } from "../networkCommunication/RoverInterpreter";
import { IRoverState } from "../rover/IRoverState";

export class MissionControl {
  private readonly roverInterpreter: RoverInterpreter;

  constructor(roverInterpreter: RoverInterpreter) {
    this.roverInterpreter = roverInterpreter;
  }

  public executeCommands(commands: string) {
    const finalState: IRoverState = this.roverInterpreter.executeCommands(commands);

    if (finalState.obstacleDetected) {
      return {
        type: "error",
        message: `Obstacle rencontré à la position (${finalState.getOrientation()})`
      };
    }

    return {
      type: "success",
      message: "Commandes exécutées avec succès",
      finalOrientation: finalState.getOrientation()
    };
  }
}
