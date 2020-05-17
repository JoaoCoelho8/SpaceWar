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
	}
 
	create() {
		//adicionar a imagem de fundo
		this.add.image(500, 600,'backgroundnext');
		
		this.pausekey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
		this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

		//adicionar texto
        this.add.text(200, 550, "Pause\nPress ESC To Continue\nPress ENTER To Go To Menu", {
            font: "50px Cambria",
            fill: "white",
            align: "center",
		});

		this.add.text(350, 300, "Nível 2", {
            font: "100px Cambria",
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

		//ir para menu
		if (this.enterKey.isDown) {
            this.enterKey.isDown=false;
			this.scene.stop();
			this.scene.stop('SecondScene');  
			this.scene.start('MenuScene') 
		}
	}
}