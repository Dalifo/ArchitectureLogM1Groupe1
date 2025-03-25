# Mars Rover Project

![Mars Rover](https://lejournal.cnrs.fr/sites/default/files/styles/visuel_principal/public/assets/images/perseverance_mars_vp.jpg)

## Schéma d'architecture

![Schéma d'architecture](./public/Schéma%20Groupe%201.png)

## Description

Le **Mars Rover Project** est une simulation logicielle en TypeScript qui reproduit les mouvements d'un rover explorant la surface de Mars. Le rover peut se déplacer sur une grille représentant la surface martienne, et peut tourner, avancer ou reculer selon des commandes fournies par l'utilisateur. 

Le but de ce projet est de simuler des algorithmes de navigation, de gestion d'obstacles, et de traitement de données sur un environnement extraterrestre.

## Fonctionnalités

- Déplacement du rover dans les directions nord, sud, est et ouest.
- Gestion des commandes de rotation gauche/droite.
- Simulation d'une surface martienne sous forme de grille avec obstacles.
- Système de gestion des collisions et détection d'obstacles.
- Mode de simulation par étapes avec affichage de la position actuelle du rover.
- Suivi et enregistrement des coordonnées et du parcours du rover.
- Interface web via WebSockets pour visualiser et contrôler le rover.
- Interface en ligne de commande pour visualiser et contrôler le rover.

## Prérequis

Assurez-vous d'avoir les éléments suivants installés sur votre machine :

- [Node.js](https://nodejs.org/) (version 14+)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- Un éditeur de code (Visual Studio Code recommandé)

## Installation

1. Clonez ce dépôt sur votre machine locale :

   ```bash
   git clone https://github.com/Dalifo/ArchitectureLogM1Groupe1.git
   ```
   
2. Accédez au répertoire du projet :
    ```bash
    cd ArchitectureLogM1Groupe1
    ```

3. Installez les dépendances du projet :

    ```bash
    npm install
    ```

4. Lancez la simulation :
    ```bash
   npx run start
    ```

## Utilisation
Une fois que la simulation est démarrée, vous pouvez interagir avec le rover de deux façons :

### Via l'interface en ligne de commande
Une fenêtre CMD devrait s'ouvrir. Vous pouvez alors entrer une série de commandes. Les commandes possibles sont les suivantes :

- ```F``` : Avancer d'une case
- ```B``` : Reculer d'une case
- ```L``` : Tourner à gauche
- ```R``` : Tourner à droite

Exemple
Supposons que vous vouliez que le rover avance de 3 cases, tourne à droite, puis avance encore de 2 cases. Vous pourriez entrer la séquence suivante dans la console :

```nginx
FFF R FF
```

Le rover va se déplacer en fonction des commandes entrées, et la console affichera la nouvelle position du rover.

### Via l'interface web
Le projet utilise des WebSockets pour permettre une interaction via navigateur web :

- http://localhost:3000 : Accès visuel et contrôle du rover (géré par ActiveListener)
- http://localhost:3000/map : Accès à la carte actuelle
- http://localhost:3001 : Interface passive pour la surveillance (géré par PassiveListener)

## Arborescence du projet
```bash
ArchitectureLogM1Groupe1/
├── public/                     # Dossier contenant les fichiers publics
├── src/
│   ├── missionControl/         # Dossier du module MissionControl
│   │   ├── MissionControl.ts
│   ├── networkCommunication/   # Dossier du module NetworkCommunication
│   │   ├── ActiveListener.ts   # Gestion du serveur WebSocket sur port 3000
│   │   ├── PassiveListener.ts  # Gestion du serveur WebSocket sur port 3001
│   │   ├── TerminalControl.ts  # Gestion du lancement du terminal de contrôle
│   │   ├── TerminalControlListening.ts  # Gestion de l'écoute du terminal de contrôle à l'aide des websockets
│   ├── rover/                  # Dossier du module Rover
│   │   ├── IMap.ts
│   │   ├── IRover.ts
│   │   ├── IRoverState.ts
│   │   ├── Map.ts
│   │   ├── Orientation.ts
│   │   ├── Rover.ts
│   ├── main.ts                 # Fichier principal
├── tests/                      # Dossier contenant les tests
├── jest.config.js              # Fichier de configuration de jest
├── package.json                # Fichier de configuration du projet
├── README.md              
└── tsconfig.json               # Configuration du typescript
```

## Tests
Pour exécuter les tests unitaires du projet, utilisez la commande suivante :

```bash
npm run test
```
Les tests sont écrits avec Jest et couvrent la logique de navigation et de gestion des obstacles.

## Technologies utilisées
- TypeScript : Langage principal utilisé pour écrire le projet.
- Jest : Framework pour les tests unitaires.
- WebSockets : Communication en temps réel entre le serveur et les clients web.
- Express : Framework web pour servir l'interface utilisateur.

## Auteurs
- Florian MONDAUT
- Victor DALAMEL DE BOURNET
- Charline HEUGUET
- Vincent-Antoine COMPARATO
- Lucas GILLET

## Licence
Ce projet est sous licence MIT - voir le fichier LICENSE pour plus de détails.