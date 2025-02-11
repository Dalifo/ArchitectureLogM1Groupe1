import { IMap } from "../interfaces/IMap";

// La classe `Map` représente une carte rectangulaire sur laquelle évolue un rover.
// Elle définit les dimensions de la carte et fournit une fonctionnalité de "toric wrapping",
// permettant au rover de traverser les bords et d'apparaître de l'autre côté (effet de carte torique).
export class Map implements IMap {
    private readonly width: number;  // Largeur de la carte (en unités)
    private readonly height: number; // Hauteur de la carte (en unités)

    // Le constructeur initialise la carte avec une largeur et une hauteur définies.
    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    // Retourne la largeur de la carte.
    getWidth(): number {
        return this.width;
    }

    // Retourne la hauteur de la carte.
    getHeight(): number {
        return this.height;
    }

    // La méthode `wrapPosition` gère le déplacement d'un rover au-delà des limites de la carte.
    // Si un rover dépasse un bord, il réapparaît de l'autre côté (effet torique).
    // L'opération `(x + width) % width` permet d'assurer que les coordonnées restent dans les limites.
    wrapPosition(x: number, y: number): { x: number; y: number } {
        return {
            x: (x + this.width) % this.width,
            y: (y + this.height) % this.height
        };
    }
}
