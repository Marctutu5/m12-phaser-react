import { Scene } from 'phaser';
let player = ""
let pie ="izquierdo"

export default class MainScene extends Scene {

    tryMovePlayer(deltaX, deltaY) {
        const nextX = player.x + deltaX;
        const nextY = player.y + deltaY;
    
        const tileX = Math.floor(nextX / this.map.tileWidth);
        const tileY = Math.floor(nextY / this.map.tileHeight);
        const tile = this.map.getTileAt(tileX, tileY, true, 'Decors');
    
        if (!tile || !tile.collides) {
            this.movePlayer(deltaX, deltaY);
        }
    }
    
    tryMovePlayerRun(deltaX, deltaY) {
        const nextX = player.x + deltaX;
        const nextY = player.y + deltaY;
    
        const tileX = Math.floor(nextX / this.map.tileWidth);
        const tileY = Math.floor(nextY / this.map.tileHeight);
        const tile = this.map.getTileAt(tileX, tileY, true, 'Decors');
    
        if (!tile || !tile.collides) {
            this.movePlayerRun(deltaX, deltaY);
        }
    }

    movePlayer(deltaX, deltaY) {
        this.canMove = false; 
        this.tweens.add({
            targets: player,
            x: player.x + deltaX,
            y: player.y + deltaY,
            duration: 300, 
            onComplete: () => {
                this.canMove = true;
                if (pie == "izquierdo"){
                    pie = "derecho"
                }else if (pie == "derecho"){
                    pie = "izquierdo"
                }
                
            }
        });
    }
    movePlayerRun(deltaX, deltaY) {
        this.canMove = false;
        this.tweens.add({
            targets: player,
            x: player.x + deltaX,
            y: player.y + deltaY,
            duration: 180,
            onComplete: () => {
                this.canMove = true;
                if (pie == "izquierdo"){
                    pie = "derecho"
                }else if (pie == "derecho"){
                    pie = "izquierdo"
                }
                
            }
        });
    }

    constructor() {
        super('MainScene');
        this.moveDistance = 16;
        this.canMove = true;
    }

    preload() {
        // Carga del tileset y del archivo JSON del mapa
        this.load.image('tileset', 'assets/tilemap32x32.png');
        this.load.tilemapTiledJSON('map', 'assets/Far_Away_Town.tmj');

        this.load.spritesheet('prota',
        'assets/Prota.png',
        { frameWidth: 32, frameHeight: 32, }
        );
    }

    create() {
        // Creación del mapa basado en el archivo JSON cargado
        const map = this.make.tilemap({ key: 'map' });
        this.map = map;
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

        player = this.physics.add.sprite(8,16,'prota')
        player.setDepth(3);
        this.cameras.main.setZoom(3);
        this.cameras.main.startFollow(player);
        map.setCollisionBetween(1, 1000, true, 'Decors');
        DecorsLayer.setCollisionByExclusion([-1]);
        this.physics.add.collider(player, DecorsLayer);


        this.anims.create({
            key: 'up_izquierdo',
            frames: [ { key: 'prota', frame: 7 }, { key: 'prota', frame: 6 } ],
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'up_derecho',
            frames: [ { key: 'prota', frame: 8 }, { key: 'prota', frame: 6 } ],
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'up_wait',
            frames: this.anims.generateFrameNumbers('prota', { start: 6, end: 6 }),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'up_derecho_run',
            frames: [ { key: 'prota', frame: 11 }, { key: 'prota', frame: 9 } ],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'up_izquierdo_run',
            frames: [ { key: 'prota', frame: 10 }, { key: 'prota', frame: 9 } ],
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right_izquierdo',
            frames: [ { key: 'prota', frame: 19 }, { key: 'prota', frame: 18 } ],
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'right_derecho',
            frames: [ { key: 'prota', frame: 20 }, { key: 'prota', frame: 18 } ],
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'right_wait',
            frames: this.anims.generateFrameNumbers('prota', { start: 18, end: 18 }),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'right_derecho_run',
            frames: [ { key: 'prota', frame: 22 }, { key: 'prota', frame: 21 } ],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'right_izquierdo_run',
            frames: [ { key: 'prota', frame: 23 }, { key: 'prota', frame: 21 } ],
            frameRate: 10,
            repeat: -1
        });


        this.anims.create({
            key: 'down_izquierdo',
            frames: [ { key: 'prota', frame: 1 }, { key: 'prota', frame: 0 } ],
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'down_derecho',
            frames: [ { key: 'prota', frame: 2 }, { key: 'prota', frame: 0 } ],
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'down_wait',
            frames: this.anims.generateFrameNumbers('prota', { start: 0, end: 0 }),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'down_derecho_run',
            frames: [ { key: 'prota', frame: 4 }, { key: 'prota', frame: 3 } ],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'down_izquierdo_run',
            frames: [ { key: 'prota', frame: 5 }, { key: 'prota', frame: 3 } ],
            frameRate: 10,
            repeat: -1
        });


        this.anims.create({
            key: 'left_izquierdo',
            frames: [ { key: 'prota', frame: 13 }, { key: 'prota', frame: 12 } ],
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'left_derecho',
            frames: [ { key: 'prota', frame: 14 }, { key: 'prota', frame: 12 } ],
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'left_wait',
            frames: this.anims.generateFrameNumbers('prota', { start: 12, end: 12 }),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'left_derecho_run',
            frames: [ { key: 'prota', frame: 16 }, { key: 'prota', frame: 15 } ],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'left_izquierdo_run',
            frames: [ { key: 'prota', frame: 17 }, { key: 'prota', frame: 15 } ],
            frameRate: 10,
            repeat: -1
        });



        





    }

    update() {
        var cursors = this.input.keyboard.createCursorKeys();
        var shiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        if (this.canMove) {
            if (cursors.left.isDown && pie == "izquierdo" && !shiftKey.isDown) {
                player.anims.play('left_izquierdo', true);
                player.looking = "left"
                this.tryMovePlayer(-this.moveDistance, 0);
            } else if (cursors.left.isDown && pie == "derecho" && !shiftKey.isDown) {
                player.anims.play('left_derecho', true);
                player.looking = "left"
                this.tryMovePlayer(-this.moveDistance, 0);
            } else if (cursors.left.isDown && pie == "izquierdo" && shiftKey.isDown) {
                player.anims.play('left_izquierdo_run', true);
                player.looking = "left"
                this.tryMovePlayerRun(-this.moveDistance, 0);
            } else if (cursors.left.isDown && pie == "derecho" && shiftKey.isDown) {
                player.anims.play('left_derecho_run', true);
                player.looking = "left"
                this.tryMovePlayerRun(-this.moveDistance, 0);

            } else if (cursors.right.isDown && pie == "izquierdo" && !shiftKey.isDown) {
                player.anims.play('right_izquierdo', true);
                player.looking = "right"
                this.tryMovePlayer(this.moveDistance, 0);
            } else if (cursors.right.isDown && pie == "derecho" && !shiftKey.isDown) {
                player.anims.play('right_derecho', true);
                player.looking = "right"
                this.tryMovePlayer(this.moveDistance, 0);
            } else if (cursors.right.isDown && pie == "izquierdo" && shiftKey.isDown) {
                player.anims.play('right_izquierdo_run', true);
                player.looking = "right"
                this.tryMovePlayerRun(this.moveDistance, 0);
            } else if (cursors.right.isDown && pie == "derecho" && shiftKey.isDown) {
                player.anims.play('right_derecho_run', true);
                player.looking = "right"
                this.tryMovePlayerRun(this.moveDistance, 0);
            } else if (cursors.up.isDown && pie == "izquierdo" && !shiftKey.isDown) {
                player.looking = "up"
                this.tryMovePlayer(0, -this.moveDistance);
                player.anims.play('up_izquierdo', true);

            } else if (cursors.up.isDown && pie == "derecho" && !shiftKey.isDown) {
                player.looking = "up"
                this.tryMovePlayer(0, -this.moveDistance);
                player.anims.play('up_derecho', true);

            } else if (cursors.up.isDown && pie == "izquierdo" && shiftKey.isDown) {
                player.looking = "up"
                this.tryMovePlayerRun(0, -this.moveDistance);
                player.anims.play('up_izquierdo_run', true);

            } else if (cursors.up.isDown && pie == "derecho" && shiftKey.isDown) {
                player.looking = "up"
                this.tryMovePlayerRun(0, -this.moveDistance);
                player.anims.play('up_derecho_run', true);

            } else if (cursors.down.isDown && pie == "izquierdo" && !shiftKey.isDown) {
                player.looking = "down"
                this.tryMovePlayer(0, this.moveDistance);
                player.anims.play('down_izquierdo', true);
            } else if (cursors.down.isDown && pie == "derecho" && !shiftKey.isDown) {
                player.looking = "down"
                this.tryMovePlayer(0, this.moveDistance);
                player.anims.play('down_derecho', true);
            } else if (cursors.down.isDown && pie == "izquierdo" && shiftKey.isDown) {
                player.looking = "down"
                this.tryMovePlayerRun(0, this.moveDistance);
                player.anims.play('down_izquierdo_run', true);
            } else if (cursors.down.isDown && pie == "derecho" && shiftKey.isDown) {
                player.looking = "down"
                this.tryMovePlayerRun(0, this.moveDistance);
                player.anims.play('down_derecho_run', true);
            } else if (player.looking == "up"){
                player.anims.play('up_wait', true);
            } else if (player.looking == "right"){
                player.anims.play('right_wait', true);
            } else if (player.looking == "left"){
                player.anims.play('left_wait', true);
            } else if (player.looking == "down"){
                player.anims.play('down_wait', true);
            }
        }
    }
}
