import { Rover } from '../models/Rover';
import { Orientation } from '../models/Orientation';
import { Map } from '../models/Map';

describe('Rover', () => {

    test('should move forward', () => {
        const map: Map = new Map(5, 5);
        const rover: Rover = new Rover(0, 0, Orientation.North, map);

        rover.MoveForward();
        expect(rover.getPosition()).toEqual({ x: 0, y: 1 });
    });

    test('should move forward twice', () => {
        const map: Map = new Map(5, 5);
        const rover: Rover = new Rover(0, 0, Orientation.North, map);

        rover.MoveForward();
        rover.MoveForward();
        expect(rover.getPosition()).toEqual({ x: 0, y: 2 });
    });

    test('should turn left', () => {
        const map: Map = new Map(5, 5);
        const rover: Rover = new Rover(0, 0, Orientation.North, map);

        rover.TurnLeft();
        expect(rover.getDirection()).toEqual(Orientation.West);
    });

    test('should turn right', () => {
        const map: Map = new Map(5, 5);
        const rover: Rover = new Rover(0, 0, Orientation.North, map);

        rover.TurnRight();
        expect(rover.getDirection()).toEqual(Orientation.East);
    });

    test('should move backward and teleport to the other side on the Y axis', () => {
        const map: Map = new Map(5, 5);
        const rover: Rover = new Rover(0, 0, Orientation.North, map);

        rover.MoveBackward();
        expect(rover.getPosition()).toEqual({ x: 0, y: 4 });
    });

    test('should turn right and move forward', () => {
        const map: Map = new Map(5, 5);
        const rover: Rover = new Rover(0, 0, Orientation.North, map);

        rover.TurnRight();
        rover.MoveForward();
        expect(rover.getPosition()).toEqual({ x: 1, y: 0 });
    });




    test('should turn left and move forward and teleport to the other side on the X axis', () => {
        const map: Map = new Map(5, 5);
        const rover: Rover = new Rover(0, 0, Orientation.North, map);

        rover.TurnLeft();
        rover.MoveForward();
        expect(rover.getPosition()).toEqual({ x: 4, y: 0 });
    });

    test('should go forward and teleport to the other side on Y axis', () => {
        const map: Map = new Map(5, 5);
        const rover: Rover = new Rover(0, 0, Orientation.North, map);
        
        rover.MoveForward(); // y = 1
        rover.MoveForward(); // y = 2
        rover.MoveForward(); // y = 3
        rover.MoveForward(); // y = 4
        rover.MoveForward(); // y = 0
        expect(rover.getPosition()).toEqual({ x: 0, y: 0 });
    })


    // NOUVEAUX TESTS : PARTIE OBSTACLES

    test('should process a sequence of commands and stop at an obstacle', () => {
        // Ajout d'un obstacle à la position (0, 2)
        const map: Map = new Map(5, 5, [{ x: 0, y: 2 }]);
        const rover: Rover = new Rover(0, 0, Orientation.North, map);

        // Suite de commandes: Avancer 3 fois (le rover s'arrêtera à y = 2 à cause de l'obstacle)
        rover.executeCommands('FFF');
        
        // Le rover devrait s'arrêter à y = 1 (juste avant l'obstacle)
        expect(rover.getPosition()).toEqual({ x: 0, y: 1 });

        // Le rover signale l'obstacle
        expect(rover.hasObstacle()).toBe(true);
    });

    test('should continue processing valid commands before hitting an obstacle', () => {
        // Ajout d'un obstacle à la position (2, 2)
        const map: Map = new Map(5, 5, [{ x: 2, y: 2 }]);
        const rover: Rover = new Rover(0, 0, Orientation.North, map);

        // Suite de commandes: Avancer deux fois, tourner à droite, avancer encore
        rover.executeCommands('FFRFF');

        // Le rover devrait se trouver en (2, 1) car il ne peut pas dépasser l'obstacle
        expect(rover.getPosition()).toEqual({ x: 2, y: 1 });
        
        // Le rover signale l'obstacle
        expect(rover.hasObstacle()).toBe(true);
    });

    test('should not cancel previous commands when an obstacle is encountered', () => {
        // Ajout d'un obstacle à la position (1, 1)
        const map: Map = new Map(5, 5, [{ x: 1, y: 1 }]);
        const rover: Rover = new Rover(0, 0, Orientation.East, map);

        // Suite de commandes: Tourner à droite et avancer, jusqu'à l'obstacle
        rover.executeCommands('RFF');
        
        // Le rover devrait avancer jusqu'à (1, 0) puis s'arrêter
        expect(rover.getPosition()).toEqual({ x: 1, y: 0 });

        // Une tentative d'avancer le placerait sur l'obstacle, donc il s'arrête avant
        expect(rover.hasObstacle()).toBe(true);
    });

    test('should report the position when encountering an obstacle', () => {
        // Ajout d'un obstacle à la position (3, 3)
        const map: Map = new Map(5, 5, [{ x: 3, y: 3 }]);
        const rover: Rover = new Rover(0, 0, Orientation.North, map);

        // Suite de commandes: Avancer 3 fois, tourner à droite, puis avancer vers l'obstacle
        rover.executeCommands('FFFRRFFF');

        // Le rover s'arrête à la position (3, 2) avant l'obstacle
        expect(rover.getPosition()).toEqual({ x: 3, y: 2 });

        // Le rover signale la position de l'obstacle
        expect(rover.reportObstacle()).toEqual({ x: 3, y: 3 });
    });

});
