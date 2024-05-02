import Phaser from 'phaser';
import AuthService from '../../auth/AuthService';
import { cloneElement } from 'react';
let positionData
let startscene1 = false
let startscene2 = false
let collectedItems



export default class LoadingScene extends Phaser.Scene {

    showCollectedItems = async () => {
    try {
        collectedItems = await AuthService.getCollectedItems();
        // Verificar si se recibieron los items recolectados por el usuario
        if (collectedItems) {
            startscene1 = true
            // Hacer algo con los items recolectados, como mostrarlos en el juego
        } else {
            console.log("No se recibieron los items recolectados del usuario");
        }
    } catch (error) {
        console.error('Error al obtener los items recolectados del usuario:', error);
    }
};


    showPosition = async () => {
        try {
            positionData = await AuthService.getPosition();
            // Verificar si se recibió la posición del usuario
            if (positionData) {

                
                startscene2 = true
                // Hacer algo con las coordenadas x e y y el nombre de la escena
    
            } else {
                console.log("No se recibió la posición del usuario");
            }
        } catch (error) {
            console.error('Error al obtener la posición del usuario:', error);
        }
    };

    constructor() {
        super({ key: 'LoadingScene' });
    }

    preload(){
        this.showPosition()
        this.showCollectedItems()
        // Configura el fondo negro
        this.cameras.main.setBackgroundColor('#000000');

        // Configura el texto de carga
        const loadingText = this.add.text(
            this.cameras.main.width / 2, 
            this.cameras.main.height / 2, 
            'Loading...', 
            { font: '48px Arial', fill: '#ffffff' }
        );
        loadingText.setOrigin(0.5);

    }
    create(){

    }
    update(){
        console.log(startscene1, startscene2)
        if (startscene1 && startscene2){
            console.log(positionData,collectedItems)
            this.scene.start('MainScene', { positionData, collectedItems });
        }

    }
}
