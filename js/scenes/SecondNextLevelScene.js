export default class SecondNextLevelScene extends Phaser.Scene {
	constructor() {
		super("SecondNextLevelScene");
	}

	init(data) {
		if(data.completed > this.completed)
			this.completed = data.completed;
	}

	preload() {
		// carregar imagem fundo
		this.load.image("backgroundnextt", "assets/background.png");

		// carregar som fundo
		this.load.audio("background-music", "assets/sounds/Menu-music.mp3");
	}
 
	create() {
		//adicionar a imagem de fundo
		this.add.image(500, 600,'backgroundnextt');
		
		//adicionar o som de fundo
		this.backgroundSound = this.sound.add("background-music", { volume: 0.4, loop: true });
		this.backgroundSound.play();
		
		//space vai ser usado para avançar para o nivel seguinte
        this.enterkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

		//adicionar texto
        this.add.text(70, 450, "Oh no, their master is coming!\nIt is time for the final battle!\nMay the force be with you\n\n\n Press ENTER To Go To The Final Battle!", {
            font: "50px Cambria",
            fill: "white",
            align: "center",
		});
    }
    
    update() {
		//quando clicar no space começa o nivel seguinte
		if (this.enterkey.isDown) {
			this.backgroundSound.stop();
			this.scene.start('ThirdScene');
		}
	}
}