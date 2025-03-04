import { Orientation } from "../models/Orientation.js";

export interface IRoverState {
    getOrientation(): Orientation;
    obstacleDetected: boolean;
}