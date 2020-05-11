export default class StartScene extends Phaser.Scene {
    constructor() {
		super("StartScene");
	}

    preload(){
		this.load.image("backgroundstart","assets/background-menu-backup.png");
		
        this.load.audio("music", "assets/sounds/mistery.mp3");
    }

    create(){

		this.add.image(500, 600,"backgroundstart");
		
		this.backgroundSound = this.sound.add("music", { volume: 0.4, loop: true });
		this.backgroundSound.play();

		this.space_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

		var string = 'Tudo o que nós pensávamos saber sobre o mundo,';
		var string2 = 'o espaço, a galáxia, acabou de mudar.';
		var string3 = 'Estão a dirigir-se para o nosso planeta um exercício';
		var string4 = 'alienista, com o objetivo de o dizimar por completo.';
		var string5 = 'Foi enviada para o espaço, uma nave, onde tu';
		var string6 = 'nos podes ajudar a salvar o nosso planeta. ';
		var string7 = 'Boa sorte, és a nossa última esperança,';
		var string8 = 'estamos todos a torcer por ti!!';

		this.labelPlayNum = this.add.text(170, 60, "Saving Planet Earth", {
			font: "80px Cambria",
			fill: "white"
		});

		this.labelPlayNum = this.add.text(400, 170, "SPACE WAR", {
			font: "40px Cambria",
			fill: "white"
		});

        this.labelPlayNum = this.add.text (70, 500, string, {
			font: "40px Cambria",
			fill: "white"
		});

		this.labelPlayNum = this.add.text (150, 550, string2, {
			font: "40px Cambria",
			fill: "white"
		});

		this.labelPlayNum = this.add.text (60, 600, string3, {
			font: "40px Cambria",
			fill: "white"
		});

		this.labelPlayNum = this.add.text (60, 650, string4, {
			font: "40px Cambria",
			fill: "white"
		});

		this.labelPlayNum = this.add.text (100, 700, string5, {
			font: "40px Cambria",
			fill: "white"
		});

		this.labelPlayNum = this.add.text (120, 750, string6, {
			font: "40px Cambria",
			fill: "white"
		});

		this.labelPlayNum = this.add.text (140, 800, string7, {
			font: "40px Cambria",
			fill: "white"
		});

		this.labelPlayNum = this.add.text (190, 850, string8, {
			font: "40px Cambria",
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