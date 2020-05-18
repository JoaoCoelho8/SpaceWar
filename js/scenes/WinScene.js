export default class WinScene extends Phaser.Scene {
	constructor() {
		super("WinScene");
	}

	init(data) {
		if(data.completed > this.completed)
			this.completed = data.completed;
	}

	preload() {
		// carregar imagem fundo
		this.load.image("backgroundnext", "assets/background.png");

		// carregar som fundo
		this.load.audio("backgroundwin", "assets/victory.mp3");

		this.load.image("fogo", "assets/fogo.png", {
			frameWidth: 400,
			frameHeight: 400
		  });
	}
 
	create() {
		//adicionar a imagem de fundo
		this.add.image(500, 600,'backgroundnext');

		this.add.image(250, 850, 'fogo');
		this.add.image(700, 1000, 'fogo');
		this.add.image(700, 300, 'fogo');

		//adicionar o som de fundo
		this.backgroundSound = this.sound.add("backgroundwin", { volume: 0.7, loop: true });
		this.backgroundSound.play();
		
		//space vai ser usado para avançar para o nivel seguinte
		this.space_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
		//tecla para aumentar som
		this.songup = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		//tecla para diminuir som
		this.songdown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

		//adicionar texto
        this.add.text(270, 500, "Congratulations!!!\n You Won The Game!!!\n You Saved Our Planet!!!", {
            font: "50px Cambria",
            fill: "white",
            align: "center",
		});
    }
    
    update() {

		this.songUp();
		this.songDown();

		//quando clicar no space começa o nivel seguinte
		if (this.space_key.isDown) {
			this.scene.start('MenuScene');
		}
	}

	songUp(){
		if(Phaser.Input.Keyboard.JustDown(this.songup)){
		  this.backgroundSound.setVolume(this.backgroundSound.volume+0.08);
		}
	  }
	
	  songDown(){
		if(Phaser.Input.Keyboard.JustDown(this.songdown)){
		  if((this.backgroundSound.volume-0.08)>0){
			this.backgroundSound.setVolume(this.backgroundSound.volume-0.08);
		  }else{
			this.backgroundSound.setVolume(0)
		  }
		}
	  }
}