export interface IRover {
    MoveForward(): IRoverState;
    MoveBackward(): IRoverState;
    TurnLeft(): IRoverState;
    TurnRight(): IRoverState;
}

export interface IRoverState {
    GetPositionX(): number;
    GetPositionY(): number;
    GetOrientation(): Orientation;
}

export abstract class Orientation {
}
