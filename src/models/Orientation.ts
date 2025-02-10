export enum Orientation {
    North = "N",
    East = "E",
    South = "S",
    West = "W"
}

export function rotateLeft(orientation: Orientation): Orientation {
    switch (orientation) {
        case Orientation.North: return Orientation.West;
        case Orientation.West: return Orientation.South;
        case Orientation.South: return Orientation.East;
        case Orientation.East: return Orientation.North;
    }
}

export function rotateRight(orientation: Orientation): Orientation {
    switch (orientation) {
        case Orientation.North: return Orientation.East;
        case Orientation.East: return Orientation.South;
        case Orientation.South: return Orientation.West;
        case Orientation.West: return Orientation.North;
    }
}
