import { IRoverState } from "./IRoverState.js";
import { Position } from "./Map.js";

export interface IRover {
    moveForward(): IRoverState;
    moveBackward(): IRoverState;
    turnLeft(): IRoverState;
    turnRight(): IRoverState;
    getPosition(): Position;
}
