import { Orientation } from "./Orientation.js";

export interface IRoverState {
    getOrientation(): Orientation;
    obstacleDetected: boolean;
}