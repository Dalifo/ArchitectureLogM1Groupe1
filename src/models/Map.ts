import { IMap } from "../interfaces/IMap";
// ENTITE car possede un état (dimension et obstacle) et un comportement (gestion du déplacement, verif des obstacles)


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

    public getNextValidPosition(x: number, y: number, newX: number, newY: number): { x: number; y: number; obstacle: boolean } {
        const wrappedPosition = this.wrapPosition(newX, newY);
        
        if (this.isObstacle(wrappedPosition.x, wrappedPosition.y)) {
            return { x, y, obstacle: true }; // Reste sur place si obstacle détecté
        }
        
        return { x: wrappedPosition.x, y: wrappedPosition.y, obstacle: false };
    }
}
