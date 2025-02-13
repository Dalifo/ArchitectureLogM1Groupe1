import { IRover } from "../interfaces/IRover";
import { Orientation, rotateLeft, rotateRight } from "../models/Orientation";
import { IMap } from "../interfaces/IMap";
import { IRoverState } from "../interfaces/IRoverState";

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

  // Calcule la prochaine position du rover
  private calculateNewPosition(direction: Orientation, step: number): { x: number; y: number } {
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

    return this.map.wrapPosition(newX, newY);
  }

  // Fonction privée pour déplacer le rover
  private move(step: number): IRoverState {
    const nextPosition = this.calculateNewPosition(this.direction, step);
    const validatedPosition = this.map.getNextValidPosition(this.x, this.y, nextPosition.x, nextPosition.y);

    this.x = validatedPosition.x;
    this.y = validatedPosition.y;

    return this.getState(validatedPosition.obstacle);
  }
  
  // Déplace le rover d'une case vers l'avant
  public MoveForward(): IRoverState {
    return this.move(1);
  }

  // Déplace le rover d'une case vers l'arrière
  public MoveBackward(): IRoverState {
    return this.move(-1);
  }

  // Tourne le rover à gauche
  public TurnLeft(): IRoverState {
    this.direction = rotateLeft(this.direction);
    return this.getState(false);
  }

  // Tourne le rover à droite
  public TurnRight(): IRoverState {
    this.direction = rotateRight(this.direction);
    return this.getState(false);
  }

  // Retourne la position actuelle du rover
  public getPosition(): { x: number; y: number } {
    return { x: this.x, y: this.y };
  }

  // Retourne la direction actuelle du rover
  public getDirection(): Orientation {
    return this.direction;
  }

  // Retourne l'état actuel du rover
  private getState(obstacleDetected: boolean): IRoverState {
    return {
      GetPositionX: () => this.x,
      GetPositionY: () => this.y,
      GetOrientation: () => this.direction,
      ObstacleDetected: obstacleDetected, // Booléen
    };
  }

  // Exécute une suite de commandes et s'arrête en cas d'obstacle
  public executeCommands(commands: string): IRoverState {
    for (const command of commands) {
        const state = this.executeSingleCommand(command); // Utilisation correcte de executeSingleCommand()
        if (state.ObstacleDetected) {
            return state; // Arrêt immédiat si obstacle
        }
    }
    return this.getState(false); // Retourne l'état final s'il n'y a pas d'obstacle
  }

  // Exécute une seule commande
  private executeSingleCommand(command: string): IRoverState {
    switch (command) {
      case 'F': return this.MoveForward();
      case 'B': return this.MoveBackward();
      case 'L': return this.TurnLeft();
      case 'R': return this.TurnRight();
      default: throw new Error(`Commande invalide: ${command}`);
    }
  }
}
