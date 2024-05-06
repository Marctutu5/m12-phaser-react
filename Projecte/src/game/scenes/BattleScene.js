import { Scene } from 'phaser';

export default class BattleScene extends Scene {
    constructor() {
        super('BattleScene');
    }

    create() {
        // Inicializar variables de vida
        this.playerHealth = 100;
        this.enemyHealth = 100;

        // Mostrar información de la vida
        this.playerHealthText = this.add.text(50, 200, 'Jugador: ' + this.playerHealth, { fontSize: '18px', fill: '#fff' });
        this.enemyHealthText = this.add.text(50, 280, 'Enemigo: ' + this.enemyHealth, { fontSize: '18px', fill: '#fff' });

        // Configurar la escena de juego
        this.add.text(50, 100, '¡Encuentras un enemigo!', { fontSize: '24px', fill: '#fff' });

        // Crear botones para los ataques
        this.attackButtons = [];
        for (let i = 1; i <= 4; i++) {
            const button = this.add.text(150 * i, 400, 'Ataque ' + i, { fontSize: '18px', fill: '#fff' }).setInteractive();
            button.on('pointerdown', () => this.performAttack(i));
            this.attackButtons.push(button);
        }
    }

    performAttack(attackIndex) {
        // Simular ataque del jugador
        const playerDamage = Phaser.Math.Between(10, 20);
        this.enemyHealth -= playerDamage;
        this.enemyHealthText.setText('Enemigo: ' + this.enemyHealth);

        // Verificar si el enemigo ha sido derrotado
        if (this.enemyHealth <= 0) {
            console.log('¡Enemigo derrotado!');
            this.scene.stop('BattleScene');
            this.scene.resume('GameScene');
            return;
        }

        // Simular ataque del enemigo
        const enemyDamage = Phaser.Math.Between(10, 20);
        this.playerHealth -= enemyDamage;
        this.playerHealthText.setText('Jugador: ' + this.playerHealth);

        // Verificar si el jugador ha sido derrotado
        if (this.playerHealth <= 0) {
            console.log('¡Jugador derrotado!');
            this.scene.stop('BattleScene');
            this.scene.resume('GameScene');
            return;
        }
    }
}
