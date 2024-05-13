import { Scene } from 'phaser';

let fissurial_quant;
let enemy_fissurial;
let fissurial_random;

export default class BattleScene extends Scene {
    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    init(data) {
        this.UserFissurial = data.UserFissurial;
        this.Fissurials = data.Fissurials;
        this.attackCooldown = false;
        this.previousScene = data.previousScene;
    }

    constructor() {
        super('BattleScene');
        this.previousScene = null;
    }
    preload(){
        this.load.image('background', 'assets/background_battle.png');
        this.load.image('button', 'assets/button_battle.png')
    }

    create() {
        this.background =  this.add.image(512, 256, 'background');

        // Ajustar la imagen de fondo para que cubra toda la pantalla
        this.background.displayWidth = 1980;
        this.background.displayHeight = 1080;
        this.background.setDepth(-1);
        console.log("fiss", this.Fissurials);
        fissurial_quant = this.Fissurials.length;
        console.log('quant', fissurial_quant);
        fissurial_random = this.getRandomInt(fissurial_quant);
        console.log("rand", fissurial_random);
        enemy_fissurial = this.Fissurials[fissurial_random];
        console.log("enemy", enemy_fissurial);
        this.enemyHealth = enemy_fissurial.original_life;
        this.playerHealth = this.UserFissurial.current_life;

        this.playerHealthText = this.add.text(50, 200, this.UserFissurial.fissurial.name + ' ' +  this.playerHealth, { fontSize: '18px', fill: '#fff' });
        this.enemyHealthText = this.add.text(50, 280, enemy_fissurial.name + ' ' + this.enemyHealth, { fontSize: '18px', fill: '#fff' });

        this.add.text(50, 100, '¡Ha aparecido un ' + enemy_fissurial.name + ' salvaje!', { fontSize: '24px', fill: '#fff' });

        this.attackButtons = [];
        let i = 1;
        this.UserFissurial.fissurial.attacks.forEach((attack) => {
            i++;
            const button = this.add.image(150 * i, 400, 'button')
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
            })
            const text = this.add.text(150 * i, 400, attack.name, { color: 'black' })
            .setOrigin(0.5, 0.5);
            button.displayWidth = 150;
            button.displayHeight = 75;
            this.attackButtons.push(button);
        });
    }

    performAttack(attack) {
        console.log('Player attacked with ' + attack.name + '!');

        const playerDamage = attack.power;
        this.enemyHealth -= playerDamage;
        this.enemyHealthText.setText(enemy_fissurial.name + ' ' + this.enemyHealth);

        this.showMessage('¡Has atacado al enemigo con ' + attack.name + '!');

        if (this.enemyHealth <= 0) {
            console.log('¡Enemigo derrotado!');
            this.scene.stop('BattleScene')
            this.scene.resume('MainScene');
            return;
        }

        this.time.delayedCall(3000, this.performEnemyAttack, [], this);
    }

    performEnemyAttack() {
        const randomAttackIndex = this.getRandomInt(enemy_fissurial.attacks.length);
        const enemyAttack = enemy_fissurial.attacks[randomAttackIndex];
        console.log('Enemy attacked with ' + enemyAttack.name + '!');

        const enemyDamage = enemyAttack.power;
        this.playerHealth -= enemyDamage;
        this.playerHealthText.setText(this.UserFissurial.fissurial.name + ' ' +  this.playerHealth);

        this.showMessage('¡El enemigo te atacó con ' + enemyAttack.name + '!');

        if (this.playerHealth <= 0) {
            console.log('¡Jugador derrotado!');
            this.scene.stop('BattleScene')
            this.scene.resume('MainScene');
            return;
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
