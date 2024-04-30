import Phaser from 'phaser';
import AuthService from '../../auth/AuthService';
let positionData



export default class LoadingScene extends Phaser.Scene {

    showPosition = async () => {
        try {
            const positionData = await AuthService.getPosition();
            // Verificar si se recibió la posición del usuario
            if (positionData) {

                
                this.scene.start('MainScene', { positionData });
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

    }
}
