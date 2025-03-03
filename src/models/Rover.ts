import { IRover } from "../interfaces/IRover";
import { Orientation, rotateLeft, rotateRight } from "../models/Orientation";
import { IMap } from "../interfaces/IMap";
import { IRoverState } from "../interfaces/IRoverState";

// ENTITE car cycle de vie (creation, déplacement, rota, detection d'obstacle), comportement actif, et interagit avec d'autres composants
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

  // BAS NIVEAU
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

  // BAS NIVEAU
  // Fonction privée pour déplacer le rover
  private move(step: number): IRoverState {
    const nextPosition = this.calculateNewPosition(this.direction, step);
    const validatedPosition = this.map.getNextValidPosition(this.x, this.y, nextPosition.x, nextPosition.y);

    this.x = validatedPosition.x;
    this.y = validatedPosition.y;

    return this.getState(validatedPosition.obstacle);
  }
  
  // MOYEN / BAS NIVEAU 
  // Déplace le rover d'une case vers l'avant
  public moveForward(): IRoverState {
    return this.move(1);
  }

  // MOYEN / BAS NIVEAU 
  // Déplace le rover d'une case vers l'arrière
  public moveBackward(): IRoverState {
    return this.move(-1);
  }

  // MOYEN / BAS NIVEAU 
  // Tourne le rover à gauche
  public turnLeft(): IRoverState {
    this.direction = rotateLeft(this.direction);
    return this.getState(false);
  }

  // MOYEN / BAS NIVEAU 
  // Tourne le rover à droite
  public turnRight(): IRoverState {
    this.direction = rotateRight(this.direction);
    return this.getState(false);
  }

  // BAS NIVEAU
  // Retourne la position actuelle du rover
  public getPosition(): { x: number; y: number } {
    return { x: this.x, y: this.y };
  }

  // BAS NIVEAU
  // Retourne la direction actuelle du rover
  public getDirection(): Orientation {
    return this.direction;
  }

  // BAS NIVEAU
  // Retourne l'état actuel du rover
  private getState(obstacleDetected: boolean): IRoverState {
    return {
      getPositionX: () => this.x,
      getPositionY: () => this.y,
      getOrientation: () => this.direction,
      obstacleDetected: obstacleDetected, // Booléen
    };
  }

  // HAUT NIVEAU => orchestre les autres fonctions
  // Exécute une suite de commandes et s'arrête en cas d'obstacle
  public executeCommands(commands: string): IRoverState {
    for (const command of commands) {
        const state = this.executeCommand(command); // Utilisation correcte de executeCommand()
        if (state.obstacleDetected) {
            return state; // Arrêt immédiat si obstacle
        }
    }
    return this.getState(false); // Retourne l'état final s'il n'y a pas d'obstacle
  }

  // MOYEN / HAUT => fait la liaison entre les commandes et les actions
  // Exécute une seule commande
  private executeCommand(command: string): IRoverState {
    switch (command) {
      case 'F': return this.moveForward();
      case 'B': return this.moveBackward();
      case 'L': return this.turnLeft();
      case 'R': return this.turnRight();
      default: throw new Error(`Commande invalide: ${command}`);
    }
  }
}
