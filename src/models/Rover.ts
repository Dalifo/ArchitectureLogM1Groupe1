import { IRover } from "../interfaces/IRover";
import { Orientation, rotateLeft, rotateRight } from "../models/Orientation";
import { IMap } from "../interfaces/IMap";
import { IRoverState } from "../interfaces/IRoverState";

// La classe Rover représente un rover se déplaçant sur une carte.
// Il peut avancer, reculer et tourner à gauche ou à droite.
// La position et l'orientation du rover sont gérées par un objet `Position`.
// La carte sur laquelle il évolue est représentée par une interface `IMap`.
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

    // Fonction qui calcule la nouvelle position sans modifier l'état du rover
    private calculateNewPosition(direction: Orientation, step: number): { x: number, y: number } {
        let newX = this.x;
        let newY = this.y;

        switch (direction) {
            case Orientation.North: newY += step; break;
            case Orientation.East:  newX += step; break;
            case Orientation.South: newY -= step; break;
            case Orientation.West:  newX -= step; break;
        }

        return this.map.wrapPosition(newX, newY);
    }

    // Fonction qui met à jour la position et retourne l'état
    private updatePosition(newPosition: { x: number, y: number }): IRoverState {
        this.x = newPosition.x;
        this.y = newPosition.y;
        return this.getState();
    }

    // Déplacement vers l'avant
    public MoveForward(): IRoverState {
        const newPosition = this.calculateNewPosition(this.direction, 1);
        return this.updatePosition(newPosition);
    }

    // Déplacement vers l'arrière
    public MoveBackward(): IRoverState {
        const newPosition = this.calculateNewPosition(this.direction, -1);
        return this.updatePosition(newPosition);
    }

    // déplace le rover vers la gauche par rapport à sa direction actuelle
    public TurnLeft(): IRoverState {
        this.direction = rotateLeft(this.direction);
        // Retourne l'état actuel du rover après le déplacement.
        return this.getState();
    }

    // déplace le rovers vers la droite
    public TurnRight(): IRoverState {
        this.direction = rotateRight(this.direction);
        return this.getState();
    }


    // Renvoie un objet avec les coordonnées X et Y
    public getPosition(): { x: number; y: number } {
        return { x: this.x, y: this.y };
    }

    // Renvoie l'orientation actuelle du rover
    public getDirection(): Orientation {
        return this.direction;
    }

    //Renvoie l'état actuel du rover sous forme d'objet contenant des getters pour X, Y et l'orientation.

    private getState(): IRoverState {
        return {
            GetPositionX: () => this.x,
            GetPositionY: () => this.y,
            GetOrientation: () => this.direction,
        };
    }
}