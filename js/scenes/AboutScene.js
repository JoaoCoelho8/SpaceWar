export default class AboutScene extends Phaser.Scene {
	constructor() {
		super("AboutScene");
	}

	preload() {
		// carregar imagem fundo do menu about
		this.load.image("background-about", "assets/background-about.png");
		
		// carregar som fundo do menu about
		this.load.audio("background-music", "assets/sounds/Menu-music.mp3");
	}
 
	create() {
		//adicionar a imagem de fundo
		this.add.image(500, 600,'background-about');

		//adicionar o som de fundo
		this.backgroundSound = this.sound.add("background-music", { volume: 0.4, loop: true });
		this.backgroundSound.play();
		
        //space vai ser usado para sair do menu about
		this.space_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		
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
        this.labelPlayNum = this.add.text(410, 480, "Created by:", {
			font: "40px Cambria",
			fill: "white"
		});

		//adicionar texto
		this.labelPlayNum = this.add.text(420, 550, "João Coelho", {
			font: "37px Cambria",
			fill: "white"
        });
		
		//adicionar texto
        this.labelPlayNum = this.add.text(420, 600, "Pedro Mota", {
			font: "37px Cambria",
			fill: "white"
        });
		
		//adicionar texto
        this.labelPlayNum = this.add.text(230, 890, "Universidade Fernando Pessoa", {
			font: "37px Cambria",
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