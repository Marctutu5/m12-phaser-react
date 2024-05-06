import { Scene } from 'phaser';
import SaveConfirmationDialog from '../components/SaveConfirmationDialog';
import AuthService from '../../auth/AuthService';
let player = ""
let count = 0
let pie ="izquierdo"


export default class MainScene extends Scene {

    items = [];

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
    
    createItem(id, x, y, itemName, itemSprite) {
        // Crea el objeto en la escena en las coordenadas especificadas
        // y con el nombre único proporcionado
        let newItem
        if (id == 1 || id == 3 || id == 4 || id == 5){
        newItem = this.physics.add.sprite(x, y, 'potions').setName(itemName);
        console.log(x,y)
        console.log("añadido sprite", newItem)
        }else if (id == 2){
        newItem = this.physics.add.sprite(x, y, 'fruits').setName(itemName);
        } else{
            console.log("noentra")
        }
        this.items.push(newItem)

        // Configura cualquier otra propiedad del objeto según necesites
        // Por ejemplo:
        return newItem;
    }

    movePlayer(deltaX, deltaY) {
        this.canMove = false; 
        this.tweens.add({
            targets: player,
            x: player.x + deltaX,
            y: player.y + deltaY,
            duration: 300, 
            onComplete: () => {
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
    }

    preload() {
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


        const itemsToCreate = this.collectedItems.filter(item => item.collected === 0);

        // Genera los objetos en la escena utilizando los datos de los items filtrados
        itemsToCreate.forEach(item => {
            // Crea el objeto en la escena utilizando las coordenadas del item
            // y un nombre único basado en su ID
            let mapx = 0
            let mapy = 0
            this.MapItemCords.forEach(cords => {
                if (cords.id == item.map_item_id){
                    mapx = cords.x
                    mapy = cords.y
                }

            });
            const newItem = this.createItem(item.map_item_id,mapx, mapy, `item_${item.map_item_id}`);
            // Configura la propiedad collected del objeto como false
            newItem.collected = false;
            // Establece la profundidad del objeto
            newItem.setDepth(8);
            newItem.id = item.map_item_id
            if (newItem.id == 3){
                newItem.anims.play("potion2")
            }
            if (newItem.id == 4){
                newItem.anims.play("potion3")
            }
            if (newItem.id == 5){
                newItem.anims.play("potion4")
            }
        });

        


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
