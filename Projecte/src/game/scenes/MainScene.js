import { Scene } from 'phaser';
import SaveConfirmationDialog from '../components/SaveConfirmationDialog';
import AuthService from '../../auth/AuthService';
let player = ""
let count = 0
let pie ="izquierdo"
let UserFissurial
let Fissurials
let move = true

var battle2
var battle1
var backgroundMusic

export default class MainScene extends Scene {

    items = [];

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    collectItem(player, item, collider) {
        // Obtener las coordenadas del jugador y del ítem
        const playerTileX = Math.floor(player.x / this.map.tileWidth);
        const playerTileY = Math.floor(player.y / this.map.tileHeight);
        const itemTileX = Math.floor(item.x / this.map.tileWidth);
        const itemTileY = Math.floor(item.y / this.map.tileHeight);
    
        // Dirección en la que el jugador está mirando
        const playerDirection = player.looking;
    
        // Verificar si el jugador está en una posición adyacente al ítem
        const isAdjacent = (
            (playerDirection === "up" && playerTileX === itemTileX && playerTileY === itemTileY + 1) ||
            (playerDirection === "down" && playerTileX === itemTileX && playerTileY === itemTileY - 1) ||
            (playerDirection === "left" && playerTileX === itemTileX + 1 && playerTileY === itemTileY) ||
            (playerDirection === "right" && playerTileX === itemTileX - 1 && playerTileY === itemTileY)
        );
    
        // Verificar si se ha pulsado la tecla Q
        const qKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        if (isAdjacent && Phaser.Input.Keyboard.JustDown(qKey) && item.collected == false) {
            // Destruir el ítem
            item.destroy();
            item.collected = true
            AuthService.updateBackpack(item.id, 1);
            AuthService.storeCollectedItem(item.id);
            AuthService.updatePosition(player.x, player.y, 1);
            // Eliminar la colisión entre el jugador y el ítem
            this.physics.world.removeCollider(collider);
            // Realizar cualquier otra acción que desees al recoger el ítem
            // Por ejemplo, aumentar la cantidad de ítems recolectados, etc.
        }
    }

    handleDialogClose() {
        this.dialogOpen = false;
    }
    
    getPlayerCoordinates() {
        return { x: player.x, y: player.y };
    }
    

    tryMovePlayer(deltaX, deltaY) {
        const nextX = player.x + deltaX;
        const nextY = player.y + deltaY;
    
        const tileX = Math.floor(nextX / this.map.tileWidth);
        const tileY = Math.floor(nextY / this.map.tileHeight);
        const tile = this.map.getTileAt(tileX, tileY, true, 'Colliders');
        
        // Verificar si el jugador y el objeto "potions" están en la misma posición


        let overlapWithAnyObject = false;
    
        // Verifica la superposición con cada objeto en el array
        for (const obj of this.items) {
            if (!obj.collected) {
                const overlap = (Math.floor(obj.x / this.map.tileWidth) === tileX && Math.floor(obj.y / this.map.tileHeight) === tileY);
                if (overlap) {
                    overlapWithAnyObject = true;
                    break; // Si hay superposición con algún objeto, se detiene el bucle
                }
            }
        }
        if ((!tile || !tile.collides) && !overlapWithAnyObject) {
            this.movePlayer(deltaX, deltaY);
        }
    }
    
    
    tryMovePlayerRun(deltaX, deltaY) {
        const nextX = player.x + deltaX;
        const nextY = player.y + deltaY;
    
        const tileX = Math.floor(nextX / this.map.tileWidth);
        const tileY = Math.floor(nextY / this.map.tileHeight);
        const tile = this.map.getTileAt(tileX, tileY, true, 'Colliders');

        let overlapWithAnyObject = false;
    
        // Verifica la superposición con cada objeto en el array
        for (const obj of this.items) {
            if (!obj.collected) {
                const overlap = (Math.floor(obj.x / this.map.tileWidth) === tileX && Math.floor(obj.y / this.map.tileHeight) === tileY);
                if (overlap) {
                    overlapWithAnyObject = true;
                    break; // Si hay superposición con algún objeto, se detiene el bucle
                }
            }
        }
    
        if ((!tile || !tile.collides) && !overlapWithAnyObject) {
            this.movePlayerRun(deltaX, deltaY);
        }
    }

    createItems() {
        // Iterar sobre los elementos de MapItemCords
        this.MapItemCords.forEach(cord => {
            // Verificar si el ID del elemento está presente en collectedItems
            const isCollected = this.collectedItems.some(item => item.map_item_id == cord.id);
    
            // Si el elemento no está en collectedItems, crear el objeto en la escena
            if (isCollected == false) {
                const newItem = this.createItem(cord.id, cord.x, cord.y, `item_${cord.id}`, cord.route);
                newItem.collected = false;
                newItem.setDepth(8);
    
                // Reproducir la animación correspondiente si es necesario
                if (cord.id === 3) {
                    newItem.anims.play("potion2");
                } else if (cord.id === 4) {
                    newItem.anims.play("potion3");
                } else if (cord.id === 5) {
                    newItem.anims.play("potion4");
                }
            }
        });
    }
    
    
    createItem(id, x, y, itemName, route) {
        // Crea el objeto en la escena en las coordenadas especificadas
        // y con el nombre único proporcionado
        let newItem
        newItem = this.physics.add.sprite(x, y, route).setName(itemName);
        newItem.id = id
        this.items.push(newItem)

        // Configura cualquier otra propiedad del objeto según necesites
        // Por ejemplo:
        return newItem;
    }

    stopBattleMusic(loose) {
        if (battle2.isPlaying){
            battle2.stop();
        } else if (battle1.isPlaying){
            battle1.stop();
        }
        backgroundMusic.play();
        if (loose){
            console.log(loose, "looose")
            player.body.position.x = 632;
            player.body.position.y = 464;
            this.tweens.add({
                targets: player,
                x: 632,
                y: 464,
                duration: 0
            });
        } else {
            AuthService.updateWallet(250)
        }
        this.time.delayedCall(500, () => {
            AuthService.updatePosition(player.x, player.y, 1);
        });
    }

    movePlayer(deltaX, deltaY) {
        if (move == true) {
            this.canMove = false; 
            this.tweens.add({
                targets: player,
                x: player.x + deltaX,
                y: player.y + deltaY,
                duration: 300, 
                onComplete: () => {
                    
                    const playerTileX = Math.floor(player.x / this.map.tileWidth);
                    const playerTileY = Math.floor(player.y / this.map.tileHeight);
                    const grass = this.map.getTileAt(playerTileX, playerTileY, true, 'Longgrass');
                
                    // Si el jugador está sobre la Longgrass y no hay un diálogo abierto
                    if (grass && grass.index !== -1 && !this.dialogOpen) {
            
                        const pelea = this.getRandomInt(4)
                        console.log(pelea)
                        // Iniciar la escena de batalla
                        if (pelea==3){
                            move = false
                            this.scene.pause('MainScene')
                            backgroundMusic.stop();
                            battle1.play();
                            battle1.on('complete', () => {
                                battle2.play();
                            });
            
                            this.scene.launch('BattleScene', { UserFissurial, Fissurials, previousScene: this.scene });
            
                        }
                    }

                    console.log(player.x, player.y)
                    this.canMove = true;
                    if (pie == "izquierdo"){
                        pie = "derecho"
                    }else if (pie == "derecho"){
                        pie = "izquierdo"
                    }
                    
                }
            });
        }
        move = true
    }
    movePlayerRun(deltaX, deltaY) {
        if (move == true) {
            this.canMove = false;
            this.tweens.add({
                targets: player,
                x: player.x + deltaX,
                y: player.y + deltaY,
                duration: 180,
                onComplete: () => {
                    const playerTileX = Math.floor(player.x / this.map.tileWidth);
                    const playerTileY = Math.floor(player.y / this.map.tileHeight);
                    const grass = this.map.getTileAt(playerTileX, playerTileY, true, 'Longgrass');
                
                    // Si el jugador está sobre la Longgrass y no hay un diálogo abierto
                    if (grass && grass.index !== -1 && !this.dialogOpen) {
            
                        const pelea = this.getRandomInt(4)
                        console.log(pelea)
                        // Iniciar la escena de batalla
                        if (pelea==3){
                            move = false
                            this.scene.pause('MainScene')
                            backgroundMusic.stop();
                            battle1.play();
                            battle1.on('complete', () => {
                                battle2.play();
                            });
            
                            this.scene.launch('BattleScene', { UserFissurial, Fissurials, previousScene: this.scene });
            
                        }
                    }
                    this.canMove = true;
                    if (pie == "izquierdo"){
                        pie = "derecho"
                    }else if (pie == "derecho"){
                        pie = "izquierdo"
                    }
                    
                }
            });
        }
        move = true

    }

    constructor() {
        super('MainScene');
        this.moveDistance = 16;
        this.canMove = true;
        this.collectibleObjects = [];
        this.dialogOpen = false;
    }
    
    init(data) {
        // Accede a positionData desde los datos iniciales de la escena
        const positionData = data.positionData;
        console.log(positionData);
        this.positionData = positionData;
        this.collectedItems = data.collectedItems;
        this.MapItemCords = data.MapItemCords;
        this.userFissurial = data.userFissurial;
        this.Fissurials = data.Fissurials;

    }

    preload() {
        console.log(this.userFissurial)
        UserFissurial = this.userFissurial[0];
        Fissurials = this.Fissurials;
        console.log(UserFissurial, UserFissurial.id, UserFissurial.fissurial.name)

        this.load.audio('backgroundMusic', 'assets/far_away_town.mp3');
        this.load.audio('battle1', 'assets/battle.mp3');
        this.load.audio('battle2', 'assets/battle2.mp3');
        this.cameras.main.setBackgroundColor('#000000');
        // Carga del tileset y del archivo JSON del mapa
        this.load.image('tileset', 'assets/fullextruded2.png');
        this.load.tilemapTiledJSON('map', 'assets/Far_Away_Town.tmj');

        this.load.spritesheet('prota',
        'assets/Prota.png',
        { frameWidth: 32, frameHeight: 32, }
        );
        this.load.spritesheet('potions',
        'assets/potions.png',
        { frameWidth: 16, frameHeight: 16, }
        );
        this.load.spritesheet('fruits',
        'assets/fruits.png',
        { frameWidth: 16, frameHeight: 16, }
        );
    }

    create() {

        this.saveConfirmationDialog = new SaveConfirmationDialog(this);      
        backgroundMusic = this.sound.add('backgroundMusic', { loop: true });
        battle1 = this.sound.add('battle1', { loop: false });
        battle2 = this.sound.add('battle2', { loop: true });

        // Iniciar la reproducción de la música de fondo
        backgroundMusic.play();

        // Creación del mapa basado en el archivo JSON cargado
        const map = this.make.tilemap({ key: 'map' });
        this.map = map;
        const tileset = map.addTilesetImage('tilemap32x32', 'tileset', 16, 16, 1, 2);

        // Capas del mapa
        const GroundLayer = map.createLayer('Ground', tileset, -256, -256).setDepth(0);
        const DecorsLayer = map.createLayer('Decors', tileset, 256, 0).setDepth(8);
        const HousesLayer = map.createLayer('Houses', tileset, 0, 0).setDepth(7);
        const Tree1Layer = map.createLayer('Tree1', tileset, -256, -256).setDepth(6);
        const Tree2Layer = map.createLayer('Tree2', tileset, -256, -256).setDepth(5);
        const Tree3Layer = map.createLayer('Tree3', tileset, -256, -256).setDepth(4);
        const LonggrassLayer = map.createLayer('Longgrass', tileset, 0, 0).setDepth(3);
        const Houses2Layer = map.createLayer('Houses2', tileset, 256, ).setDepth(2);
        const AguaLayer = map.createLayer('Agua', tileset, 0, 0).setDepth(1);
        const ColliderLayer = map.createLayer('Colliders', tileset, 0, 0).setDepth(-1);
        const OverlapLayer = map.createLayer('Overlap', tileset, 0, 0).setDepth(10);
        const Overlap2Layer = map.createLayer('Overlap2', tileset, 256, 256).setDepth(10);

        player = this.physics.add.sprite(player.x,player.y,'prota')
        const { x, y, scene } = this.positionData;
        player.x = x
        player.y = y
        console.log("Usuari creat a la posició " + x + ", "+ y)



        // potions = this.physics.add.sprite(264,472,'potions');
        // potion2 = this.physics.add.sprite(504,312,'potions');
        // potion3 = this.physics.add.sprite(584,456,'potions');
        // potion4 = this.physics.add.sprite(200,152,'potions');
        // fruits = this.physics.add.sprite(408,120,'fruits');

        // const Items = [potions,fruits,potion2, potion3, potion4];

        // for (const Item of Items) {
        //     Item.collected = false
        //     Item.setDepth(8);
        // }
        // potions.id = 1
        // fruits.id = 2
        // potion2.id = 3
        // potion3.id = 4
        // potion4.id = 5
        
        player.setDepth(9);
        this.cameras.main.setZoom(3);
        this.cameras.main.startFollow(player);
        this.cameras.main.roundPixels = true;
        map.setCollisionBetween(1, 1000, true, 'Colliders');
        ColliderLayer.setCollisionByExclusion([-1]);
        this.physics.add.collider(player, ColliderLayer);



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

        this.anims.create({
            key: 'potion2',
            frames: [{ key: 'potions', frame: 1 }], // Cambia 'sprite_sheet' por el nombre de tu hoja de sprites y 0 por el número de frame que deseas reproducir
            frameRate: 1, // Establece el frameRate en 1 para que el frame se reproduzca solo una vez
        });
        this.anims.create({
            key: 'potion3',
            frames: [{ key: 'potions', frame: 2 }], // Cambia 'sprite_sheet' por el nombre de tu hoja de sprites y 0 por el número de frame que deseas reproducir
            frameRate: 1, // Establece el frameRate en 1 para que el frame se reproduzca solo una vez
        });
        this.anims.create({
            key: 'potion4',
            frames: [{ key: 'potions', frame: 3 }], // Cambia 'sprite_sheet' por el nombre de tu hoja de sprites y 0 por el número de frame que deseas reproducir
            frameRate: 1, // Establece el frameRate en 1 para que el frame se reproduzca solo una vez
        });


        this.createItems()

    }

    update() {
        var cursors = this.input.keyboard.createCursorKeys();
        var shiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        for (const Item of this.items) {
            this.collectItem(player, Item);
        }
        const sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        if (sKey.isDown && !this.dialogOpen && this.canMove) {
            // Acciones a realizar cuando la tecla S es presionada
            console.log('Tecla S presionada');
            // Agrega aquí la lógica que deseas ejecutar cuando la tecla S sea presionada
            this.dialogOpen = true

            this.saveConfirmationDialog.show();
        }
        if (this.canMove && !this.dialogOpen) {
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
