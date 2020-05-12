export default class MenuScene extends Phaser.Scene {
	constructor() {
		super("MenuScene");
	}

	preload() {
		//carregar imagem fundo menu 
		this.load.image("background-menu", "assets/background-menu.png");

		//carregar imagem fundo menu 
		this.load.audio("background-music3", "assets/sounds/Menu-music.mp3");
	}

	create() {
		//adicionar imagem fundo menu
		this.add.image(500, 600, 'background-menu');

		//adicionar som fundo 
		this.backgroundSound3 = this.sound.add("background-music3", {  loop: true });
		//começa o som
		this.backgroundSound3.play();

		//telca com numero 1 vai ser usada para começar o jogo
		this.one_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
		//telca com numero 2 vai ser usada para aceder ao menu levels
		this.two_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
		//telca com numero 3 vai ser usada para aceder ao menu help
		this.three_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
		//telca com numero 3 vai ser usada para aceder ao menu about
		this.four_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);

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
		this.labelPlayNum = this.add.text(250, 570, "1", {
			font: "37px Cambria",
			fill: "white"
		});

		//adicionar texto
		this.labelPlay = this.add.text(460, 570, "Start Game", {
			font: "37px Cambria",
			fill: "white"
		});

		//adicionar texto
		this.labelPlayNum = this.add.text(250, 680, "2", {
			font: "37px Cambria",
			fill: "white"
		});

		//adicionar texto
		this.labelPlay = this.add.text(480, 680, "Levels", {
			font: "37px Cambria",
			fill: "white"
		});

		//adicionar texto
		this.labelLevelsNum = this.add.text(250, 790, "3", {
			font: "37px Cambria",
			fill: "white"
		});

		//adicionar texto
		this.labelLevels = this.add.text(500, 790, "Help", {
			font: "37px Cambria",
			fill: "white"
		});

		//adicionar texto
		this.labelLevelsNum = this.add.text(250, 900, "4", {
			font: "37px Cambria",
			fill: "white"
		});

		//adicionar texto
		this.labelLevels = this.add.text(480, 900, "About", {
			font: "37px Cambria",
			fill: "white"
		});
	}

	update() {
		//quando clicar na tecla 1, se nao tiver nada em storage começa nivel 1
		if (this.one_key.isDown) {
			this.one_key.isDown=false;
			this.backgroundSound3.stop();
			this.scene.stop();
			if (localStorage.getItem("complete") == 0) {
				this.backgroundSound3.stop();
				this.scene.start('FirstScene');
			}

			//quando clicar na tecla 1, se tiver em storage que nivel 1 esta completo começa nivel 2
			if (localStorage.getItem("complete") == 1) {
				this.backgroundSound3.stop();
				this.scene.start('SecondScene');
			}

			//quando clicar na tecla 1, se tiver em storage que nivel 2 esta completo começa nivel 3
			if (localStorage.getItem("complete") == 2) {
				this.backgroundSound3.stop();
				this.scene.start('ThirdScene');

			}
		}

		//quando clicar na tecla 2, entra no menu levels
		if (this.two_key.isDown) {
			this.two_key.isDown=false;
			this.backgroundSound3.stop();
			this.scene.stop();
			this.scene.start('LevelScene');

		}

		//quando clicar na tecla 3, entra no menu help
		if (this.three_key.isDown) {
			this.three_key.isDown=false;
			this.backgroundSound3.stop();
			this.scene.stop();
			this.scene.start('HelpScene');
		
		}

		//quando clicar na tecla 4, entra no menu about
		if (this.four_key.isDown) {
			this.four_key.isDown=false;
			this.backgroundSound3.stop();
			this.scene.stop();
			this.scene.start('AboutScene');
		
		}
	}
}
