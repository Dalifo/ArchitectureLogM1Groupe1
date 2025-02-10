import { IRover } from "../interfaces/IRover";
import { IRoverState } from "../interfaces/IRoverState";
import { Orientation, rotateLeft, rotateRight } from "../models/Orientation";
import { IMap } from "../interfaces/IMap";

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

    public MoveBackward(): IRoverState {
        let newX = this.x;
        let newY = this.y;

        switch (this.direction) {
            case Orientation.North: newY--; break;
            case Orientation.East:  newX--; break;
            case Orientation.South: newY++; break;
            case Orientation.West:  newX++; break;
        }

        const newPosition = this.map.wrapPosition(newX, newY);
        this.x = newPosition.x;
        this.y = newPosition.y;

        return this.getState();
    }

    public TurnLeft(): IRoverState {
        this.direction = rotateLeft(this.direction);
        return this.getState();
    }

    public TurnRight(): IRoverState {
        this.direction = rotateRight(this.direction);
        return this.getState();
    }

    public getPosition(): { x: number; y: number } {
        return { x: this.x, y: this.y };
    }

    public getDirection(): Orientation {
        return this.direction;
    }

    private getState(): IRoverState {
        return {
            GetPositionX: () => this.x,
            GetPositionY: () => this.y,
            GetOrientation: () => this.direction,
        };
    }
}
