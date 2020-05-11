export default class MenuScene extends Phaser.Scene {
	constructor() {
		super("MenuScene");
	}

	preload() {

		this.load.image("background-menu", "assets/background-menu.png");

		this.load.audio("background-music3", "assets/sounds/Menu-music.mp3");

	}


	create() {

		this.add.image(500, 600, 'background-menu');

		this.backgroundSound3 = this.sound.add("background-music3", {  loop: true });
		this.backgroundSound3.play();

		this.one_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
		this.two_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
		this.three_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
		this.four_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);

		this.labelPlayNum = this.add.text(170, 60, "Saving Planet Earth", {
			font: "80px Cambria",
			fill: "white"
		});

		this.labelPlayNum = this.add.text(400, 170, "SPACE WAR", {
			font: "40px Cambria",
			fill: "white"
		});

		this.labelPlayNum = this.add.text(250, 570, "1", {
			font: "37px Cambria",
			fill: "white"
		});

		this.labelPlay = this.add.text(460, 570, "Start Game", {
			font: "37px Cambria",
			fill: "white"
		});


		this.labelPlayNum = this.add.text(250, 680, "2", {
			font: "37px Cambria",
			fill: "white"
		});

		this.labelPlay = this.add.text(480, 680, "Levels", {
			font: "37px Cambria",
			fill: "white"
		});


		this.labelLevelsNum = this.add.text(250, 790, "3", {
			font: "37px Cambria",
			fill: "white"
		});

		this.labelLevels = this.add.text(500, 790, "Help", {
			font: "37px Cambria",
			fill: "white"
		});


		this.labelLevelsNum = this.add.text(250, 900, "4", {
			font: "37px Cambria",
			fill: "white"
		});

		this.labelLevels = this.add.text(480, 900, "About", {
			font: "37px Cambria",
			fill: "white"
		});
		
	}

	update() {

		if (this.one_key.isDown) {
			this.backgroundSound3.stop();
			this.scene.stop();
			this.scene.start('FirstScene');
			if (localStorage.getItem("complete") == 0 || localStorage.getItem("complete") == 0) {
				this.backgroundSound3.stop();
				this.scene.stop();
				this.scene.start('FirstScene');
			}

			if (localStorage.getItem("complete") == 1) {
				this.backgroundSound3.stop();
				this.scene.stop();
				this.scene.start('SecondScene');
			}

			if (localStorage.getItem("complete") == 2) {
				this.backgroundSound3.stop();
				this.scene.stop();
				this.scene.start('ThirdScene');

			}
		}

		if (this.two_key.isDown) {		//select level
			this.backgroundSound3.stop();
			this.scene.stop();
			this.scene.start('LevelScene');

		}

		if (this.three_key.isDown) {	//help
			this.backgroundSound3.stop();
			this.scene.stop();
			this.scene.start('HelpScene');
		
		}

		if (this.four_key.isDown) {		//about
			this.backgroundSound3.stop();
			this.scene.stop();
			this.scene.start('AboutScene');
		
		}
	}

}
