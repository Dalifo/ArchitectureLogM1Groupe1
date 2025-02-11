import { IMap } from "../interfaces/IMap";

export class Map implements IMap {
    private readonly width: number;
    private readonly height: number;

    constructor(width: number, height: number) {
        if (!Number.isInteger(width) || width <= 0) {
            throw new Error("Width must be a positive integer.");
        }
        if (!Number.isInteger(height) || height <= 0) {
            throw new Error("Height must be a positive integer.");
        }

        this.width = width;
        this.height = height;
    }

    getWidth(): number {
        return this.width;
    }

    getHeight(): number {
        return this.height;
    }

    wrapPosition(x: number, y: number): { x: number; y: number } {
        if (!Number.isInteger(x) || !Number.isInteger(y)) {
            throw new Error("Coordinates must be integers.");
        }

        return {
            x: (x + this.width) % this.width,
            y: (y + this.height) % this.height
        };
    }
}
