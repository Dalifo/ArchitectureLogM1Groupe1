import { IRoverState } from "./IRoverState";

export interface IRover {
    moveForward(): IRoverState;
    moveBackward(): IRoverState;
    turnLeft(): IRoverState;
    turnRight(): IRoverState;
}
