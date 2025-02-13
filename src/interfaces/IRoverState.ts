import { Orientation } from "../models/Orientation";

export interface IRoverState {
    getPositionX(): number;
    getPositionY(): number;
    getOrientation(): Orientation;
    obstacleDetected: boolean;
}