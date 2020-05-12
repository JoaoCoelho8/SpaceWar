export default class StartScene extends Phaser.Scene {
    constructor() {
		super("StartScene");
	}

    preload(){
		// carregar imagem fundo 
		this.load.image("backgroundstart","assets/background-menu-backup.png");
		
		// carregar som fundo do menu about
        this.load.audio("music", "assets/sounds/mistery.mp3");
    }

    create(){

		//adicionar a imagem de fundo
		this.add.image(500, 600,"backgroundstart");
		
		//adicionar o som de fundo
		this.backgroundSound = this.sound.add("music", { volume: 0.4, loop: true });
		this.backgroundSound.play();

		//space vai ser usado para avançar para o menu
		this.space_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

		//adicionar texto
		var string = '  Tudo o que nós pensávamos saber sobre o mundo,\n             o espaço, a galáxia, acabou de mudar.\n Estão a dirigir-se para o nosso planeta um exercício\n alienista, com o objetivo de o dizimar por completo.\n        Foi enviada para o espaço, uma nave, onde tu\n           nos podes ajudar a salvar o nosso planeta.\n              Boa sorte, és a nossa última esperança,\n                      estamos todos a torcer por ti!!\n';

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
	}

	update() {
		//quando clicar no space avança para o menu
		if (this.space_key.isDown) {
			this.scene.start('MenuScene');
		}
	}
}