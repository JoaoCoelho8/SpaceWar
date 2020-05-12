export default class WinScene extends Phaser.Scene {
	constructor() {
		super("WinScene");
	}

	init(data) {
		if(data.completed > this.completed)
			this.completed = data.completed;
	}

	preload() {
		// carregar imagem fundo
		this.load.image("backgroundnext", "assets/background.png");

		// carregar som fundo
		this.load.audio("background-music", "assets/sounds/Menu-music.mp3");
	}
 
	create() {
		//adicionar a imagem de fundo
		this.add.image(500, 600,'backgroundnext');

		//adicionar o som de fundo
		this.backgroundSound = this.sound.add("background-music", { volume: 0.4, loop: true });
		
		//space vai ser usado para avançar para o nivel seguinte
        this.space_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

		//adicionar texto
        this.add.text(130, 550, "Congratulations! You Win The Game!!!", {
            font: "50px Cambria",
            fill: "white",
            align: "center",
		});
    }
    
    update() {
		//quando clicar no space começa o nivel seguinte
		if (this.space_key.isDown) {
			this.scene.start('MenuScene');
		}
	}
}