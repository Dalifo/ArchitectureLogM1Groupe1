// OBJET VALEUR car defini par ses attributs, immuable et pas d'identité unique


// L'énumération `Orientation` représente les quatre directions cardinales
// sous forme de valeurs littérales (`N` pour North, `E` pour East, etc.).
// Cela permet une meilleure lisibilité et évite les erreurs dues à des valeurs arbitraires.
export enum Orientation {
    North = "N",
    East = "E",
    South = "S",
    West = "W"
}

// La fonction `rotateLeft` permet de faire pivoter une orientation vers la gauche 
// (sens antihoraire). Par exemple, `North` devient `West`, `West` devient `South`, etc.
// Cela est réalisé avec un `switch` qui renvoie la nouvelle orientation correspondante.

//Niveau Intermediaire dans le cadre d'un rover (car c'est une brique reutilisable)
export function rotateLeft(orientation: Orientation): Orientation {
    switch (orientation) {
        case Orientation.North: return Orientation.West;
        case Orientation.West: return Orientation.South;
        case Orientation.South: return Orientation.East;
        case Orientation.East: return Orientation.North;
    }
}

// La fonction `rotateRight` effectue l'opération inverse de `rotateLeft`.
// Elle fait pivoter une orientation vers la droite (sens horaire). Par exemple, 
// `North` devient `East`, `East` devient `South`, etc.
// Comme pour `rotateLeft`, un `switch` est utilisé pour retourner la nouvelle direction.

//Niveau Intermediaire dans le cadre d'un rover (car c'est une brique reutilisable)
export function rotateRight(orientation: Orientation): Orientation {
    switch (orientation) {
        case Orientation.North: return Orientation.East;
        case Orientation.East: return Orientation.South;
        case Orientation.South: return Orientation.West;
        case Orientation.West: return Orientation.North;
    }
}


//Ce sont des fonctions intermédiaires car elles encapsulent
//une petite logique réutilisable qui sera utilisée par des fonctions de plus haut niveau.