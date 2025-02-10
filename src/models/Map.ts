import { IMap } from "../interfaces/IMap";

export class Map implements IMap {
    private readonly width: number;
    private readonly height: number;

    constructor(width: number, height: number) {
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
        return {
            x: (x + this.width) % this.width,
            y: (y + this.height) % this.height
        };
    }
}
