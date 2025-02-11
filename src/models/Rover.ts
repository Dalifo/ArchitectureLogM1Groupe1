import { IRover } from "../interfaces/IRover";
import { Position } from "./Position";
import { Orientation } from "./Orientation";
import { IMap } from "../interfaces/IMap";

export class Rover implements IRover {
    private readonly position: Position;
    private readonly map: IMap;

    constructor(x: number, y: number, direction: Orientation, map: IMap) {
        this.map = map;
        this.position = new Position(x, y, direction);
        this.logState("Initialized");
    }

    public MoveForward(): void {
        this.position.moveForward(this.map);
        this.logState("Moved Forward");
    }

    public MoveBackward(): void {
        this.position.moveBackward(this.map);
        this.logState("Moved Backward");
    }

    public TurnLeft(): void {
        this.position.turnLeft();
        this.logState("Turned Left");
    }

    public TurnRight(): void {
        this.position.turnRight();
        this.logState("Turned Right");
    }

    private logState(action: string): void {
        const { x, y, direction } = this.position.getState();
        console.log(`[Rover] ${action} → Position: (${x}, ${y}) | Facing: ${direction}`);
    }
    
}
