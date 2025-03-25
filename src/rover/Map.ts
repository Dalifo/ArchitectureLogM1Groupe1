export type Position = { x: number; y: number };

import { IMap } from "./IMap.js";

export class Map implements IMap {
    private readonly width: number;
    private readonly height: number;
    private readonly obstacles: Set<string>; 

    constructor(width: number, height: number, obstacles: Position[] = []) {
        this.width = width;
        this.height = height;
        this.obstacles = new Set(obstacles.map(({ x, y }) => `${x},${y}`)); 
    }
    
    getWidth(): number {
        return this.width;
    }

    getHeight(): number {
        return this.height;
    }

    private modulo(num: number, mod: number): number {
        const valeurRéduiteSignée = (num % mod) % -mod;
        const valeurNonSignée = valeurRéduiteSignée + mod;
        return valeurNonSignée % mod;
    }

    public isObstacle(x: number, y: number): boolean {
        return this.obstacles.has(`${x},${y}`);
    }

    private wrapPosition(x: number, y: number): Position {
        return {
            x: this.modulo(x, this.width),
            y: this.modulo(y, this.height)
        };
    }

    public getNextValidPosition(x: number, y: number, newX: number, newY: number): { x: number; y: number; obstacle: boolean } {
        const wrappedPosition = this.wrapPosition(newX, newY);
        
        if (this.isObstacle(wrappedPosition.x, wrappedPosition.y)) {
            return { x, y, obstacle: true };
        }
        
        return { x: wrappedPosition.x, y: wrappedPosition.y, obstacle: false };
    }
}
