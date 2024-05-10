// main.js

import MainScene from './scenes/MainScene';
import LoadingScene from './scenes/LoadingScene';
import BattleScene from './scenes/BattleScene';
import Phaser from 'phaser';

let gameInstance = null; // Mantén una referencia global para la instancia del juego

const config = {
    type: Phaser.AUTO,
    width: 1500,
    height: 700,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scene: [
        LoadingScene,
        MainScene,
        BattleScene
    ],
    physics:{
        default: 'arcade',
        arcade: {
          gravity: { y: 0 }
        }
    }
};

const StartGame = (parent) => {
    if (!gameInstance) {
        // Crea el juego solo si la instancia no existe
        gameInstance = new Phaser.Game({ ...config, parent });
    }
    return gameInstance;
}

export default StartGame;
