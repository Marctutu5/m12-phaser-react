import { Scene } from 'phaser';
import AuthService from '../../auth/AuthService';
export default class SaveConfirmationDialog {
    constructor(scene) {
        this.scene = scene;
        this.container = null;
    }

    show() {
        const playerCoordinates = this.scene.getPlayerCoordinates();

        // Posicionar el contenedor del diálogo encima del jugador
        const offsetX = -150; // Ajuste opcional en X
        const offsetY = -100; // Ajuste opcional en Y para que el diálogo aparezca encima del personaje
        const dialogX = playerCoordinates.x + offsetX;
        const dialogY = playerCoordinates.y + offsetY;

        // Crear el contenedor del diálogo en las coordenadas del jugador
        this.container = this.scene.add.container(dialogX, dialogY);

        // Fondo del cuadro de diálogo
        const dialogBackground = this.scene.add.graphics();
        dialogBackground.fillStyle(0xffffff, 1);
        dialogBackground.fillRect(0, 0, 300, 150);
        this.container.add(dialogBackground);
    
        // Mensaje de confirmación
        const confirmationMessage = this.scene.add.text(150, 50, "¿Guardar cambios?", { fontSize: "20px", fill: "#000" });
        confirmationMessage.setOrigin(0.5);
        this.container.add(confirmationMessage);
    
        // Botón "Sí"
        const yesButton = this.scene.add.text(100, 100, "Sí", { fontSize: "18px", fill: "#000" });
        yesButton.setOrigin(0.5);
        yesButton.setInteractive();

        // Cambiar color al hacer hover
        yesButton.on("pointerover", () => {
            yesButton.setFill("#00FF00"); // Cambia el color a verde al hacer hover
        });

        // Restaurar color al salir del hover
        yesButton.on("pointerout", () => {
            yesButton.setFill("#000"); // Restaura el color original al salir del hover
        });

        // Evento al hacer clic
        yesButton.on("pointerdown", () => {
            // Lógica para guardar los cambios
            console.log("Se seleccionó Sí");
            AuthService.updatePosition(playerCoordinates.x, playerCoordinates.y, 1);
            this.hide(); // Ocultar el cuadro de diálogo después de hacer clic en "Sí"
            this.scene.handleDialogClose() 
        });

        this.container.add(yesButton);

        // Botón "No"
        const noButton = this.scene.add.text(200, 100, "No", { fontSize: "18px", fill: "#000" });
        noButton.setOrigin(0.5);
        noButton.setInteractive();

        // Cambiar color al hacer hover
        noButton.on("pointerover", () => {
            noButton.setFill("#FF0000"); // Cambia el color a rojo al hacer hover
        });

        // Restaurar color al salir del hover
        noButton.on("pointerout", () => {
            noButton.setFill("#000"); // Restaura el color original al salir del hover
        });

        // Evento al hacer clic
        noButton.on("pointerdown", () => {
            // Lógica para descartar los cambios
            console.log("Se seleccionó No");
            this.hide(); // Ocultar el cuadro de diálogo después de hacer clic en "No"
            this.scene.handleDialogClose() 
        });

        this.container.add(noButton);

        // Establecer la profundidad del contenedor al máximo posible
        this.container.setDepth(20);
    }

    hide() {
        if (this.container) {
            console.log("va el boto")

            this.container.destroy();
            this.container = null;
        }
    }
}
