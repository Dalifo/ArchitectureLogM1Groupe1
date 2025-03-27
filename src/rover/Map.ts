export type Position = { x: number; y: number };

import { IMap } from "./IMap.js";

export class Map implements IMap {
    private readonly width: number;
    private readonly height: number;
    private obstacles: Set<string>;
    private discoveredObstacles: Set<string>;
  
    constructor(width: number, height: number, obstacles: Position[] = []) {
      this.width = width;
      this.height = height;
      this.obstacles = new Set(obstacles.map(({ x, y }) => `${x},${y}`));
      this.discoveredObstacles = new Set();
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
  
    discoverObstacle(x: number, y: number): void {
      this.discoveredObstacles.add(`${x},${y}`);
    }
  
    public isObstacle(x: number, y: number): boolean {
      return this.obstacles.has(`${x},${y}`);
    }
  
    public hasDiscoveredObstacle(x: number, y: number): boolean {
      return this.discoveredObstacles.has(`${x},${y}`);
    }
  
    private wrapPosition(x: number, y: number): Position {
      return {
        x: this.modulo(x, this.width),
        y: this.modulo(y, this.height),
      };
    }
  
    public getNextValidPosition(
      x: number,
      y: number,
      newX: number,
      newY: number
    ): { x: number; y: number; obstacle: boolean } {
      const wrappedPosition = this.wrapPosition(newX, newY);
  
      const isObstacle = this.isObstacle(wrappedPosition.x, wrappedPosition.y) || this.hasDiscoveredObstacle(wrappedPosition.x, wrappedPosition.y);
      if (isObstacle) {
        return { x, y, obstacle: true };
      }
  
      return { x: wrappedPosition.x, y: wrappedPosition.y, obstacle: false };
    }
  }
  