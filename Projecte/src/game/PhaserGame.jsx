// PhaserGame.jsx
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { EventBus } from './EventBus';

const PhaserGame = ({ gameInstance }) => {
    const gameContainer = document.querySelector('#game-container');
    if (gameContainer){
    gameContainer.style.display = 'block';

    }
    useEffect(() => {

        const currentSceneReadyHandler = (currentScene) => {
            // Manejar la escena actualizada
        };

        EventBus.on('current-scene-ready', currentSceneReadyHandler);

        return () => {
            EventBus.removeListener('current-scene-ready', currentSceneReadyHandler);
        };
    }, [gameInstance]);


    return <div id='game-page'></div>;
};

// Props definitions
PhaserGame.propTypes = {
    gameInstance: PropTypes.object.isRequired, // Asegúrate de que gameInstance sea una instancia de Phaser
};

export default PhaserGame;
