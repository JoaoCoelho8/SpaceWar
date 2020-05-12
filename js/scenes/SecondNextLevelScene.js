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

		//space vai ser usado para avançar para o nivel seguinte
        this.space_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

		//adicionar texto
        this.add.text(130, 550, "Congratulations! You Win!\n Starting level 3, GOOD LUCK!!\n Press Space Bar For Next Level!", {
            font: "50px Cambria",
            fill: "white",
            align: "center",
		});
    }
    
    update() {
		//quando clicar no space começa o nivel seguinte
		if (this.space_key.isDown) {
			this.scene.start('ThirdScene');
		}
	}
}