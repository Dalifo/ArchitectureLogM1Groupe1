import { Orientation } from "../models/Orientation";

export interface IRoverState {
    getOrientation(): Orientation;
    obstacleDetected: boolean;
}