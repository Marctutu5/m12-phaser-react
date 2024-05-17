import Phaser from 'phaser';
import AuthService from '../../auth/AuthService';
import { cloneElement } from 'react';
let startscene1 = false
let startscene2 = false
let startscene3 = false
let startscene4 = false
let startscene5 = false
let positionData = undefined
let collectedItems = undefined
let MapItemCords = undefined
let userFissurial = undefined
let Fissurials = undefined

export default class LoadingScene extends Phaser.Scene {

    reset(){
        startscene1 = false
        startscene2 = false
        startscene3 = false
        startscene4 = false
        startscene5 = false
        positionData = undefined
        collectedItems = undefined
        MapItemCords = undefined
        userFissurial = undefined
        Fissurials = undefined
    };

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

    showMapItemCords = async () => {
        try {
            MapItemCords = await AuthService.getMapItemCords();
            // Verificar si se recibieron los items recolectados por el usuario
            if (MapItemCords) {
                startscene3 = true
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

    getUserFissurial = async () => {
        try {
            userFissurial = await AuthService.getUserFissurial();
            // Verificar si se recibió la posición del usuario
            if (userFissurial) {

                
                startscene4 = true
                // Hacer algo con las coordenadas x e y y el nombre de la escena
    
            } else {
                console.log("No se recibió el fissurial");
            }
        } catch (error) {
            console.error('Error al obtener el fissurial:', error);
        }
    };

    getAllFissurials = async () => {
        try {
            console.log('fis',Fissurials)
            Fissurials = await AuthService.getFissurials();
            // Verificar si se recibió la posición del usuario
            if (Fissurials) {

                
                startscene5 = true
                // Hacer algo con las coordenadas x e y y el nombre de la escena
    
            } else {
                console.log("No se recibió el fissurial");
            }
        } catch (error) {
            console.error('Error al obtener el fissurial:', error);
        }
    };


    constructor() {
        super({ key: 'LoadingScene' });
    }

    preload(){

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
        console.log('entra create loading scene')
        this.reset()
        // API
        this.showPosition()
        this.showCollectedItems()
        this.getAllFissurials()
        this.showMapItemCords()
        this.getUserFissurial()
    }
    update(){
        console.log(startscene1, startscene2, startscene3, startscene4, startscene5)
        if (startscene1 && startscene2 && startscene3 && startscene4 && startscene5){
            console.log(positionData,collectedItems, MapItemCords, Fissurials)
            this.scene.start('MainScene', { positionData, collectedItems, MapItemCords, userFissurial, Fissurials });
            
        }

    }
}
