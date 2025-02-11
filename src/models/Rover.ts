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

    // Déplace le rover d'une unité vers l'avant dans la direction actuelle
    public MoveForward(): IRoverState {
        let newX = this.x;
        let newY = this.y;

        switch (this.direction) {
            case Orientation.North: newY++; break;
            case Orientation.East:  newX++; break;
            case Orientation.South: newY--; break;
            case Orientation.West:  newX--; break;
        }

        const newPosition = this.map.wrapPosition(newX, newY);
        this.x = newPosition.x;
        this.y = newPosition.y;

        return this.getState();
    }

    // Déplace le rover vers l'arrière par rapport à sa direction actuelle.
    public MoveBackward(): IRoverState {
        let newX = this.x;
        let newY = this.y;

        switch (this.direction) {
            case Orientation.North: newY--; break;
            case Orientation.East:  newX--; break;
            case Orientation.South: newY++; break;
            case Orientation.West:  newX++; break;
        }

        //  Assure que la position reste dans les limites de la carte.

        const newPosition = this.map.wrapPosition(newX, newY);
        this.x = newPosition.x;
        this.y = newPosition.y;

        return this.getState();
    }

    // déplace le rover vers la gauche par rapport à sa direction actuelle
    public TurnLeft(): IRoverState {
        this.direction = rotateLeft(this.direction);
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