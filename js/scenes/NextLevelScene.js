export default class NextLevelScene extends Phaser.Scene {
	constructor() {
		super("NextLevelScene");
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
		this.backgroundSound.play();
		
		//space vai ser usado para avançar para o nivel seguinte
        this.enterkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

		//adicionar texto
        this.add.text(80, 450, "Good job!\nBut we are not yet free from danger!\nBeware\n\n\n Press ENTER To Go To The Next Level!", {
            font: "50px Cambria",
            fill: "white",
            align: "center",
		});
    }
    
    update() {
		//quando clicar no space começa o nivel seguinte
		if (this.enterkey.isDown) {
			this.backgroundSound.stop();
			this.scene.start('SecondScene');
		}
	}
}