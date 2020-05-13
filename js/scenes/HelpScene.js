export default class HelpScene extends Phaser.Scene {
	constructor() {
		super("HelpScene");
	}

	init(data) {
		if(data.completed > this.completed)
			this.completed = data.completed;
	}

	preload() {
		// carregar imagem fundo do menu help
		this.load.image("background-help", "assets/background-help.png");

		// carregar som fundo do menu help
		this.load.audio("background-music", "assets/sounds/Menu-music.mp3");
	}
 
	create() {
		//adicionar a imagem de fundo
		this.add.image(500, 600,'background-help');

		//adicionar o som de fundo
        this.backgroundSound = this.sound.add("background-music", { volume: 0.4, loop: true });
		this.backgroundSound.play();
		
		//space vai ser usado para sair do menu help
		this.space_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		
		//texto a aparecer no menu help 
		var string = 'Space - shoot\nKeyboard arrows - move\nESC - pause\n\nStars - will increase your score\nHearth - will increase your life\n\nYou need score of 1000 to go from level 1 to level 2\nYou need score of 3000 to go from level 2 to level 3\nYou need to defeat the boss to win the game';

		//adicionar texto
        this.labelPlayNum = this.add.text(170, 60, "Saving Planet Earth", {
			font: "80px Cambria",
			fill: "white"
		});

		//adicionar texto
		this.labelPlayNum = this.add.text(400, 170, "SPACE WAR", {
			font: "40px Cambria",
			fill: "white"
		});

		//adicionar texto
		this.labelPlayNum = this.add.text (70, 500, string, {
			font: "40px Cambria",
			fill: "white"
		});

		//adicionar texto
        this.labelPlay = this.add.text(380, 1050, "Back to Menu", {
			font: "37px Cambria",
			fill: "white"
		});
    }
    
    update() {
		//quando clicar no space volta para o menu inicial
		if (this.space_key.isDown) {
			this.space_key.isDown=false;
			this.backgroundSound.stop();
			this.scene.stop();
			this.scene.start('MenuScene');
		}
	}

}
