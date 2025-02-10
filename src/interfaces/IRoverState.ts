import { Orientation } from "../models/Orientation";

export interface IRoverState {
    GetPositionX(): number;
    GetPositionY(): number;
    GetOrientation(): Orientation;
}