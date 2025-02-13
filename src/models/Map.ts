import { IMap } from "../interfaces/IMap";

// La classe `Map` représente une carte rectangulaire sur laquelle évolue un rover.
// Elle définit les dimensions de la carte et fournit une fonctionnalité de "toric wrapping",
// permettant au rover de traverser les bords et d'apparaître de l'autre côté (effet de carte torique).
export class Map implements IMap {
    private readonly width: number;  // Largeur de la carte (en unités)
    private readonly height: number; // Hauteur de la carte (en unités)
    private readonly obstacles: Set<string>; 

    // Le constructeur initialise la carte avec une largeur et une hauteur définies.
    constructor(width: number, height: number, obstacles: { x: number, y: number }[] = []) {
        this.width = width;
        this.height = height;
        this.obstacles = new Set(obstacles.map(({ x, y }) => `${x},${y}`)); 
    }
    
    // Retourne la largeur de la carte.
    getWidth(): number {
        return this.width;
    }

    // Retourne la hauteur de la carte.
    getHeight(): number {
        return this.height;
    }

    // Calcule proprement un modulo malgré JS
    private modulo(num: number, mod: number): number {
        const valeurRéduiteSignée = (num % mod) % -mod;
        const valeurNonSignée = valeurRéduiteSignée + mod;
        return valeurNonSignée % mod;
    }

    // Vérifie si la position contient un obstacle
    public isObstacle(x: number, y: number): boolean {
        return this.obstacles.has(`${x},${y}`);
    }

    // La méthode `wrapPosition` gère le déplacement d'un rover au-delà des limites de la carte.
    // Utilise `this.modulo` pour éviter les problèmes avec les valeurs négatives.
    wrapPosition(x: number, y: number): { x: number; y: number } {
        return {
            x: this.modulo(x, this.width),
            y: this.modulo(y, this.height)
        };
    }
}
