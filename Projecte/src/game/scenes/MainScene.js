import { Scene } from 'phaser';

export default class MainScene extends Scene {
    constructor() {
        super('MainScene');
    }

    preload() {
        // Carga del tileset y del archivo JSON del mapa
        this.load.image('tileset', 'assets/tilemap32x32.png');
        this.load.tilemapTiledJSON('map', 'assets/Far_Away_Town.tmj');
    }

    create() {
        // Creación del mapa basado en el archivo JSON cargado
        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('tilemap32x32', 'tileset');

        // Capas del mapa
        const GroundLayer = map.createLayer('Ground', tileset, 0, 0).setDepth(0);
        const DecorsLayer = map.createLayer('Decors', tileset, 256, 0).setDepth(8);
        const HousesLayer = map.createLayer('Houses', tileset, 0, 0).setDepth(7);
        const Tree1Layer = map.createLayer('Tree1', tileset, -256, 0).setDepth(6);
        const Tree2Layer = map.createLayer('Tree2', tileset, -256, 0).setDepth(5);
        const Tree3Layer = map.createLayer('Tree3', tileset, 0, 0).setDepth(4);
        const LonggrassLayer = map.createLayer('Longgrass', tileset, 0, 0).setDepth(3);
        const Houses2Layer = map.createLayer('Houses2', tileset, 256, 0).setDepth(2);
        const AguaLayer = map.createLayer('Agua', tileset, 0, 0).setDepth(1);

        this.cameras.main.setZoom(3);





    }
}
