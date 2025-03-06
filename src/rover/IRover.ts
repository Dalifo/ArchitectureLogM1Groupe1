import { IRoverState } from "./IRoverState.js";

export interface IRover {
    moveForward(): IRoverState;
    moveBackward(): IRoverState;
    turnLeft(): IRoverState;
    turnRight(): IRoverState;
    getPosition(): { x: number; y: number };
}
