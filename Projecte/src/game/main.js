import MainScene from './scenes/MainScene';
import Phaser from 'phaser';

// Find out more information about the Game Config at:
// https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    width: 1500,
    height: 700,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scene: [
        MainScene
    ],
    physics:{
        default: 'arcade',
        arcade: {
          gravity: { y: 0 }
        }
    }
};

const StartGame = (parent) => {

    return new Phaser.Game({ ...config, parent });

}

export default StartGame;
