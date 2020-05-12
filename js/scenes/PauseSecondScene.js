export default class PauseSecondScene extends Phaser.Scene {
	constructor() {
		super("PauseSecondScene");
	}

	init(data) {
		if(data.completed > this.completed)
			this.completed = data.completed;
	}

	preload() {
		// carregar imagem fundo
		this.load.image("backgroundnext", "assets/background.png");

		// carregar som fundo
		this.load.audio("background-music", "assets/sounds/Menu-music.mp3");
	}
 
	create() {
		//adicionar a imagem de fundo
		this.add.image(500, 600,'backgroundnext');

		//adicionar o som de fundo
		this.backgroundSound = this.sound.add("background-music", { volume: 0.4, loop: true });
		
		//space vai ser usado para avançar para o nivel seguinte
        this.pausekey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

		//adicionar texto
        this.add.text(130, 550, "Pause", {
            font: "50px Cambria",
            fill: "white",
            align: "center",
		});
    }
    
    update() {
        //voltar ao jogo
		if (this.pausekey.isDown) {
            this.pausekey.isDown=false;
			this.scene.stop();
            this.scene.resume('SecondScene');
            
		}
	}
}