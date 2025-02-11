import { Orientation, rotateLeft, rotateRight } from "./Orientation";
import { IMap } from "../interfaces/IMap";

export class Position {
    private x: number;
    private y: number;
    private direction: Orientation;

    constructor(x: number, y: number, direction: Orientation) {
        if (!Number.isInteger(x) || !Number.isInteger(y)) {
            throw new Error("Coordinates must be integers.");
        }
        this.x = x;
        this.y = y;
        this.direction = direction;
    }

    public moveForward(map: IMap): void {
        let newX = this.x;
        let newY = this.y;

        switch (this.direction) {
            case Orientation.North: newY++; break;
            case Orientation.East: newX++; break;
            case Orientation.South: newY--; break;
            case Orientation.West: newX--; break;
        }

        const newPosition = map.wrapPosition(newX, newY);
        this.x = newPosition.x;
        this.y = newPosition.y;
    }

    public moveBackward(map: IMap): void {
        let newX = this.x;
        let newY = this.y;

        switch (this.direction) {
            case Orientation.North: newY--; break;
            case Orientation.East: newX--; break;
            case Orientation.South: newY++; break;
            case Orientation.West: newX++; break;
        }

        const newPosition = map.wrapPosition(newX, newY);
        this.x = newPosition.x;
        this.y = newPosition.y;
    }

    public turnLeft(): void {
        this.direction = rotateLeft(this.direction);
    }

    public turnRight(): void {
        this.direction = rotateRight(this.direction);
    }

    public getState(): { x: number; y: number; direction: Orientation } {
        return { x: this.x, y: this.y, direction: this.direction };
    }
}
