export default class LevelScene extends Phaser.Scene {
	constructor() {
		super("LevelScene");
	}

	init(data) {
		if(data.completed > this.completed)
			this.completed = data.completed;
	}

	

	preload() {
		this.load.image("background-levels", "assets/background-levels.png");

		this.load.audio("background-music", "assets/sounds/Menu-music.mp3");

	}
 

	create() {
		
		this.add.image(500, 600,'background-levels');

		this.backgroundSound = this.sound.add("background-music", { volume: 0.4, loop: true });
		this.backgroundSound.play();

		this.one_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
	    this.two_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
	    this.three_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
		this.space_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

		this.labelPlayNum = this.add.text(170, 60, "Saving Planet Earth", {
			font: "80px Cambria",
			fill: "white"
		});

		this.labelPlayNum = this.add.text(400, 170, "SPACE WAR", {
			font: "40px Cambria",
			fill: "white"
		});

		this.labelOne = this.add.text(490, 480, "3", {
			font: "40px Cambria",
			fill: "white"
		});


		this.labelTwo = this.add.text(490, 650, "2", {
			font: "40px Cambria",
			fill: "white"
		});


		this.labelThree = this.add.text(490, 830, "1", {
			font: "40px Cambria",
			fill: "white"
		});

		this.labelPlay = this.add.text(380, 1050, "Back to Menu", {
			font: "37px Cambria",
			fill: "white"
		});
		

	}


	update() {
		if (this.one_key.isDown) {
			this.backgroundSound.stop();
			this.scene.stop();
			this.scene.start('FirstScene');
		}
		
		if (this.two_key.isDown) {
			this.backgroundSound.stop();
			this.scene.stop();
			this.scene.start('SecondScene');
		}
		
		if (this.three_key.isDown) {
			this.backgroundSound.stop();
			this.scene.stop();
			this.scene.start('ThirdScene');
		}

		if (this.space_key.isDown) {
			this.backgroundSound.stop();
			this.scene.stop();
			this.scene.start('MenuScene');
		}
	}

}
