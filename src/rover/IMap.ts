export interface IMap {
  getWidth(): number;
  getHeight(): number;
  isObstacle(x: number, y: number): boolean; 
  getNextValidPosition(x: number, y: number, newX: number, newY: number): { x: number; y: number; obstacle: boolean };
}