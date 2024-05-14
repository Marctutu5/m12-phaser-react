import { Scene } from 'phaser';

let fissurial_quant;
let enemy_fissurial;
let fissurial_random;

export default class BattleScene extends Scene {
    constructor() {
        super('BattleScene');
        this.previousScene = null;
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    makeBar(x, y, color) {
        // Dibujar la barra
        let bar = this.add.graphics();

        // Colorear la barra
        bar.fillStyle(color, 1);

        // Rellenar la barra con un rectángulo
        bar.fillRect(0, 0, 300, 25);

        // Posicionar la barra
        bar.x = x;
        bar.y = y;

        // Devolver la barra
        return bar;
    }

    setValue(bar, percentage) {
        // Escalar la barra
        bar.scaleX = percentage / 100;
    }

    init(data) {
        this.UserFissurial = data.UserFissurial;
        this.Fissurials = data.Fissurials;
        this.attackCooldown = false;
        this.previousScene = data.previousScene;
    }

    preload() {
        this.load.image('background', 'assets/background_battle.png');
        this.load.image('button', 'assets/button_battle.png');
    }

    create() {
        this.background = this.add.image(512, 256, 'background');

        // Ajustar la imagen de fondo para que cubra toda la pantalla
        this.background.displayWidth = 1980;
        this.background.displayHeight = 1080;
        this.background.setDepth(-1);

        this.enemyHealthBar = this.makeBar(1100, 100, 0x2ecc71);
        this.playerHealthBar = this.makeBar(100, 300, 0x2ecc71);  // Cambié la posición Y para que no se solapen

        this.setValue(this.enemyHealthBar, 100);
        this.setValue(this.playerHealthBar, 100);

        console.log("fiss", this.Fissurials);
        fissurial_quant = this.Fissurials.length;
        console.log('quant', fissurial_quant);
        fissurial_random = this.getRandomInt(fissurial_quant);
        console.log("rand", fissurial_random);
        enemy_fissurial = this.Fissurials[fissurial_random];
        console.log("enemy", enemy_fissurial);
        this.enemyHealth = enemy_fissurial.original_life;
        this.enemyHealthNow = enemy_fissurial.original_life;
        this.playerHealth = this.UserFissurial.current_life;
        this.playerHealthNow = this.UserFissurial.current_life;

        this.playerHealthText = this.add.text(100, 275, this.UserFissurial.fissurial.name, { fontSize: '18px', fill: '#fff' });
        this.enemyHealthText = this.add.text(1100, 75, 'Wild ' +enemy_fissurial.name, { fontSize: '18px', fill: '#fff' });

        this.add.text(50, 100, '¡Ha aparecido un ' + enemy_fissurial.name + ' salvaje!', { fontSize: '24px', fill: '#fff' });

        this.attackButtons = [];
        let i = 1;
        this.UserFissurial.fissurial.attacks.forEach((attack) => {
            i++;
            const button = this.add.image(200 * i, 600, 'button')
                .setInteractive()
                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                    if (!this.attackCooldown) {
                        this.performAttack(attack);
                        this.attackCooldown = true;
                        this.disablePlayerAttacks();
                        this.time.delayedCall(6000, () => {
                            this.attackCooldown = false;
                            this.enablePlayerAttacks();
                        });
                    }
                });
            const text = this.add.text(200 * i, 600, attack.name, { color: 'black' })
                .setOrigin(0.5, 0.5);
            button.displayWidth = 150;
            button.displayHeight = 75;
            this.attackButtons.push(button);
        });
    }

    performAttack(attack) {
        console.log('Player attacked with ' + attack.name + '!');
        const critico = this.getRandomInt(5)
        console.log(critico)
        if (critico == 0){
            const playerDamage = 0;
            this.enemyHealthNow -= playerDamage;
            if (this.enemyHealthNow <= 0) {
                this.setValue(this.enemyHealthBar, 0);
                this.showMessage('¡Has derrotado al ' + enemy_fissurial.name + ' salvaje con ' + attack.name + '!');

            }else {
                this.setValue(this.enemyHealthBar, ((this.enemyHealthNow / this.enemyHealth) * 100));

                this.showMessage('¡Has atacado al enemigo con ' + attack.name + ', pero ha fallado');

            }


        } else if(critico > 0 && critico < 4){
            const playerDamage = attack.power;
            this.enemyHealthNow -= playerDamage;
            if (this.enemyHealthNow <= 0) {
                this.setValue(this.enemyHealthBar, 0);
                this.showMessage('¡Has derrotado al ' + enemy_fissurial.name + ' salvaje con ' + attack.name + '!');

            }else {
                this.setValue(this.enemyHealthBar, ((this.enemyHealthNow / this.enemyHealth) * 100));

                this.showMessage('¡Has atacado al enemigo con ' + attack.name + '!');

            }


        }else if (critico == 4){
            const playerDamage = attack.power;
            this.enemyHealthNow -= playerDamage * 2;
            if (this.enemyHealthNow <= 0) {
                this.setValue(this.enemyHealthBar, 0);
                this.showMessage('¡Has derrotado al ' + enemy_fissurial.name + ' salvaje con ' + attack.name + '!');

            }else {
                this.setValue(this.enemyHealthBar, ((this.enemyHealthNow / this.enemyHealth) * 100));

                this.showMessage('¡Has asestado un golpe crítico con ' + attack.name + '!');

            }
            

        }
        
        if (this.enemyHealthNow <= 0) {
            setTimeout(() => {  
                console.log('¡Enemigo derrotado!');
                this.scene.stop('BattleScene');
                this.scene.resume('MainScene');
                return;
            }, 2000);
        }else {
            this.time.delayedCall(3000, this.performEnemyAttack, [], this);
        }

    }

    performEnemyAttack() {
        const randomAttackIndex = this.getRandomInt(enemy_fissurial.attacks.length);
        const enemyAttack = enemy_fissurial.attacks[randomAttackIndex];
        const critico = this.getRandomInt(5)
        console.log(critico)
        if (critico == 0){
            const enemyDamage = 0;
            this.playerHealthNow -= enemyDamage;
            if (this.playerHealthNow <= 0) {
                this.setValue(this.playerHealthBar, 0);
                this.showMessage('¡Tu ' + this.UserFissurial.fissurial.name +' ha sido derrotado con ' + enemyAttack.name + '!');

            }else {
                this.setValue(this.playerHealthBar, ((this.playerHealthNow / this.playerHealth) * 100));

                this.showMessage('¡El enemigo ataca con ' + enemyAttack.name + ', pero falla');

            }


        } else if(critico > 0 && critico < 4){
            const enemyDamage = enemyAttack.power;
            this.playerHealthNow -= enemyDamage;
            if (this.playerHealthNow <= 0) {
                this.setValue(this.playerHealthBar,0);
                this.showMessage('¡Tu ' + this.UserFissurial.fissurial.name +' ha sido derrotado con ' + enemyAttack.name + '!');

            }else {
                this.setValue(this.playerHealthBar, ((this.playerHealthNow / this.playerHealth) * 100));

                this.showMessage('¡El enemigo ataca con ' + enemyAttack.name + '!');

            }


        }else if (critico == 4){
            const enemyDamage = enemyAttack.power;
            this.playerHealthNow -= enemyDamage * 2;
            if (this.playerHealthNow <= 0) {
                this.setValue(this.playerHealthBar, 0);
                this.showMessage('¡Tu ' + this.UserFissurial.fissurial.name +' ha sido derrotado con ' + enemyAttack.name + '!');

            }else {
                this.setValue(this.playerHealthBar, ((this.playerHealthNow / this.playerHealth) * 100));

                this.showMessage('¡El enemigo asestó un golpe crítico con ' + enemyAttack.name + '!');

            }
            

        }

        if (this.playerHealthNow <= 0) {
            setTimeout(() => {  
                console.log('¡Jugador derrotado!');
                this.scene.stop('BattleScene');
                this.scene.resume('MainScene');
                return;
            }, 2000);
        }
    }

    disablePlayerAttacks() {
        this.attackButtons.forEach(button => {
            button.disableInteractive();
        });
    }

    enablePlayerAttacks() {
        this.attackButtons.forEach(button => {
            button.setInteractive();
        });
    }

    showMessage(message) {
        const messageText = this.add.text(50, 500, message, { fontSize: '18px', fill: '#fff' });
        this.time.delayedCall(2000, () => {
            messageText.destroy();
        });
    }
}
