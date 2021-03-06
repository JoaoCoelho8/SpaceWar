export default class LevelScene extends Phaser.Scene {
	constructor() {
		super("LevelScene");
	}

	init(data) {
		if(data.completed > this.completed)
			this.completed = data.completed;
	}

	preload() {
		//carregar imagem fundo menu levels
		this.load.image("background-levels", "assets/background-levels.png");

		//carregar som fundo menu levels
		this.load.audio("background-music", "assets/sounds/Menu-music.mp3");
	}

	create() {
		//adicionar imagem fundo menu levels
		this.add.image(500, 600,'background-levels');

		//adicionar som fundo 
		this.backgroundSound = this.sound.add("background-music", { volume: 0.4, loop: true });
		this.backgroundSound.play();
		//telca com numero 1 vai ser usada para entrar nivel 1
		this.one_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
		//telca com numero 2 vai ser usada para entrar nivel 2
		this.two_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
		//telca com numero 3 vai ser usada para entrar nivel 3
		this.three_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
		//space vai ser usado para sair do menu help
		this.space_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		//tecla para aumentar som
		this.songup = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		//tecla para diminuir som
		this.songdown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

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
		this.labelOne = this.add.text(490, 480, "3", {
			font: "40px Cambria",
			fill: "white"
		});

		//adicionar texto
		this.labelTwo = this.add.text(490, 650, "2", {
			font: "40px Cambria",
			fill: "white"
		});

		//adicionar texto
		this.labelThree = this.add.text(490, 830, "1", {
			font: "40px Cambria",
			fill: "white"
		});

		//adicionar texto
		this.labelPlay = this.add.text(380, 1050, "Back to Menu", {
			font: "37px Cambria",
			fill: "white"
		});
	}


	update() {

		this.songUp();
		this.songDown();

		//quando clicar na tecla 1 começa nivel 1
		if (this.one_key.isDown) {
			this.one_key.isDown=false;
			this.scene.stop();
			this.backgroundSound.stop();
			this.scene.start('FirstScene');
		}

		//quando clicar na tecla 2 começa nivel 2
		if (this.two_key.isDown) {
			this.two_key.isDown=false;
			this.scene.stop();
			this.backgroundSound.stop();
			this.scene.start('SecondScene');
		}

		//quando clicar na tecla 3 começa nivel 3
		if (this.three_key.isDown) {
			this.three_key.isDown=false;
			this.scene.stop();
			this.backgroundSound.stop();
			this.scene.start('ThirdScene');
		}

		//quando clicar no space volta para o menu inicial
		if (this.space_key.isDown) {
			this.space_key.isDown=false;
			this.scene.stop();
			this.backgroundSound.stop();
			this.scene.start('MenuFinalScene');
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
