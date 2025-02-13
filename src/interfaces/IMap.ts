export interface IMap {
  getWidth(): number;
  getHeight(): number;
  wrapPosition(x: number, y: number): { x: number; y: number };
  isObstacle(x: number, y: number): boolean; 
}