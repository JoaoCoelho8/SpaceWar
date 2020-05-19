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
		this.backgroundSound.play();
		
		this.pausekey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
		this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
		//tecla para aumentar som
		this.songup = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		//tecla para diminuir som
		this.songdown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

		//adicionar texto
        this.add.text(200, 550, "Pause\nPress ESC To Continue\nPress ENTER To Go To Menu", {
            font: "50px Cambria",
            fill: "white",
            align: "center",
		});

		this.add.text((this.scale.width/2)-130, 300, "Level 2", {
            font: "100px Cambria",
            fill: "white",
            align: "center",
		});
    }
    
    update() {

		this.songUp();
		this.songDown();

        //voltar ao jogo
		if (this.pausekey.isDown) {
			this.pausekey.isDown=false;
			this.backgroundSound.stop();
			this.scene.stop();
            this.scene.resume('SecondScene');   
		}

		//ir para menu
		if (this.enterKey.isDown) {
			this.enterKey.isDown=false;
			this.backgroundSound.stop();
			this.scene.stop();
			this.scene.stop('SecondScene');  
			this.scene.start('MenuScene') 
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