import { IRoverState } from "./IRoverState";

export interface IRover {
    MoveForward(): IRoverState;
    MoveBackward(): IRoverState;
    TurnLeft(): IRoverState;
    TurnRight(): IRoverState;
}
