export default class HelpScene extends Phaser.Scene {
	constructor() {
		super("HelpScene");
	}

	init(data) {
		if(data.completed > this.completed)
			this.completed = data.completed;
	}

	

	preload() {
		this.load.image("background-help", "assets/background-help.png");

		this.load.audio("background-music", "assets/sounds/Menu-music.mp3");

	}
 

	create() {
		
		this.add.image(500, 600,'background-help');

        this.backgroundSound = this.sound.add("background-music", { volume: 0.4, loop: true });
		this.backgroundSound.play();
		
        this.space_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.labelPlayNum = this.add.text(170, 60, "Saving Planet Earth", {
			font: "80px Cambria",
			fill: "white"
		});

		this.labelPlayNum = this.add.text(400, 170, "SPACE WAR", {
			font: "40px Cambria",
			fill: "white"
		});

        this.labelPlay = this.add.text(380, 1050, "Back to Menu", {
			font: "37px Cambria",
			fill: "white"
		});

    }
    
    update() {

		if (this.space_key.isDown) {
			this.backgroundSound.stop();
			this.scene.stop();
			this.scene.start('MenuScene');
		}
	}

}
