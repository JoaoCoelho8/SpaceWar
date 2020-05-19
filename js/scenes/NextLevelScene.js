export default class NextLevelScene extends Phaser.Scene {
	constructor() {
		super("NextLevelScene");
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
		
		//space vai ser usado para avançar para o nivel seguinte
		this.enterkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
		//tecla para aumentar som
		this.songup = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		//tecla para diminuir som
		this.songdown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

		//adicionar texto
        this.add.text(115, 450, "Good job!\nBut we are not yet free from danger!\nBeware", {
            font: "50px Cambria",
            fill: "white",
            align: "center",
		});

		//adicionar texto
        this.labelPlayNum2 = this.add.text (79, 750, " Press ENTER To Go To The Next Level!", {
			font: "50px Cambria",
			fill: "white"
		});
		this.i=0
		this.flag=true
		this.goToMenu=false
		this.divider=25
    }
    
    update(time) {
		if (time) {
			
			if (this.flag) {
				this.labelPlayNum2.setVisible(true);
			} else {
				this.labelPlayNum2.setVisible(false);
			}
			if (this.i % this.divider == 0) {
				this.flag = !this.flag;
			}

		}
		this.i++

		this.songUp();
		this.songDown();

		//quando clicar no space começa o nivel seguinte
		if (this.enterkey.isDown) {
			this.labelPlayNum2.destroy();
			this.backgroundSound.stop();
			this.scene.start('SecondScene');
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